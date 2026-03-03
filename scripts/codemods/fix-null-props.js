/**
 * Codemod: Add `| null` to Props interface properties where the function default is `= null`
 *
 * Before:
 *   interface AudioProps {
 *       media?: AudioMedia;
 *       className?: string;
 *   }
 *   function Audio({ media = null, className = null }: AudioProps) { ... }
 *
 * After:
 *   interface AudioProps {
 *       media?: AudioMedia | null;
 *       className?: string | null;
 *   }
 *   function Audio({ media = null, className = null }: AudioProps) { ... }
 *
 * Usage:
 *   npx jscodeshift --parser=tsx --extensions=tsx -t scripts/codemods/fix-null-props.js <paths>
 */

module.exports = function transformer(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);
    let changed = false;

    // Find all interface declarations ending with "Props"
    const interfaceMap = new Map();
    root.find(j.TSInterfaceDeclaration).forEach((path) => {
        const name = path.node.id.name;
        if (name.endsWith('Props')) {
            interfaceMap.set(name, path);
        }
    });

    if (interfaceMap.size === 0) return file.source;

    // Collect null-defaulted param names from functions
    function getNullDefaultedParams(params) {
        const nullParams = new Set();
        if (params.length === 0) return nullParams;

        const firstParam = params[0];
        if (firstParam.type !== 'ObjectPattern') return nullParams;

        for (const prop of firstParam.properties) {
            if (prop.type === 'RestElement') continue;

            // Get the actual key name
            const keyName = prop.key ? prop.key.name || prop.key.value : null;
            if (!keyName) continue;

            // Check if default value is null
            const value = prop.value;
            if (value) {
                // Destructuring with default: { foo = null } → AssignmentPattern
                if (value.type === 'AssignmentPattern' && value.right.type === 'NullLiteral') {
                    nullParams.add(keyName);
                }
                // Also handle { foo: bar = null } (rename + default)
                if (value.type === 'AssignmentPattern' && value.right.type === 'Literal' && value.right.value === null) {
                    nullParams.add(keyName);
                }
            } else if (prop.type === 'ObjectProperty' || prop.type === 'Property') {
                // Simple default: jscodeshift sometimes represents differently
            }
        }

        return nullParams;
    }

    for (const [interfaceName, interfacePath] of interfaceMap) {
        const funcName = interfaceName.replace(/Props$/, '');
        const nullParams = new Set();

        // Check function declarations
        root.find(j.FunctionDeclaration, { id: { name: funcName } }).forEach((path) => {
            for (const p of getNullDefaultedParams(path.node.params)) {
                nullParams.add(p);
            }
        });

        // Check variable declarators (arrow functions, React.memo, etc.)
        root.find(j.VariableDeclarator, { id: { name: funcName } }).forEach((path) => {
            let fn = path.node.init;
            if (!fn) return;

            // Unwrap React.memo/forwardRef
            if (fn.type === 'CallExpression' && fn.arguments && fn.arguments.length > 0) {
                const callee = fn.callee;
                const isWrapper =
                    (callee.type === 'MemberExpression' &&
                        callee.object.name === 'React' &&
                        (callee.property.name === 'memo' || callee.property.name === 'forwardRef')) ||
                    (callee.type === 'Identifier' &&
                        (callee.name === 'memo' || callee.name === 'forwardRef'));
                if (isWrapper) fn = fn.arguments[0];
            }

            if (fn.type === 'ArrowFunctionExpression' || fn.type === 'FunctionExpression') {
                for (const p of getNullDefaultedParams(fn.params)) {
                    nullParams.add(p);
                }
            }
        });

        if (nullParams.size === 0) continue;

        // Now update the interface properties
        const body = interfacePath.node.body.body;
        for (const member of body) {
            if (member.type !== 'TSPropertySignature') continue;

            const memberName = member.key.name || member.key.value;
            if (!memberName || !nullParams.has(memberName)) continue;

            const typeAnnotation = member.typeAnnotation;
            if (!typeAnnotation || !typeAnnotation.typeAnnotation) continue;

            const existingType = typeAnnotation.typeAnnotation;

            // Skip if already has `| null`
            if (existingType.type === 'TSUnionType') {
                const hasNull = existingType.types.some(
                    (t) => t.type === 'TSNullKeyword',
                );
                if (hasNull) continue;

                // Add null to existing union
                existingType.types.push(j.tsNullKeyword());
                changed = true;
            } else {
                // Function types need parenthesizing: (() => void) | null
                // Otherwise `() => void | null` means return type is `void | null`
                let typeForUnion = existingType;
                if (existingType.type === 'TSFunctionType') {
                    typeForUnion = j.tsParenthesizedType(existingType);
                }

                // Wrap in union with null
                typeAnnotation.typeAnnotation = j.tsUnionType([
                    typeForUnion,
                    j.tsNullKeyword(),
                ]);
                changed = true;
            }
        }
    }

    if (!changed) return file.source;

    return root.toSource({ quote: 'single' });
};
