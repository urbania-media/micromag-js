#!/usr/bin/env node

/**
 * SCSS to CSS Module Migration Script
 *
 * Converts .module.css files to .module.css by:
 * 1. Removing @import/@use lines for variables/placeholders/mixins/sass:math
 * 2. Replacing $variable references with var(--mm-variable)
 * 3. Replacing @extend %placeholder with composes: from shared.module.css
 * 4. Replacing rgba($var, opacity) with pre-computed values
 * 5. Replacing math.div(a, b) with calc(a / b)
 * 6. Renaming the file from .module.css to .module.css
 *
 * Usage: node scripts/codemods/scss-to-css-modules.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dryRun = process.argv.includes('--dry-run');

// Map Sass variable names to CSS custom property names
// Only variables actually used in .module.css files
const variableMap = {
    // Colors
    white: '--mm-white',
    black: '--mm-black',
    purple: '--mm-purple',
    red: '--mm-red',
    green: '--mm-green',
    blue: '--mm-blue',
    yellow: '--mm-yellow',

    // Theme aliases
    primary: '--mm-primary',
    secondary: '--mm-secondary',
    info: '--mm-info',
    light: '--mm-light',
    dark: '--mm-dark',

    // Gray scale
    'gray-100': '--mm-gray-100',
    'gray-200': '--mm-gray-200',
    'gray-300': '--mm-gray-300',
    'gray-400': '--mm-gray-400',
    'gray-500': '--mm-gray-500',
    'gray-600': '--mm-gray-600',
    'gray-700': '--mm-gray-700',
    'gray-800': '--mm-gray-800',
    'gray-900': '--mm-gray-900',

    // Typography
    'font-family-sans-serif': '--mm-font-family-sans-serif',
    'font-family-monospace': '--mm-font-family-monospace',
    'font-weight-normal': '--mm-font-weight-normal',
    'font-weight-bold': '--mm-font-weight-bold',
    'font-size-sm': '--mm-font-size-sm',

    // Input/Form
    'input-bg': '--mm-input-bg',
    'input-color': '--mm-input-color',
    'input-border-width': '--mm-input-border-width',
    'input-border-color': '--mm-input-border-color',
    'input-border-radius': '--mm-input-border-radius',
    'input-border-radius-sm': '--mm-input-border-radius-sm',
    'input-border-radius-lg': '--mm-input-border-radius-lg',
    'input-font-size': '--mm-input-font-size',
    'input-font-size-sm': '--mm-input-font-size-sm',
    'input-font-size-lg': '--mm-input-font-size-lg',
    'input-line-height': '--mm-input-line-height',
    'input-btn-padding-y': '--mm-input-btn-padding-y',
    'input-btn-padding-x': '--mm-input-btn-padding-x',
    'input-btn-padding-y-sm': '--mm-input-btn-padding-y-sm',
    'input-btn-padding-x-sm': '--mm-input-btn-padding-x-sm',
    'input-btn-padding-y-lg': '--mm-input-btn-padding-y-lg',
    'input-btn-padding-x-lg': '--mm-input-btn-padding-x-lg',
    'input-btn-focus-color': '--mm-input-btn-focus-color',

    // Body
    'body-bg': '--mm-body-bg',
    'body-color': '--mm-body-color',

    // Spacing
    spacer: '--mm-spacer',

    // Border
    'border-color': '--mm-border-color',

    // Easing
    'ease-in-bounce': '--mm-ease-in-bounce',
    'ease-in-out-bounce': '--mm-ease-in-out-bounce',
    'ease-in-out-soft-sine': '--mm-ease-in-out-soft-sine',
    'ease-in-out-sine': '--mm-ease-in-out-sine',
    'ease-in-out-hard-sine': '--mm-ease-in-out-hard-sine',
    'ease-in-ramp': '--mm-ease-in-ramp',
    'ease-out-ramp': '--mm-ease-out-ramp',
    'ease-in-kickback': '--mm-ease-in-kickback',
    'ease-in-yo': '--mm-ease-in-yo',
    'ease-in-bump': '--mm-ease-in-bump',
};

// Map for rgba() calls with known color variables to pre-computed hex values
const rgbaMap = {
    'rgba($white, 0.6)': 'rgba(255, 255, 255, 0.6)',
    'rgba($white, 0.4)': 'rgba(255, 255, 255, 0.4)',
    'rgba($white, 0.5)': 'rgba(255, 255, 255, 0.5)',
    'rgba($white, 0.07)': 'rgba(255, 255, 255, 0.07)',
    'rgba($white, 0.12)': 'rgba(255, 255, 255, 0.12)',
    'rgba($white, 0.13)': 'rgba(255, 255, 255, 0.13)',
    'rgba($white, 0.04)': 'rgba(255, 255, 255, 0.04)',
    'rgba($white, 0.1)': 'rgba(255, 255, 255, 0.1)',
    'rgba($white, 0.2)': 'rgba(255, 255, 255, 0.2)',
    'rgba($white, 0.3)': 'rgba(255, 255, 255, 0.3)',
    'rgba($black, 0)': 'rgba(28, 28, 28, 0)',
    'rgba($black, 0.2)': 'rgba(28, 28, 28, 0.2)',
    'rgba($black, 0.3)': 'rgba(28, 28, 28, 0.3)',
    'rgba($black, 0.4)': 'rgba(28, 28, 28, 0.4)',
    'rgba($black, 0.5)': 'rgba(28, 28, 28, 0.5)',
    'rgba($black, 0.6)': 'rgba(28, 28, 28, 0.6)',
    'rgba($black, 0.7)': 'rgba(28, 28, 28, 0.7)',
    'rgba($black, 0.8)': 'rgba(28, 28, 28, 0.8)',
    'rgba($black, 1)': 'rgba(28, 28, 28, 1)',
    'rgba($primary, 0.4)': 'rgba(161, 61, 255, 0.4)',
    'rgba($purple, 0.4)': 'rgba(161, 61, 255, 0.4)',
    'rgba($gray-800, 0.5)': 'rgba(52, 52, 52, 0.5)',
    'rgba($gray-100, 0.6)': 'rgba(245, 245, 245, 0.6)',
    'rgba($black, 0.75)': 'rgba(28, 28, 28, 0.75)',
    'rgba($black, 0.85)': 'rgba(28, 28, 28, 0.85)',
    'rgba($black, 0.1)': 'rgba(28, 28, 28, 0.1)',
    'rgba($white, 0.45)': 'rgba(255, 255, 255, 0.45)',
    'rgba($white, 0.25)': 'rgba(255, 255, 255, 0.25)',
    'rgba($gray-900, 0.8)': 'rgba(43, 43, 43, 0.8)',
};

// Placeholder to shared.module.css class name mapping
const placeholderMap = {
    'hide-scrollbars': 'hideScrollbars',
    'reset-viewer-fonts': 'resetViewerFonts',
    'reset-viewer-elements': 'resetViewerElements',
    'reset-viewer': 'resetViewer',
    'reset-button': 'resetButton',
    'reset-input': 'resetInput',
    fullscreen: 'fullscreen',
    screen: 'screen',
    empty: 'empty',
    'empty-text': 'emptyText',
    'empty-image': 'emptyImage',
    'text-inner-styles': 'textInnerStyles',
    'text-styles': 'textStyles',
    flex: 'flex',
    'flex-full': 'flexFull',
    'placeholder-full': 'placeholderFull',
    'placeholder-center': 'placeholderCenter',
    'placeholder-left': 'placeholderLeft',
    'placeholder-right': 'placeholderRight',
    'form-disabled': 'formDisabled',
    'form-transitions': 'formTransitions',
    'focus-outline': 'focusOutline',
};

// Cross-file local placeholder mappings
// Placeholders defined in local _placeholders.scss files (not the core one)
const crossFilePlaceholders = {
    'field-with-form': './placeholders.module.css',
};

// Import patterns to remove
const importPatterns = [
    /^@import\s+['"]~@micromag\/core\/scss\/variables['"];\s*$/,
    /^@import\s+['"]~@micromag\/core\/scss\/placeholders['"];\s*$/,
    /^@import\s+['"]~@micromag\/core\/scss\/mixins['"];\s*$/,
    /^@import\s+['"]\.\.\/variables['"];\s*$/,
    /^@import\s+['"]\.\.\/placeholders['"];\s*$/,
    /^@import\s+['"]\.\.\/mixins['"];\s*$/,
    /^@import\s+['"]\.\/variables['"];\s*$/,
    /^@import\s+['"]\.\/placeholders['"];\s*$/,
    /^@import\s+['"]placeholders['"];\s*$/,
    /^@import\s+['"]variables['"];\s*$/,
    /^@use\s+['"]sass:math['"];\s*$/,
];

function convertFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const warnings = [];
    let needsSharedImport = false;

    // Determine the correct import path for shared.module.css
    // Files in packages/core/src/styles use a relative path
    // All others use the package path
    const isInCoreStyles = filePath.includes('packages/core/src/styles/');
    let sharedImportPath;
    if (isInCoreStyles) {
        const fileDir = path.dirname(filePath);
        const sharedPath = path.resolve(
            filePath.replace(/\/packages\/core\/src\/styles\/.*/, '/packages/core/src/styles'),
            'shared.module.css',
        );
        sharedImportPath = path.relative(fileDir, sharedPath);
        if (!sharedImportPath.startsWith('.')) {
            sharedImportPath = './' + sharedImportPath;
        }
    } else {
        sharedImportPath = '@micromag/core/styles/shared.module.css';
    }

    // 0. Resolve local _variables.scss imports and collect their variables
    const localImportedVars = new Map();
    const localVarImportRegex = /^@import\s+['"]\.\/variables['"];\s*$/m;
    if (localVarImportRegex.test(content)) {
        const fileDir = path.dirname(filePath);
        const localVarsFile = path.join(fileDir, '_variables.scss');
        if (fs.existsSync(localVarsFile)) {
            const localVarsContent = fs.readFileSync(localVarsFile, 'utf8');
            const varDefRegex = /^\s*\$([a-z][a-z0-9_-]*):\s*(.+?)\s*;\s*$/gim;
            let vm;
            while ((vm = varDefRegex.exec(localVarsContent)) !== null) {
                localImportedVars.set(vm[1], vm[2]);
            }
        }
    }

    // 1. Remove import lines
    const lines = content.split('\n');
    const filteredLines = [];
    let lastWasEmptyAfterImport = false;

    for (const line of lines) {
        const trimmed = line.trim();
        let shouldRemove = false;

        for (const pattern of importPatterns) {
            if (pattern.test(trimmed)) {
                shouldRemove = true;
                break;
            }
        }

        if (shouldRemove) {
            lastWasEmptyAfterImport = true;
            continue;
        }

        // Skip blank lines right after removed imports
        if (lastWasEmptyAfterImport && trimmed === '') {
            continue;
        }
        lastWasEmptyAfterImport = false;
        filteredLines.push(line);
    }
    content = filteredLines.join('\n');

    // 2. Find locally-defined placeholders in this file
    const localPlaceholders = new Set();
    const localPlaceholderRegex = /^%([a-z][a-z0-9-]*)\s*\{/gm;
    let placeholderMatch;
    while ((placeholderMatch = localPlaceholderRegex.exec(content)) !== null) {
        localPlaceholders.add(placeholderMatch[1]);
    }

    // Convert local %placeholder definitions to regular .class definitions
    content = content.replace(/^(%([a-z][a-z0-9-]*))\s*\{/gm, (match, full, name) => {
        return `.${name} {`;
    });

    // Replace @extend %placeholder with composes:
    content = content.replace(/@extend\s+%([a-z][a-z0-9-]*)/g, (match, name) => {
        // If it's a local placeholder, use composes without a from clause
        if (localPlaceholders.has(name)) {
            return `composes: ${name}`;
        }

        const className = placeholderMap[name];
        if (className) {
            needsSharedImport = true;
            return `composes: ${className} from '${sharedImportPath}'`;
        }

        // Check cross-file local placeholders
        if (crossFilePlaceholders[name]) {
            return `composes: ${name} from '${crossFilePlaceholders[name]}'`;
        }

        warnings.push(`Unknown placeholder: %${name}`);
        return match;
    });

    // 3. Replace rgba($var, opacity) with pre-computed values
    content = content.replace(/rgba\(\$([a-z][a-z0-9-]*),\s*([0-9.]+)\)/gi, (match, varName, opacity) => {
        const key = `rgba($${varName}, ${opacity})`;
        if (rgbaMap[key]) {
            return rgbaMap[key];
        }
        warnings.push(`Unknown rgba(): ${match}`);
        return match;
    });

    // 4. Replace math.div(a, b) with calc(a / b)
    content = content.replace(/math\.div\(([^,]+),\s*([^)]+)\)/g, (match, a, b) => {
        // Replace any $variables in the arguments too
        const processedA = a.trim();
        const processedB = b.trim();
        return `calc(${processedA} / ${processedB})`;
    });

    // 5. Replace $variable references with var(--mm-variable)
    // Handle $variable * number, $variable + number, etc.
    // But don't replace local variables (those defined with $varname: value in the same file)
    const localVars = new Set();
    const localVarRegex = /^\s*\$([a-z][a-z0-9_-]*):\s/gim;
    let localMatch;
    while ((localMatch = localVarRegex.exec(content)) !== null) {
        localVars.add(localMatch[1]);
    }

    content = content.replace(/\$([a-z][a-z0-9_-]*)/gi, (match, varName) => {
        // Skip local variables defined in this file
        if (localVars.has(varName)) {
            return match;
        }

        // Inline variables imported from local _variables.scss
        if (localImportedVars.has(varName)) {
            return localImportedVars.get(varName);
        }

        const cssVar = variableMap[varName];
        if (cssVar) {
            return `var(${cssVar})`;
        }

        // Unknown variable - warn
        warnings.push(`Unknown variable: $${varName}`);
        return match;
    });

    // 6. Handle remaining third-party @import (rc-switch, rc-slider) — keep them
    // These are already handled by not being in the remove patterns

    // 7. Remove leading blank lines
    content = content.replace(/^\n+/, '');

    // 8. Ensure file ends with a newline
    if (!content.endsWith('\n')) {
        content += '\n';
    }

    // Add composes import comment at the top if needed
    // (CSS modules don't have @import, composes handles the import inline)

    const hasChanged = content !== originalContent;
    const newFilePath = filePath.replace(/\.module\.scss$/, '.module.css');

    return {
        originalPath: filePath,
        newPath: newFilePath,
        content,
        hasChanged,
        warnings,
        needsSharedImport,
    };
}

function updateJsxImports(rootDir) {
    // Find all .jsx files that import .module.css
    const result = execSync(
        `grep -rl "\\.module\\.scss" --include="*.jsx" --include="*.js" --include="*.tsx" --include="*.ts" "${rootDir}" --exclude-dir=node_modules --exclude-dir=.claude 2>/dev/null || true`,
        { encoding: 'utf8' },
    );

    const files = result.trim().split('\n').filter(Boolean);
    let updatedCount = 0;

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        const updated = content.replace(/\.module\.scss/g, '.module.css');
        if (updated !== content) {
            if (!dryRun) {
                fs.writeFileSync(file, updated, 'utf8');
            }
            updatedCount++;
        }
    }

    return updatedCount;
}

// Main
const rootDir = path.resolve(__dirname, '../..');
const allFiles = execSync(
    `find "${rootDir}" -name "*.module.css" -not -path "*/node_modules/*" -not -path "*/.claude/*"`,
    { encoding: 'utf8' },
)
    .trim()
    .split('\n')
    .filter(Boolean);

console.log(`Found ${allFiles.length} .module.css files`);

let convertedCount = 0;
let warningCount = 0;
const allWarnings = [];

for (const file of allFiles) {
    const result = convertFile(file);

    if (result.warnings.length > 0) {
        allWarnings.push({ file: path.relative(rootDir, file), warnings: result.warnings });
        warningCount += result.warnings.length;
    }

    if (!dryRun) {
        // Write new .module.css file
        fs.writeFileSync(result.newPath, result.content, 'utf8');
        // Remove old .module.css file
        if (result.newPath !== result.originalPath) {
            fs.unlinkSync(result.originalPath);
        }
    }

    convertedCount++;
}

// Update JSX/JS imports
const jsUpdatedCount = updateJsxImports(rootDir);

console.log(`\nResults:`);
console.log(`  Converted: ${convertedCount} files`);
console.log(`  JS/JSX imports updated: ${jsUpdatedCount} files`);
console.log(`  Warnings: ${warningCount}`);

if (allWarnings.length > 0) {
    console.log(`\nWarnings:`);
    for (const { file, warnings } of allWarnings) {
        console.log(`  ${file}:`);
        for (const w of warnings) {
            console.log(`    - ${w}`);
        }
    }
}

if (dryRun) {
    console.log(`\n(Dry run - no files were changed)`);
}
