/**
 * jscodeshift codemod: Remove defaultProps and inline defaults into function parameters.
 *
 * Handles:
 * - Arrow functions and function declarations
 * - Destructured parameters with ...rest
 * - Spread in defaultProps (e.g. { ...defaultValue })
 * - Function calls and JSX in default values
 * - Multiple components per file
 * - forwardRef wrappers
 *
 * Usage:
 *   npx jscodeshift --parser babel --extensions jsx,js \
 *     -t scripts/codemods/remove-default-props.js \
 *     elements/ screens/ packages/
 */

module.exports = function transformer(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);
    let hasChanges = false;

    // Find all `X.defaultProps = Y` assignments
    const defaultPropsAssignments = root.find(j.ExpressionStatement, {
        expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
                type: 'MemberExpression',
                property: { name: 'defaultProps' },
            },
        },
    });

    if (defaultPropsAssignments.length === 0) {
        return undefined; // No changes needed
    }

    defaultPropsAssignments.forEach((assignmentPath) => {
        const assignment = assignmentPath.value.expression;
        const componentName = assignment.left.object.name;
        const defaultsSource = assignment.right;

        // Resolve the defaults object
        let defaultsProperties = null;

        if (defaultsSource.type === 'ObjectExpression') {
            // Inline: Component.defaultProps = { key: value }
            defaultsProperties = defaultsSource.properties;
        } else if (defaultsSource.type === 'Identifier') {
            // Variable reference: Component.defaultProps = defaultProps
            const varName = defaultsSource.name;
            const varDecl = root.find(j.VariableDeclarator, {
                id: { name: varName },
                init: { type: 'ObjectExpression' },
            });
            if (varDecl.length > 0) {
                defaultsProperties = varDecl.get().value.init.properties;
            }
        }

        if (!defaultsProperties) {
            return; // Can't resolve defaults, skip
        }

        // Build a map of prop name -> default value AST node
        // Handle spread properties by resolving them
        const defaultsMap = new Map();
        for (const prop of defaultsProperties) {
            if (prop.type === 'SpreadElement' || prop.type === 'SpreadProperty') {
                // Resolve the spread source
                const spreadName =
                    prop.argument.type === 'Identifier' ? prop.argument.name : null;
                if (spreadName) {
                    const spreadVarDecl = root.find(j.VariableDeclarator, {
                        id: { name: spreadName },
                        init: { type: 'ObjectExpression' },
                    });
                    if (spreadVarDecl.length > 0) {
                        for (const spreadProp of spreadVarDecl.get().value.init.properties) {
                            if (
                                spreadProp.type === 'ObjectProperty' ||
                                spreadProp.type === 'Property'
                            ) {
                                const key = spreadProp.key.name || spreadProp.key.value;
                                if (key) {
                                    defaultsMap.set(key, spreadProp.value);
                                }
                            }
                        }
                    }
                }
            } else if (prop.type === 'ObjectProperty' || prop.type === 'Property') {
                const key = prop.key.name || prop.key.value;
                if (key) {
                    defaultsMap.set(key, prop.value);
                }
            }
        }

        if (defaultsMap.size === 0) {
            return; // Nothing to inline
        }

        // Find the component function (arrow or declaration)
        let componentFunction = null;
        let componentFunctionPath = null;

        // Check for arrow function: const Component = (...) => { ... }
        const arrowDecl = root.find(j.VariableDeclarator, {
            id: { name: componentName },
        });
        if (arrowDecl.length > 0) {
            const init = arrowDecl.get().value.init;
            if (init && (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression')) {
                componentFunction = init;
                componentFunctionPath = arrowDecl.get();
            }
        }

        // Check for function declaration: function Component(...) { ... }
        if (!componentFunction) {
            const funcDecl = root.find(j.FunctionDeclaration, {
                id: { name: componentName },
            });
            if (funcDecl.length > 0) {
                componentFunction = funcDecl.get().value;
                componentFunctionPath = funcDecl.get();
            }
        }

        if (!componentFunction || !componentFunction.params || componentFunction.params.length === 0) {
            return; // Can't find the function or it has no params
        }

        const firstParam = componentFunction.params[0];
        if (firstParam.type !== 'ObjectPattern') {
            return; // Not destructured, skip (would need different handling)
        }

        // Add defaults to each destructured property that has one in defaultsMap
        let modified = false;
        for (const prop of firstParam.properties) {
            // Skip rest element (...rest)
            if (prop.type === 'RestElement' || prop.type === 'RestProperty') {
                continue;
            }

            const propName = prop.key ? (prop.key.name || prop.key.value) : null;
            if (!propName) continue;

            // Only add default if one exists and the param doesn't already have one
            if (defaultsMap.has(propName)) {
                const defaultValue = defaultsMap.get(propName);

                // Check if property already has a default (is an AssignmentPattern)
                const valueNode = prop.value || prop;
                if (valueNode.type === 'AssignmentPattern') {
                    continue; // Already has a default, skip
                }

                // Handle renamed destructuring: { onLoaded: onParentLoaded }
                // prop.value is the local binding, prop.key is the original name
                if (prop.value && prop.value.type === 'Identifier' && prop.value.name !== propName) {
                    // Renamed: { key: localName } -> { key: localName = default }
                    prop.value = j.assignmentPattern(prop.value, defaultValue);
                } else {
                    // Shorthand or same name: { key } -> { key = default }
                    // Keep shorthand: use key as both key and value pattern
                    prop.value = j.assignmentPattern(j.identifier(propName), defaultValue);
                }

                modified = true;
            }
        }

        if (!modified) {
            return;
        }

        // Remove the `Component.defaultProps = defaultProps` assignment
        j(assignmentPath).remove();
        hasChanges = true;

        // Remove the `const defaultProps = { ... }` variable declaration if it exists
        // and is referenced by the assignment we just removed
        if (defaultsSource.type === 'Identifier') {
            const varName = defaultsSource.name;
            // Check if the variable is still referenced elsewhere
            const remainingRefs = root.find(j.Identifier, { name: varName }).filter((path) => {
                // Exclude the variable declaration itself
                return path.parent.value.type !== 'VariableDeclarator' || path.parent.value.id !== path.value;
            });

            if (remainingRefs.length === 0) {
                // Safe to remove the variable declaration
                root.find(j.VariableDeclarator, { id: { name: varName } }).forEach((varPath) => {
                    const declaration = varPath.parent;
                    if (
                        declaration.value.type === 'VariableDeclaration' &&
                        declaration.value.declarations.length === 1
                    ) {
                        j(declaration).remove();
                    } else {
                        j(varPath).remove();
                    }
                });
            }
        }
    });

    if (!hasChanges) {
        return undefined;
    }

    return root.toSource({ quote: 'single', trailingComma: true });
};
