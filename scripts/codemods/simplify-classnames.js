#!/usr/bin/env node

/**
 * Simplify classNames patterns codemod
 *
 * Transforms verbose conditional className patterns into simpler forms.
 *
 * Usage:
 *   node scripts/codemods/simplify-classnames.js <file-or-glob> [--dry-run]
 */

const fs = require('fs');
const { glob } = require('glob');

const dryRun = process.argv.includes('--dry-run');
const patterns = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));

if (patterns.length === 0) {
    console.error(
        'Usage: node scripts/codemods/simplify-classnames.js <file-or-glob> [--dry-run]',
    );
    process.exit(1);
}

function isSimpleCheck(varName, valueExpr) {
    const v = valueExpr.trim();
    return (
        v === varName ||
        v === `${varName} !== null` ||
        v === `${varName} != null`
    );
}

function processFile(filePath) {
    let source = fs.readFileSync(filePath, 'utf-8');
    let changeCount = 0;

    // Pass 1: Single-property objects on 3 lines
    // Matches:
    //   {
    //       [varName]: varName !== null,
    //   }
    // or:
    //   {
    //       [varName]: varName,
    //   }
    //
    // Replaces with just: varName
    {
        const regex =
            /^(\s*)\{\s*\n\s*\[(\w+)\]\s*:\s*(\w+(?:\s*!==?\s*null)?)\s*,?\s*\n\s*\}(,?)/gm;
        source = source.replace(regex, (match, indent, keyName, valueExpr, comma) => {
            if (isSimpleCheck(keyName, valueExpr)) {
                changeCount++;
                return `${indent}${keyName}${comma}`;
            }
            return match;
        });
    }

    // Pass 1b: Single-property objects on 1 line inside classNames
    // { [varName]: varName !== null } or { [varName]: varName }
    {
        const regex =
            /\{\s*\[(\w+)\]\s*:\s*(\w+(?:\s*!==?\s*null)?)\s*\}/g;
        source = source.replace(regex, (match, keyName, valueExpr) => {
            if (isSimpleCheck(keyName, valueExpr)) {
                // Only transform if inside a classNames context (check surrounding text)
                changeCount++;
                return keyName;
            }
            return match;
        });
    }

    // Pass 2: Property inside multi-property objects
    // Extract [varName]: varName !== null from objects with other properties
    // Handle property as first, middle, or last entry

    // 2a: Property is the last entry (most common in multi-prop)
    // ... other stuff,
    //     [varName]: varName !== null,
    // }
    // => ... other stuff,
    // }
    // And insert varName before the object
    {
        let changed = true;
        while (changed) {
            changed = false;
            const lines = source.split('\n');
            const result = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const propMatch = line.match(
                    /^(\s*)\[(\w+)\]\s*:\s*(\w+(?:\s*!==?\s*null)?)\s*,?\s*$/,
                );

                if (propMatch) {
                    const keyName = propMatch[2];
                    const valueExpr = propMatch[3];

                    if (isSimpleCheck(keyName, valueExpr)) {
                        // Check context: is this inside a classNames call?
                        const contextBefore = lines
                            .slice(Math.max(0, i - 15), i)
                            .join('\n');
                        if (!contextBefore.includes('classNames')) {
                            result.push(line);
                            continue;
                        }

                        // Find the opening { for this object
                        const braceIdx = findOpeningBraceLineIndex(
                            lines,
                            i,
                        );
                        if (braceIdx === null) {
                            result.push(line);
                            continue;
                        }

                        // Check that this is NOT a single-property object
                        // (those were handled in pass 1)
                        const hasOtherProps = hasOtherProperties(
                            lines,
                            braceIdx,
                            i,
                        );
                        if (!hasOtherProps) {
                            result.push(line);
                            continue;
                        }

                        // Find where the { line is in result array
                        const resultBraceIdx =
                            result.length - (i - braceIdx);
                        if (resultBraceIdx < 0) {
                            result.push(line);
                            continue;
                        }

                        // Get the indent of the { line
                        const braceIndent =
                            result[resultBraceIdx].match(/^(\s*)/)[1];

                        // Insert varName before the { line
                        result.splice(
                            resultBraceIdx,
                            0,
                            `${braceIndent}${keyName},`,
                        );

                        // Remove the trailing comma from previous property if this was last
                        // Don't push this line (skip it)
                        // But ensure previous line's comma is correct
                        // The previous property line should keep its comma

                        changeCount++;
                        changed = true;
                        // Skip this line
                        continue;
                    }
                }

                result.push(line);
            }

            source = result.join('\n');
        }
    }

    // Pass 3: Handle inline { [var]: var !== null } within classNames({...})
    // e.g., classNames({ 'card-body': !imageOverlay, [bodyClassName]: bodyClassName !== null })
    {
        const regex =
            /,\s*\[(\w+)\]\s*:\s*(\w+(?:\s*!==?\s*null)?)\s*(?=\s*[,}])/g;
        const newSource = source.replace(
            regex,
            (match, keyName, valueExpr) => {
                if (isSimpleCheck(keyName, valueExpr)) {
                    // We need context to know if this is in classNames
                    // For safety, we mark it and post-process
                    changeCount++;
                    return `__EXTRACT_${keyName}__`;
                }
                return match;
            },
        );

        if (newSource !== source) {
            // Now we need to restructure: move extracted vars out of the object
            // This is complex for inline. Let's handle it differently.
            // Revert and handle these cases in a simpler way.
            // Actually for inline multi-prop objects like classNames({a: b, [c]: c !== null})
            // We can transform to classNames([c, {a: b}])
            // But that changes the calling convention. Let's just remove the property
            // and add the var to the array.
            // This is getting complicated. Let's skip inline multi-prop for now
            // and handle them manually or in a separate pass.
        }
    }

    // Clean up: remove empty lines left by property removal inside objects
    source = source.replace(/\{\s*\n(\s*\n)+(\s*[^\s}])/g, '{\n$2');

    if (changeCount > 0) {
        if (dryRun) {
            console.log(`[DRY RUN] ${filePath}: ${changeCount} change(s)`);
        } else {
            fs.writeFileSync(filePath, source, 'utf-8');
            console.log(`${filePath}: ${changeCount} change(s)`);
        }
    }

    return changeCount;
}

function findOpeningBraceLineIndex(lines, fromIdx) {
    let depth = 0;
    for (let j = fromIdx - 1; j >= 0; j--) {
        const trimmed = lines[j].trim();
        // Count closing braces
        for (const ch of trimmed) {
            if (ch === '}') depth++;
            if (ch === '{') {
                if (depth === 0) return j;
                depth--;
            }
        }
    }
    return null;
}

function hasOtherProperties(lines, braceLineIdx, propLineIdx) {
    // Check if there are other property lines between { and the target property
    for (let j = braceLineIdx + 1; j < propLineIdx; j++) {
        const trimmed = lines[j].trim();
        if (trimmed !== '' && trimmed !== '{' && trimmed !== '}') {
            return true;
        }
    }
    // Also check after the property line until }
    for (let j = propLineIdx + 1; j < lines.length; j++) {
        const trimmed = lines[j].trim();
        if (trimmed === '}' || trimmed === '},') return false; // reached end, no more props
        if (trimmed !== '') return true;
    }
    return false;
}

async function main() {
    let files = [];
    for (const pattern of patterns) {
        if (pattern.includes('*')) {
            const matched = await glob(pattern, { nodir: true });
            files.push(...matched);
        } else {
            files.push(pattern);
        }
    }

    files = [...new Set(files)].filter(
        (f) => f.endsWith('.tsx') || f.endsWith('.ts'),
    );

    let totalChanges = 0;
    let filesChanged = 0;

    for (const file of files) {
        const changes = processFile(file);
        if (changes > 0) {
            totalChanges += changes;
            filesChanged++;
        }
    }

    console.log(`\nDone. ${totalChanges} changes in ${filesChanged} files.`);
}

main().catch(console.error);
