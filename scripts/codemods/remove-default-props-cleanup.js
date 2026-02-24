/**
 * Cleanup codemod: Remove remaining defaultProps assignments and variable declarations.
 *
 * Handles cases the main codemod missed:
 * - Category A: Defaults were inlined but var/assignment not removed
 * - Category B: Components using (props) spread without destructuring
 * - Category C: Empty defaultProps = {}
 *
 * For Category B (non-destructured props), if ALL defaults are null, we simply
 * remove defaultProps since null defaults are no-ops. For non-null defaults,
 * we destructure the needed props with defaults from the props parameter.
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
        return undefined;
    }

    defaultPropsAssignments.forEach((assignmentPath) => {
        const assignment = assignmentPath.value.expression;
        const componentName = assignment.left.object.name;
        const defaultsSource = assignment.right;

        // Resolve the defaults object
        let defaultsProperties = null;
        let defaultsVarName = null;

        if (defaultsSource.type === 'ObjectExpression') {
            defaultsProperties = defaultsSource.properties;
        } else if (defaultsSource.type === 'Identifier') {
            defaultsVarName = defaultsSource.name;
            const varDecl = root.find(j.VariableDeclarator, {
                id: { name: defaultsVarName },
                init: { type: 'ObjectExpression' },
            });
            if (varDecl.length > 0) {
                defaultsProperties = varDecl.get().value.init.properties;
            }
        }

        // Build defaults map (excluding spread properties for simplicity)
        const defaultsMap = new Map();
        if (defaultsProperties) {
            for (const prop of defaultsProperties) {
                if (prop.type === 'ObjectProperty' || prop.type === 'Property') {
                    const key = prop.key.name || prop.key.value;
                    if (key) {
                        defaultsMap.set(key, prop.value);
                    }
                }
            }
        }

        // Find the component function
        let componentFunction = null;

        // Arrow function
        const arrowDecl = root.find(j.VariableDeclarator, {
            id: { name: componentName },
        });
        if (arrowDecl.length > 0) {
            const init = arrowDecl.get().value.init;
            if (init && (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression')) {
                componentFunction = init;
            }
        }

        // Function declaration
        if (!componentFunction) {
            const funcDecl = root.find(j.FunctionDeclaration, {
                id: { name: componentName },
            });
            if (funcDecl.length > 0) {
                componentFunction = funcDecl.get().value;
            }
        }

        if (componentFunction && componentFunction.params && componentFunction.params.length > 0) {
            const firstParam = componentFunction.params[0];

            if (firstParam.type === 'Identifier' && defaultsMap.size > 0) {
                // Category B: props not destructured. Convert to destructuring with defaults.
                const propsName = firstParam.name;
                const properties = [];

                for (const [key, value] of defaultsMap) {
                    const prop = j.objectProperty(
                        j.identifier(key),
                        j.assignmentPattern(j.identifier(key), value),
                    );
                    properties.push(prop);
                }

                // Add rest element to capture remaining props
                properties.push(j.restElement(j.identifier(propsName)));

                componentFunction.params[0] = j.objectPattern(properties);
                hasChanges = true;
            }
        }

        // Remove the Component.defaultProps = defaultProps assignment
        j(assignmentPath).remove();
        hasChanges = true;

        // Remove the defaultProps variable declaration if no longer referenced
        if (defaultsVarName) {
            const remainingRefs = root.find(j.Identifier, { name: defaultsVarName }).filter((path) => {
                return path.parent.value.type !== 'VariableDeclarator' || path.parent.value.id !== path.value;
            });

            if (remainingRefs.length === 0) {
                root.find(j.VariableDeclarator, { id: { name: defaultsVarName } }).forEach((varPath) => {
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
