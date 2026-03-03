/**
 * Codemod: Apply Props interfaces to function signatures
 *
 * Finds files where a TypeScript interface ending in "Props" is defined
 * but not used as a type annotation on the corresponding component function.
 *
 * Before:
 *   interface AudioProps { media?: AudioMedia; ... }
 *   function Audio({ media = null, ... }) { ... }
 *
 * After:
 *   interface AudioProps { media?: AudioMedia; ... }
 *   function Audio({ media = null, ... }: AudioProps) { ... }
 *
 * Usage:
 *   npx jscodeshift --parser=tsx --extensions=tsx -t scripts/codemods/apply-props-types.js <paths>
 */

module.exports = function transformer(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);
    let changed = false;

    // Find all interface declarations ending with "Props"
    const interfaces = [];
    root.find(j.TSInterfaceDeclaration).forEach((path) => {
        const name = path.node.id.name;
        if (name.endsWith('Props')) {
            interfaces.push(name);
        }
    });

    if (interfaces.length === 0) return file.source;

    for (const interfaceName of interfaces) {
        // Derive expected function name: "AudioProps" → "Audio", "ArticleScreenProps" → "ArticleScreen"
        const funcName = interfaceName.replace(/Props$/, '');

        // Find function declarations with that name
        root.find(j.FunctionDeclaration, { id: { name: funcName } }).forEach((path) => {
            const params = path.node.params;
            if (params.length === 0) return;

            const firstParam = params[0];

            // Only handle ObjectPattern (destructured props)
            if (firstParam.type !== 'ObjectPattern') return;

            // Skip if already has a type annotation
            if (firstParam.typeAnnotation) return;

            // Add type annotation
            firstParam.typeAnnotation = j.tsTypeAnnotation(
                j.tsTypeReference(j.identifier(interfaceName)),
            );

            changed = true;
        });

        // Also handle arrow functions assigned to const: const Foo = ({ ... }) => ...
        // And const Foo = React.memo(({ ... }) => ...)
        // And const Foo = React.forwardRef(({ ... }, ref) => ...)
        root.find(j.VariableDeclarator, { id: { name: funcName } }).forEach((path) => {
            let arrowOrFunc = path.node.init;
            if (!arrowOrFunc) return;

            // Unwrap React.memo(...) or React.forwardRef(...)
            if (
                arrowOrFunc.type === 'CallExpression' &&
                arrowOrFunc.arguments &&
                arrowOrFunc.arguments.length > 0
            ) {
                const callee = arrowOrFunc.callee;
                const isMemoOrForwardRef =
                    (callee.type === 'MemberExpression' &&
                        callee.object.name === 'React' &&
                        (callee.property.name === 'memo' ||
                            callee.property.name === 'forwardRef')) ||
                    (callee.type === 'Identifier' &&
                        (callee.name === 'memo' || callee.name === 'forwardRef'));

                if (isMemoOrForwardRef) {
                    arrowOrFunc = arrowOrFunc.arguments[0];
                }
            }

            if (
                arrowOrFunc.type !== 'ArrowFunctionExpression' &&
                arrowOrFunc.type !== 'FunctionExpression'
            ) {
                return;
            }

            const params = arrowOrFunc.params;
            if (params.length === 0) return;

            const firstParam = params[0];
            if (firstParam.type !== 'ObjectPattern') return;
            if (firstParam.typeAnnotation) return;

            firstParam.typeAnnotation = j.tsTypeAnnotation(
                j.tsTypeReference(j.identifier(interfaceName)),
            );

            changed = true;
        });
    }

    if (!changed) return file.source;

    return root.toSource({ quote: 'single' });
};
