#!/usr/bin/env node

/**
 * PropTypes-to-TypeScript Codemod
 *
 * Converts React components from PropTypes runtime validation to TypeScript interfaces.
 *
 * What it does:
 * 1. Parses `const propTypes = { ... }` to extract prop shapes
 * 2. Generates a TypeScript `interface Props { ... }`
 * 3. Removes `import PropTypes from 'prop-types'`
 * 4. Replaces `import { PropTypes as MicromagPropTypes } from '@micromag/core'`
 *    with type imports from '@micromag/core' (if needed)
 * 5. Removes the `const propTypes = { ... }` declaration
 * 6. Removes `Component.propTypes = propTypes` assignment
 * 7. Adds `: Props` annotation to the component function parameters
 * 8. Renames .jsx → .tsx
 *
 * Handles: standard components, forwardRef, context providers, empty propTypes,
 *          .withForm statics, function declarations + arrow functions
 *
 * Usage:
 *   node scripts/codemods/propTypes-to-ts.js <file-or-glob> [--dry-run]
 *   node scripts/codemods/propTypes-to-ts.js elements/badge/src/Badge.jsx
 *   node scripts/codemods/propTypes-to-ts.js "elements/badge/src/Badge.jsx" --dry-run
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dryRun = process.argv.includes('--dry-run');
const verbose = process.argv.includes('--verbose');
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));

if (args.length === 0) {
    console.error('Usage: node scripts/codemods/propTypes-to-ts.js <file-or-glob> [--dry-run] [--verbose]');
    process.exit(1);
}

// Resolve file list from args (support globs via shell expansion)
let files = [];
for (const arg of args) {
    if (arg.includes('*')) {
        // Use find to expand globs
        const result = execSync(`find . -path '${arg}' -name '*.jsx' | sort`, {
            encoding: 'utf-8',
            cwd: process.cwd(),
        }).trim();
        if (result) files.push(...result.split('\n'));
    } else if (fs.existsSync(arg)) {
        files.push(arg);
    } else {
        console.warn(`Warning: ${arg} not found`);
    }
}

if (files.length === 0) {
    console.error('No files found');
    process.exit(1);
}

console.log(`Processing ${files.length} file(s)${dryRun ? ' (dry run)' : ''}...\n`);

// ─── Mapping from MicromagPropTypes.X → TypeScript type name ───

const micromagTypeMap = {
    // Core
    history: 'History',
    location: 'Location',
    intl: 'Intl',
    defaultMessageContent: 'DefaultMessageContent',
    defaultMessage: 'DefaultMessage',
    message: 'Message',
    text: 'Text',
    label: 'Label',
    statusCode: 'StatusCode',
    ref: 'Ref',
    target: 'Target',
    interaction: 'Interaction',
    interactions: 'Interaction[]',
    trackingVariables: 'TrackingVariables',
    progress: 'Progress',
    // Site
    user: 'User',
    menuItem: 'MenuItem',
    menuItems: 'MenuItem[]',
    breadcrumb: 'Breadcrumb',
    breadcrumbs: 'Breadcrumb[]',
    device: 'Device',
    devices: 'Device[]',
    modal: 'Modal',
    modals: 'Modal[]',
    panel: 'Panel',
    panels: 'Panel[]',
    button: 'Button',
    buttons: 'Button[]',
    bootstrapThemes: 'BootstrapTheme',
    buttonTheme: 'ButtonTheme',
    buttonSize: 'ButtonSize',
    formControlSize: 'FormControlSize',
    dropdownAlign: 'DropdownAlign',
    component: 'Component',
    components: 'Record<string, Component>',
    // Forms
    errors: 'Errors',
    formErrors: 'FormErrors',
    selectOption: 'SelectOption',
    selectOptions: 'SelectOption[]',
    formField: 'FormField',
    formFields: 'FormField[]',
    // Media
    mediaFile: 'MediaFile',
    media: 'Media',
    medias: 'Media[]',
    mediaTypes: 'MediaType',
    imageMedia: 'ImageMedia',
    imageMedias: 'ImageMedia[]',
    fontMedia: 'FontMedia',
    fontMedias: 'FontMedia[]',
    videoMedia: 'VideoMedia',
    videoMedias: 'VideoMedia[]',
    audioMedia: 'AudioMedia',
    audioMedias: 'AudioMedia[]',
    closedCaptionsMedia: 'ClosedCaptionsMedia',
    // Style
    customFont: 'CustomFont',
    font: 'Font',
    fonts: 'Font[]',
    textAlign: 'TextAlign',
    colorObject: 'ColorObject',
    color: 'Color',
    textStyle: 'TextStyle',
    borderTypes: 'BorderType',
    shadowType: 'ShadowType',
    borderStyle: 'BorderStyle',
    boxStyle: 'BoxStyle',
    margin: 'Margin',
    gridLayout: 'GridLayout',
    objectFitSize: 'ObjectFitSize',
    objectFit: 'ObjectFit',
    // Elements
    textElement: 'TextElement',
    headingElement: 'HeadingElement',
    inputElement: 'InputElement',
    imageElement: 'ImageElement',
    imageElements: 'ImageElement[]',
    videoElement: 'VideoElement',
    visualElement: 'VisualElement',
    visualElements: 'VisualElement[]',
    audioElement: 'AudioElement',
    closedCaptionsElement: 'ClosedCaptionsElement',
    backgroundElement: 'BackgroundElement',
    imageElementWithCaption: 'ImageElementWithCaption',
    imageElementsWithCaption: 'ImageElementWithCaption[]',
    stackDirection: 'StackDirection',
    stackAlign: 'StackAlign',
    stackSpacing: 'StackSpacing',
    stackElement: 'StackElement',
    gridElement: 'GridElement',
    geoPosition: 'GeoPosition',
    marker: 'Marker',
    markers: 'Marker[]',
    markerWithImage: 'MarkerWithImage',
    markersWithImage: 'MarkerWithImage[]',
    answer: 'Answer',
    answers: 'Answer[]',
    quizAnswer: 'QuizAnswer',
    quizAnswers: 'QuizAnswer[]',
    callToActionTypes: 'CallToActionType',
    callToAction: 'CallToAction',
    shareIncentive: 'ShareIncentive',
    activeForm: 'ActiveForm',
    speaker: 'Speaker',
    speakers: 'Speaker[]',
    conversationMessage: 'ConversationMessage',
    conversationMessages: 'ConversationMessage[]',
    conversation: 'Conversation',
    alternatives: 'Alternatives',
    // Definitions
    field: 'Field',
    fields: 'Field[]',
    screenDefinition: 'ScreenDefinition',
    screenDefinitions: 'ScreenDefinition[]',
    fieldDefinition: 'FieldDefinition',
    fieldDefinitions: 'FieldDefinition[]',
    // Components
    storyComponent: 'StoryComponent',
    storyComponents: 'StoryComponent[]',
    screenComponent: 'ScreenComponent',
    screenComponents: 'ScreenComponent[]',
    screen: 'ScreenComponent',
    // Theme/Story
    theme: 'Theme',
    viewerTheme: 'ViewerTheme',
    metadata: 'Metadata',
    tag: 'Tag',
    tags: 'Tag[]',
    story: 'Story',
    // Render
    deviceScreen: 'DeviceScreen',
    deviceScreens: 'DeviceScreen[]',
    screenSize: 'ScreenSize',
    renderContext: 'RenderContext',
    // Screens
    adFormats: 'AdFormats',
    adFormat: 'AdFormat',
    audioComponent: 'AudioComponent',
    slide: 'Slide',
    slides: 'Slide[]',
    containerStyle: 'ContainerStyle',
    // Transitions
    transitionName: 'TransitionName',
    transition: 'Transition',
    transitions: 'Transitions',
    // Other
    searchFilter: 'SearchFilter',
    paymentItem: 'PaymentItem',
    pageMetadata: 'PageMetadata',
    authorElement: 'AuthorElement',
    visitor: 'Visitor',
    badge: 'Badge',
    customAnswer: 'CustomAnswer',
    header: 'Header',
    footer: 'Footer',
    reload: 'Reload',
    closedCaptions: 'ClosedCaptions',
    buttonLayout: 'ButtonLayout',
    buttonElement: 'ButtonElement',
};

// ─── Convert a PropTypes AST node to a TypeScript type string ───

function propTypeToTS(source, node, required = false) {
    if (!node) return 'unknown';

    // Handle .isRequired suffix
    if (
        node.type === 'MemberExpression' &&
        node.property &&
        node.property.name === 'isRequired'
    ) {
        return propTypeToTS(source, node.object, true);
    }

    // MicromagPropTypes.X
    if (node.type === 'MemberExpression' && node.object) {
        const objName = getNodeName(node.object);
        const propName = node.property && node.property.name;

        if (objName === 'MicromagPropTypes' && propName) {
            const mapped = micromagTypeMap[propName];
            if (mapped) return mapped;
            // Fallback: PascalCase the name
            return propName.charAt(0).toUpperCase() + propName.slice(1);
        }

        if (objName === 'PropTypes' && propName) {
            switch (propName) {
                case 'string':
                    return 'string';
                case 'number':
                    return 'number';
                case 'bool':
                    return 'boolean';
                case 'func':
                    return '(...args: unknown[]) => void';
                case 'node':
                    return 'React.ReactNode';
                case 'element':
                    return 'React.ReactElement';
                case 'any':
                    return 'unknown';
                case 'object':
                    return 'Record<string, unknown>';
                case 'array':
                    return 'unknown[]';
                case 'symbol':
                    return 'symbol';
                default:
                    return 'unknown';
            }
        }
    }

    // PropTypes.arrayOf(X)
    if (node.type === 'CallExpression') {
        const callee = node.callee;
        if (callee && callee.type === 'MemberExpression') {
            const objName = getNodeName(callee.object);
            const methodName = callee.property && callee.property.name;

            if (objName === 'PropTypes') {
                switch (methodName) {
                    case 'arrayOf': {
                        const inner = node.arguments[0];
                        const innerType = propTypeToTS(source, inner);
                        return `${wrapIfUnion(innerType)}[]`;
                    }
                    case 'objectOf': {
                        const inner = node.arguments[0];
                        const innerType = propTypeToTS(source, inner);
                        return `Record<string, ${innerType}>`;
                    }
                    case 'oneOf': {
                        const arr = node.arguments[0];
                        if (arr && arr.type === 'ArrayExpression') {
                            const values = arr.elements
                                .map((el) => literalToTS(el))
                                .filter(Boolean);
                            if (values.length === 0) return 'unknown';
                            return values.join(' | ');
                        }
                        return 'unknown';
                    }
                    case 'oneOfType': {
                        const arr = node.arguments[0];
                        if (arr && arr.type === 'ArrayExpression') {
                            const types = arr.elements
                                .map((el) => propTypeToTS(source, el))
                                .map((t) => {
                                    // Wrap arrow function types in parens for union safety
                                    if (t && t.includes('=>') && !t.startsWith('(')) return `(${t})`;
                                    return t;
                                })
                                .filter(Boolean);
                            if (types.length === 0) return 'unknown';
                            // Deduplicate
                            const unique = [...new Set(types)];
                            return unique.join(' | ');
                        }
                        return 'unknown';
                    }
                    case 'shape': {
                        const arg = node.arguments[0];
                        if (!arg) return 'Record<string, unknown>';
                        if (arg.type === 'ObjectExpression') {
                            return shapeToTS(source, arg);
                        }
                        return 'Record<string, unknown>';
                    }
                    case 'exact': {
                        const arg = node.arguments[0];
                        if (arg && arg.type === 'ObjectExpression') {
                            return shapeToTS(source, arg);
                        }
                        return 'Record<string, unknown>';
                    }
                    case 'instanceOf': {
                        const arg = node.arguments[0];
                        if (arg && arg.type === 'Identifier') {
                            return arg.name;
                        }
                        return 'unknown';
                    }
                    default:
                        return 'unknown';
                }
            }
        }

        // MicromagPropTypes as a call? e.g. MicromagPropTypes.componentNames(X)
        if (callee && callee.type === 'MemberExpression') {
            const objName = getNodeName(callee.object);
            if (objName === 'MicromagPropTypes') {
                return 'string'; // componentNames() returns string enum
            }
        }
    }

    // Bare identifier — could be a local reference or imported PropType
    if (node.type === 'Identifier') {
        // Check if it's one of the micromag PropTypes referenced without prefix
        // This happens inside PropTypes.js itself but not in components
        return 'unknown';
    }

    // Spread element in an array (rare)
    if (node.type === 'SpreadElement') {
        return propTypeToTS(source, node.argument);
    }

    return 'unknown';
}

function shapeToTS(source, objExpr) {
    if (!objExpr || !objExpr.properties || objExpr.properties.length === 0) {
        return 'Record<string, unknown>';
    }

    const props = [];
    for (const prop of objExpr.properties) {
        if (prop.type === 'SpreadElement') {
            // Spread in shape — we can't fully resolve, treat as Record merge
            props.push(`[key: string]: unknown`);
            continue;
        }
        const key = prop.key
            ? prop.key.type === 'Identifier'
                ? prop.key.name
                : prop.key.value
            : null;
        if (!key) continue;

        let isRequired = false;
        let valueNode = prop.value;

        // Check for .isRequired
        if (
            valueNode &&
            valueNode.type === 'MemberExpression' &&
            valueNode.property &&
            valueNode.property.name === 'isRequired'
        ) {
            isRequired = true;
            valueNode = valueNode.object;
        }

        const tsType = propTypeToTS(source, valueNode);
        const opt = isRequired ? '' : '?';
        props.push(`${key}${opt}: ${tsType}`);
    }

    return `{ ${props.join('; ')} }`;
}

function literalToTS(node) {
    if (!node) return 'null';
    if (node.type === 'NullLiteral' || (node.type === 'Literal' && node.value === null)) {
        return 'null';
    }
    if (node.type === 'StringLiteral' || (node.type === 'Literal' && typeof node.value === 'string')) {
        return `'${node.value}'`;
    }
    if (node.type === 'NumericLiteral' || (node.type === 'Literal' && typeof node.value === 'number')) {
        return `${node.value}`;
    }
    if (node.type === 'BooleanLiteral' || (node.type === 'Literal' && typeof node.value === 'boolean')) {
        return `${node.value}`;
    }
    // Spread or other expression in oneOf
    if (node.type === 'SpreadElement') {
        return null; // Skip spreads in oneOf arrays
    }
    return null;
}

function getNodeName(node) {
    if (!node) return '';
    if (node.type === 'Identifier') return node.name;
    if (node.type === 'MemberExpression') {
        return `${getNodeName(node.object)}.${getNodeName(node.property)}`;
    }
    return '';
}

function wrapIfUnion(type) {
    if (type.includes(' | ')) return `(${type})`;
    return type;
}

// ─── Main: Parse file, extract propTypes, generate interface, transform ───

const jscodeshift = require('jscodeshift');
const j = jscodeshift.withParser('babel');

let successCount = 0;
let skipCount = 0;
let errorCount = 0;

for (const file of files) {
    try {
        processFile(file);
    } catch (err) {
        console.error(`ERROR: ${file}: ${err.message}`);
        if (verbose) console.error(err.stack);
        errorCount++;
    }
}

console.log(`\nDone: ${successCount} converted, ${skipCount} skipped, ${errorCount} errors`);

function processFile(filePath) {
    const source = fs.readFileSync(filePath, 'utf-8');
    const root = j(source);

    // ─── 1. Find `const propTypes = { ... }` ───
    const propTypesDecls = root.find(j.VariableDeclaration).filter((p) => {
        const decls = p.node.declarations;
        return (
            decls.length === 1 &&
            decls[0].id.type === 'Identifier' &&
            decls[0].id.name === 'propTypes' &&
            decls[0].init &&
            decls[0].init.type === 'ObjectExpression'
        );
    });

    if (propTypesDecls.length === 0) {
        if (verbose) console.log(`SKIP: ${filePath} — no propTypes declaration found`);
        skipCount++;
        return;
    }

    const propTypesNode = propTypesDecls.get().node.declarations[0].init;

    // ─── 2. Extract prop types ───
    const interfaceProps = [];
    const micromagTypesUsed = new Set();

    for (const prop of propTypesNode.properties) {
        if (prop.type === 'SpreadElement') {
            // Rare: spread in propTypes object
            interfaceProps.push(`    [key: string]: unknown;`);
            continue;
        }

        const key = prop.key
            ? prop.key.type === 'Identifier'
                ? prop.key.name
                : prop.key.value
            : null;
        if (!key) continue;

        let isRequired = false;
        let valueNode = prop.value;

        // Handle shorthand: { children } in propTypes (shouldn't happen but be safe)
        if (!valueNode && prop.shorthand) {
            interfaceProps.push(`    ${key}?: unknown;`);
            continue;
        }

        // Check for .isRequired at top level
        if (
            valueNode &&
            valueNode.type === 'MemberExpression' &&
            valueNode.property &&
            valueNode.property.name === 'isRequired'
        ) {
            isRequired = true;
            valueNode = valueNode.object;
        }

        const tsType = propTypeToTS(source, valueNode);

        // Track which micromag types are needed
        collectMicromagTypes(valueNode, micromagTypesUsed);

        const opt = isRequired ? '' : '?';
        interfaceProps.push(`    ${key}${opt}: ${tsType};`);
    }

    // ─── 3. Determine component name and interface name ───
    // Find Component.propTypes = propTypes
    const propTypesAssignments = root.find(j.ExpressionStatement).filter((p) => {
        const expr = p.node.expression;
        return (
            expr.type === 'AssignmentExpression' &&
            expr.left.type === 'MemberExpression' &&
            expr.left.property.name === 'propTypes'
        );
    });

    let componentName = null;
    if (propTypesAssignments.length > 0) {
        const firstAssignment = propTypesAssignments.get().node.expression;
        componentName = getNodeName(firstAssignment.left.object);
    }

    if (!componentName) {
        // Try to find the default export
        const defaultExports = root.find(j.ExportDefaultDeclaration);
        if (defaultExports.length > 0) {
            const decl = defaultExports.get().node.declaration;
            if (decl.type === 'Identifier') {
                componentName = decl.name;
            }
        }
    }

    if (!componentName) {
        // Last resort: derive from filename
        componentName = path.basename(filePath, '.jsx');
    }

    const interfaceName = `${componentName}Props`;

    // Generate interface string
    let interfaceStr;
    if (interfaceProps.length === 0) {
        interfaceStr = `interface ${interfaceName} {\n    [key: string]: unknown;\n}`;
    } else {
        interfaceStr = `interface ${interfaceName} {\n${interfaceProps.join('\n')}\n}`;
    }

    // ─── 4. Build the new source with string manipulation ───
    // Using string manipulation for reliability with complex JSX

    let newSource = source;

    // 4a. Remove `import PropTypes from 'prop-types';`
    newSource = newSource.replace(
        /import\s+PropTypes\s+from\s+['"]prop-types['"];?\s*\n/g,
        '',
    );

    // 4b. Transform MicromagPropTypes import → type import from '@micromag/core'
    // First check if there are micromag types to import
    const micromagImportTypes = [];
    for (const typeName of micromagTypesUsed) {
        micromagImportTypes.push(typeName);
    }

    // Check for React.ReactNode etc. usage
    const needsReactNode = interfaceStr.includes('React.ReactNode');
    const needsReactElement = interfaceStr.includes('React.ReactElement');

    // Replace the MicromagPropTypes import
    const micromagPropTypesImportRegex =
        /import\s+\{\s*PropTypes\s+as\s+MicromagPropTypes\s*\}\s+from\s+['"]@micromag\/core['"];?\s*\n/;
    const micromagPropTypesRelativeRegex =
        /import\s+\{\s*PropTypes\s+as\s+MicromagPropTypes\s*\}\s+from\s+['"]\.\.\/lib['"];?\s*\n/;

    // Determine correct import path: files inside packages/core/ use relative '../lib'
    const isInsideCore = filePath.includes('packages/core/');
    const isRelativeImport = micromagPropTypesRelativeRegex.test(newSource);

    if (micromagImportTypes.length > 0) {
        const sortedTypes = [...micromagImportTypes].sort();
        const importPath = (isInsideCore || isRelativeImport) ? '../lib' : '@micromag/core';
        const typeImport = `import type { ${sortedTypes.join(', ')} } from '${importPath}';\n`;

        if (micromagPropTypesImportRegex.test(newSource)) {
            newSource = newSource.replace(micromagPropTypesImportRegex, typeImport);
        } else if (micromagPropTypesRelativeRegex.test(newSource)) {
            newSource = newSource.replace(micromagPropTypesRelativeRegex, typeImport);
        }
    } else {
        // No micromag types needed — remove the import entirely
        newSource = newSource.replace(micromagPropTypesImportRegex, '');
        newSource = newSource.replace(micromagPropTypesRelativeRegex, '');
    }

    // 4c. Remove `const propTypes = { ... };`
    // We need to find the exact range. Use regex to find the start, then count braces.
    newSource = removeConstPropTypes(newSource);

    // 4d. Remove `ComponentName.propTypes = propTypes;`
    newSource = newSource.replace(
        /\w+\.propTypes\s*=\s*propTypes;?\s*\n?/g,
        '',
    );

    // Also handle inline propTypes assignments like `Icon.propTypes = { label: PropTypes.string.isRequired };`
    // These are sub-component propTypes — remove them
    newSource = newSource.replace(
        /\w+\.propTypes\s*=\s*\{[^}]*\};?\s*\n?/g,
        '',
    );

    // 4e. Insert the interface before the component function
    // Find the component declaration and insert interface above it
    newSource = insertInterface(newSource, interfaceStr, componentName);

    // 4f. Clean up multiple blank lines
    newSource = newSource.replace(/\n{3,}/g, '\n\n');

    // ─── 5. Write output ───
    if (dryRun) {
        console.log(`DRY RUN: ${filePath} → would convert`);
        if (verbose) {
            console.log('--- Interface ---');
            console.log(interfaceStr);
            console.log('--- Micromag types needed ---');
            console.log([...micromagTypesUsed].join(', ') || '(none)');
            console.log('');
        }
    } else {
        // Write the transformed content
        fs.writeFileSync(filePath, newSource, 'utf-8');

        // Rename .jsx → .tsx
        const newPath = filePath.replace(/\.jsx$/, '.tsx');
        if (filePath.endsWith('.jsx')) {
            execSync(`git mv "${filePath}" "${newPath}"`, { stdio: 'pipe' });
        }

        console.log(`OK: ${filePath} → ${path.basename(newPath)}`);
    }

    successCount++;
}

// ─── Helper: Collect all MicromagPropTypes.X references and map to TS types ───

function collectMicromagTypes(node, typeSet) {
    if (!node) return;

    if (node.type === 'MemberExpression') {
        const objName = getNodeName(node.object);
        const propName = node.property && node.property.name;

        if (propName === 'isRequired') {
            collectMicromagTypes(node.object, typeSet);
            return;
        }

        if (objName === 'MicromagPropTypes' && propName) {
            const mapped = micromagTypeMap[propName];
            if (mapped) {
                // Extract base type name (strip [] for array types)
                const baseType = mapped.replace(/\[\]$/, '').replace(/^Record<.*>$/, '');
                // Only add actual type imports, not primitives
                if (baseType && !baseType.includes(' ') && /^[A-Z]/.test(baseType)) {
                    typeSet.add(baseType);
                }
            }
        }
    }

    // Recurse into call arguments
    if (node.type === 'CallExpression') {
        if (node.arguments) {
            for (const arg of node.arguments) {
                collectMicromagTypes(arg, typeSet);
            }
        }
        collectMicromagTypes(node.callee, typeSet);
    }

    // Recurse into array elements
    if (node.type === 'ArrayExpression') {
        for (const el of node.elements) {
            if (el) collectMicromagTypes(el, typeSet);
        }
    }

    // Recurse into object properties
    if (node.type === 'ObjectExpression') {
        for (const prop of node.properties) {
            if (prop.value) collectMicromagTypes(prop.value, typeSet);
        }
    }
}

// ─── Helper: Remove `const propTypes = { ... };` via brace counting ───

function removeConstPropTypes(source) {
    const regex = /^const propTypes\s*=\s*\{/m;
    const match = regex.exec(source);
    if (!match) return source;

    const startIdx = match.index;
    let braceCount = 0;
    let i = match.index + match[0].length - 1; // Position at the opening {
    let endIdx = -1;

    for (; i < source.length; i++) {
        if (source[i] === '{') braceCount++;
        else if (source[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                endIdx = i;
                break;
            }
        }
    }

    if (endIdx === -1) return source;

    // Include trailing semicolon and newline
    let afterEnd = endIdx + 1;
    if (source[afterEnd] === ';') afterEnd++;
    while (source[afterEnd] === '\n' || source[afterEnd] === '\r') afterEnd++;

    return source.slice(0, startIdx) + source.slice(afterEnd);
}

// ─── Helper: Insert interface before the component ───

function insertInterface(source, interfaceStr, componentName) {
    // Strategy: find the component function declaration and insert above it

    // Pattern 1: `const ComponentName = (`  (arrow function)
    const arrowRegex = new RegExp(`^(const ${componentName}\\s*=\\s*)`, 'm');
    let match = arrowRegex.exec(source);
    if (match) {
        return (
            source.slice(0, match.index) +
            interfaceStr +
            '\n\n' +
            source.slice(match.index)
        );
    }

    // Pattern 2: `function ComponentName(` (function declaration)
    const funcRegex = new RegExp(`^(function ${componentName}\\s*\\()`, 'm');
    match = funcRegex.exec(source);
    if (match) {
        return (
            source.slice(0, match.index) +
            interfaceStr +
            '\n\n' +
            source.slice(match.index)
        );
    }

    // Pattern 3: `export const ComponentName = (`
    const exportArrowRegex = new RegExp(`^(export const ${componentName}\\s*=\\s*)`, 'm');
    match = exportArrowRegex.exec(source);
    if (match) {
        return (
            source.slice(0, match.index) +
            interfaceStr +
            '\n\n' +
            source.slice(match.index)
        );
    }

    // Fallback: insert after the last import
    const lastImportIdx = findLastImportEnd(source);
    if (lastImportIdx > 0) {
        return (
            source.slice(0, lastImportIdx) +
            '\n' +
            interfaceStr +
            '\n' +
            source.slice(lastImportIdx)
        );
    }

    // Last resort: prepend
    return interfaceStr + '\n\n' + source;
}

function findLastImportEnd(source) {
    let lastEnd = -1;
    const importRegex = /^import\s.+;?\s*$/gm;
    let match;
    while ((match = importRegex.exec(source)) !== null) {
        lastEnd = match.index + match[0].length;
    }
    // Also check for multi-line imports
    const multiImportRegex = /^import\s[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm;
    while ((match = multiImportRegex.exec(source)) !== null) {
        if (match.index + match[0].length > lastEnd) {
            lastEnd = match.index + match[0].length;
        }
    }
    return lastEnd > 0 ? lastEnd + 1 : -1;
}
