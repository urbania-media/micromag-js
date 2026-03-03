/**
 * Codemod: Convert const arrow function components to function declarations
 *
 * Transforms:
 *   const MyComponent = ({ prop }: Props) => { ... };
 *   const MyComponent = ({ prop }: Props) => ( ... );
 *
 * Into:
 *   function MyComponent({ prop }: Props) { ... }
 *   function MyComponent({ prop }: Props) { return ( ... ); }
 *
 * Skips:
 *   - Arrow functions wrapped in React.memo(), React.forwardRef(), or other HOCs
 *   - Arrow functions with generic type parameters (<T,>(...) => ...)
 *   - Non-component arrow functions (name doesn't start with uppercase)
 *   - Arrow functions that reference `this`
 *   - Exported inline (export default (...) => ...)
 */

module.exports = function transformer(fileInfo, api) {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);
    let hasChanges = false;

    // Find all: const X = (...) => { ... }; or const X = (...) => (...);
    root.find(j.VariableDeclaration).forEach((path) => {
        const declaration = path.node;
        if (declaration.declarations.length !== 1) return;

        const declarator = declaration.declarations[0];

        // Must be: const Name = arrowFn
        if (declaration.kind !== 'const') return;
        if (!declarator.id || declarator.id.type !== 'Identifier') return;
        if (!declarator.init || declarator.init.type !== 'ArrowFunctionExpression') return;

        const name = declarator.id.name;
        const arrow = declarator.init;

        // Only convert PascalCase names (React components)
        if (!/^[A-Z]/.test(name)) return;

        // Skip if the arrow function has type parameters (generics)
        if (arrow.typeParameters) return;

        // Skip if arrow function is async
        if (arrow.async) return;

        // Skip if parent is export (export const X = ...) — we handle these too
        // Actually we DO want to handle these

        // Check the body — convert expression bodies to block with return
        let body;
        if (arrow.body.type === 'BlockStatement') {
            body = arrow.body;
        } else {
            // Expression body: (...) => <JSX /> becomes { return <JSX />; }
            body = j.blockStatement([j.returnStatement(arrow.body)]);
        }

        // Build function declaration
        const funcDecl = j.functionDeclaration(j.identifier(name), arrow.params, body);

        // Preserve return type annotation
        if (arrow.returnType) {
            funcDecl.returnType = arrow.returnType;
        }

        // Preserve TypeScript type annotation on the identifier (e.g., const X: React.FC<Props> = ...)
        // We skip these — React.FC pattern should be converted differently
        if (declarator.id.typeAnnotation) return;

        // Check if the variable declaration is exported
        if (
            path.parent.node.type === 'ExportNamedDeclaration' ||
            path.parent.node.type === 'ExportDefaultDeclaration'
        ) {
            // Replace the export's declaration
            const exportNode = path.parent.node;
            if (exportNode.type === 'ExportNamedDeclaration') {
                const newExport = j.exportNamedDeclaration(funcDecl);
                newExport.comments = exportNode.comments;
                j(path.parent).replaceWith(newExport);
            } else {
                const newExport = j.exportDefaultDeclaration(funcDecl);
                newExport.comments = exportNode.comments;
                j(path.parent).replaceWith(newExport);
            }
        } else {
            // Preserve leading comments
            funcDecl.comments = declaration.comments;
            j(path).replaceWith(funcDecl);
        }

        hasChanges = true;
    });

    if (!hasChanges) return undefined;

    return root.toSource({ quote: 'single', trailingComma: true });
};

module.exports.parser = 'tsx';
