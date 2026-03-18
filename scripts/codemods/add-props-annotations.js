#!/usr/bin/env node

/**
 * Codemod: Add missing TypeScript interface type annotations to function signatures.
 *
 * Finds files where an `interface FooProps { ... }` is defined but the component
 * function doesn't use it:
 *   function Foo({ prop1, prop2 }) {  →  function Foo({ prop1, prop2 }: FooProps) {
 *
 * Handles multiline destructuring and default values.
 */

import fs from 'fs';
import { globSync } from 'glob';

const files = globSync('{packages,elements,screens}/**/src/**/*.tsx', {
    ignore: ['**/*.stories.tsx', '**/node_modules/**'],
});

let fixed = 0;
let skipped = 0;

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    // Find interface definition ending in Props
    const interfaceMatch = content.match(/^interface (\w+Props)\s*\{/m);
    if (interfaceMatch === null) continue;

    const interfaceName = interfaceMatch[1];

    // Already annotated?
    if (content.includes('}: ' + interfaceName + ')')) continue;

    // Find the function declaration that uses destructured props.
    // We need to find `function Foo({` followed eventually by `}) {` or `} = {}) {`
    // and insert `: InterfaceName` before the closing `)`.

    // Strategy: find `function SomeName({` then find the matching `})` pattern.
    const funcDeclMatch = content.match(
        /^(export\s+)?(default\s+)?function\s+\w+\s*\(\s*\{/m,
    );
    if (funcDeclMatch === null) {
        // Try arrow function: const Foo = ({
        const arrowMatch = content.match(
            /^(export\s+)?(default\s+)?const\s+\w+\s*=\s*\(\s*\{/m,
        );
        if (arrowMatch === null) {
            skipped++;
            continue;
        }
    }

    // More robust: find the closing `}) {` or `}) =>` after the opening `({`
    // We need to handle nested braces inside default values like `= {}`
    const funcStart = funcDeclMatch
        ? funcDeclMatch.index
        : content.match(/^(export\s+)?(default\s+)?const\s+\w+\s*=\s*\(\s*\{/m).index;

    // Find the opening `({` position
    const openBraceIdx = content.indexOf('{', funcStart + content.slice(funcStart).indexOf('('));

    // Now walk through to find the matching closing brace
    let depth = 1;
    let i = openBraceIdx + 1;
    while (i < content.length && depth > 0) {
        const ch = content[i];
        if (ch === '{') depth++;
        else if (ch === '}') depth--;

        // Skip string literals
        if (ch === "'" || ch === '"' || ch === '`') {
            const quote = ch;
            i++;
            while (i < content.length && content[i] !== quote) {
                if (content[i] === '\\') i++; // skip escaped chars
                i++;
            }
        }
        i++;
    }

    // i is now just past the closing `}` of the destructuring
    const closingBraceIdx = i - 1;

    // Check what follows: should be `)` possibly with whitespace
    const afterBrace = content.slice(closingBraceIdx + 1);
    const closingParenMatch = afterBrace.match(/^\s*\)/);
    if (closingParenMatch === null) {
        // Maybe there's ` = {}` default before the `)`
        const defaultMatch = afterBrace.match(/^\s*=\s*\{[^}]*\}\s*\)/);
        if (defaultMatch === null) {
            skipped++;
            continue;
        }
        // Insert before the `)` in the default pattern
        const parenIdx = closingBraceIdx + 1 + defaultMatch[0].lastIndexOf(')');
        const newContent =
            content.slice(0, closingBraceIdx + 1) +
            ': ' +
            interfaceName +
            content.slice(closingBraceIdx + 1);
        fs.writeFileSync(file, newContent);
        fixed++;
        console.log(`Fixed: ${file} (${interfaceName})`);
        continue;
    }

    // Insert `: InterfaceName` after the closing `}` and before `)`
    const newContent =
        content.slice(0, closingBraceIdx + 1) +
        ': ' +
        interfaceName +
        content.slice(closingBraceIdx + 1);

    fs.writeFileSync(file, newContent);
    fixed++;
    console.log(`Fixed: ${file} (${interfaceName})`);
}

console.log(`\nDone. Fixed: ${fixed}, Skipped: ${skipped}`);
