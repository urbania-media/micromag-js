#!/usr/bin/env node

/**
 * fix-local-sass-vars.js
 *
 * Finds .module.css files that still contain $variable definitions,
 * inlines the values, removes the definitions, and handles:
 *   - Simple $var replacements
 *   - Sass interpolation #{...} removal
 *   - Simple multiplication like `100% * 4` → `400%`
 *   - Sass-style subtraction outside calc like `calc(X / Y) - Z` → `calc(X / Y - Z)`
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');

// All files that were identified as having $variable definitions
const TARGET_FILES = [
    'packages/viewer/src/styles/viewer.module.css',
    'packages/fields/src/styles/align-horizontal.module.css',
    'packages/fields/styles/align-horizontal.module.css',
    'packages/fields/styles/box-style.module.css',
    'screens/urbania-recommendation/src/urbania-recommendation.module.css',
    'screens/urbania-article/src/urbania-base-article-card.module.css',
    'screens/urbania-article/src/urbania-base-article.module.css',
];

function processFile(relPath) {
    const absPath = path.join(ROOT, relPath);
    if (!fs.existsSync(absPath)) {
        console.log(`  SKIP (not found): ${relPath}`);
        return false;
    }

    let content = fs.readFileSync(absPath, 'utf8');
    const originalContent = content;

    // 1. Extract all $var: value; definitions
    const varDefs = {};
    const defRegex = /^\$([a-zA-Z0-9_-]+)\s*:\s*(.+?)\s*;[ \t]*$/gm;
    let match;
    while ((match = defRegex.exec(content)) !== null) {
        varDefs[match[1]] = match[2];
    }

    if (Object.keys(varDefs).length === 0) {
        console.log(`  SKIP (no vars): ${relPath}`);
        return false;
    }

    console.log(`  Processing: ${relPath}`);
    console.log(`    Variables found:`);
    for (const [name, value] of Object.entries(varDefs)) {
        console.log(`      $${name}: ${value}`);
    }

    // 2. Remove definition lines (and any blank line immediately after)
    content = content.replace(/^\$[a-zA-Z0-9_-]+\s*:\s*.+?\s*;\s*\n/gm, '');

    // 3. Replace all $var usages with their values
    //    Sort by name length descending to avoid partial matches
    const sortedVarNames = Object.keys(varDefs).sort((a, b) => b.length - a.length);

    for (const name of sortedVarNames) {
        const value = varDefs[name];
        // Replace $name when followed by non-identifier chars (or end of line)
        const usageRegex = new RegExp('\\$' + name.replace(/[-]/g, '\\-') + '(?![a-zA-Z0-9_-])', 'g');
        content = content.replace(usageRegex, value);
    }

    // 4. Handle Sass interpolation: #{expr} → expr
    content = content.replace(/#\{([^}]+)\}/g, '$1');

    // 5. Handle simple percentage multiplication: `100% * N` → computed
    content = content.replace(/(\d+)%\s*\*\s*(\d+(?:\.\d+)?)/g, (match, pct, mult) => {
        const result = parseFloat(pct) * parseFloat(mult);
        return `${result}%`;
    });

    // 6. Handle patterns like `calc(X / Y) - Z` which is Sass subtraction outside calc
    //    Convert to `calc(X / Y - Z)` so it's valid CSS
    content = content.replace(/calc\(([^)]+)\)\s*-\s*(\d+[a-z%]+)/g, (match, inner, outside) => {
        return `calc(${inner} - ${outside})`;
    });

    // 7. Clean up any leading blank lines left from removing var definitions
    content = content.replace(/^\n+/, '');

    if (content === originalContent) {
        console.log(`    No changes needed.`);
        return false;
    }

    fs.writeFileSync(absPath, content, 'utf8');
    console.log(`    Written successfully.`);
    return true;
}

console.log('=== Fix Local Sass Variables in CSS Modules ===\n');

let totalFixed = 0;
for (const relPath of TARGET_FILES) {
    if (processFile(relPath)) {
        totalFixed++;
    }
}

// Also scan for any other .module.css files we may have missed
console.log('\n--- Scanning for any other .module.css files with $var definitions ---');

function findModuleCssFiles(dir) {
    const results = [];
    let entries;
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
        return results;
    }
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
            results.push(...findModuleCssFiles(full));
        } else if (entry.isFile() && entry.name.endsWith('.module.css')) {
            results.push(full);
        }
    }
    return results;
}

const allModuleCss = findModuleCssFiles(ROOT);
let extraFound = 0;
for (const absPath of allModuleCss) {
    const relPath = path.relative(ROOT, absPath);
    if (TARGET_FILES.includes(relPath)) continue;
    const content = fs.readFileSync(absPath, 'utf8');
    if (/^\$[a-zA-Z0-9_-]+\s*:/m.test(content)) {
        console.log(`  EXTRA file found: ${relPath}`);
        if (processFile(relPath)) {
            totalFixed++;
        }
        extraFound++;
    }
}

if (extraFound === 0) {
    console.log('  None found.');
}

console.log(`\n=== Done. ${totalFixed} file(s) fixed. ===`);
