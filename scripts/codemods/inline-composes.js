#!/usr/bin/env node

/**
 * Replace `composes: X from 'path'` with the actual CSS properties from the source.
 * This is needed because CSS Modules `composes` only works in top-level class selectors,
 * but our SCSS used @extend inside nested selectors.
 *
 * Usage: node scripts/codemods/inline-composes.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the properties for each shared class
// These come from packages/core/src/styles/shared.module.css
const sharedProperties = {
    hideScrollbars: `scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }`,

    resetViewerFonts: `font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.1;`,

    resetViewerElements: `margin: 0;
    padding: 0;`,

    resetViewer: `font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.1;

    & *,
    & *::before,
    & *::after {
        box-sizing: border-box;
    }

    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6,
    & p,
    & ul,
    & ol,
    & dl,
    & li,
    & address,
    & blockquote,
    & pre,
    & figure,
    & caption,
    & label,
    & legend {
        margin: 0;
        padding: 0;
    }

    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6,
    & p,
    & li {
        font-weight: inherit;
    }

    & mark,
    & .mark {
        color: inherit;
    }`,

    resetButton: `display: inline-block;
    position: relative;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font-family: inherit;
    cursor: pointer;
    appearance: none;`,

    resetInput: `padding: 0;
    border: 0;
    background: transparent;
    font-family: inherit;
    cursor: pointer;
    appearance: none;`,

    fullscreen: `position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;`,

    screen: `position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;`,

    empty: `margin: 5px auto;
    border: dashed 2px var(--mm-gray-800);
    color: var(--mm-gray-800);`,

    emptyText: `width: 100%;
    height: 100px;`,

    emptyImage: `width: 100%;
    height: 200px;`,

    textInnerStyles: `& em,
    & i {
        font-style: italic;
    }

    & strong,
    & b {
        font-weight: bold;
    }

    & p {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    & mark {
        padding: 0;
        box-decoration-break: clone;
    }`,

    textStyles: `font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.3;

    & em,
    & i {
        font-style: italic;
    }

    & strong,
    & b {
        font-weight: bold;
    }

    & p {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    & mark {
        padding: 0;
        box-decoration-break: clone;
    }

    & h2 {
        font-size: 2em;
    }

    & h3 {
        font-size: 1.75em;
    }

    & h4 {
        font-size: 1.5em;
    }

    & blockquote {
        padding: 0;
        padding-left: 1em;
    }

    & img {
        display: block;
        width: auto;
        max-width: 100%;
        height: auto;
    }`,

    flex: `display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;`,

    flexFull: `display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;`,

    placeholderFull: `width: 100%;`,

    placeholderCenter: `margin-right: auto;
    margin-left: auto;`,

    placeholderLeft: `float: left;
    clear: both;`,

    placeholderRight: `float: right;
    clear: both;`,

    formDisabled: `position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;`,

    focusOutline: `&:focus-visible {
        outline: 3px solid var(--mm-purple);
        outline-offset: 4px;
    }`,
};

// Also handle local composes (within the same file)
// These are like `composes: inactive` referencing a class in the same file

const rootDir = path.resolve(__dirname, '../..');
const files = execSync(
    `grep -rl "composes:" --include="*.module.css" "${rootDir}" --exclude-dir=node_modules --exclude-dir=.claude`,
    { encoding: 'utf8' },
).trim().split('\n').filter(Boolean);

console.log(`Found ${files.length} files with composes:`);

let totalReplaced = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // Replace composes: X from 'path' with inline properties
    content = content.replace(
        /^(\s*)composes:\s+(\w+)\s+from\s+'[^']+';?\s*$/gm,
        (match, indent, className) => {
            const props = sharedProperties[className];
            if (props) {
                // Indent the properties to match the current indentation
                return props
                    .split('\n')
                    .map((line) => (line.trim() ? indent + line.trim() : ''))
                    .join('\n');
            }
            // Leave unknown composes as-is (will be an error)
            return match;
        },
    );

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        totalReplaced++;
    }
}

console.log(`Updated ${totalReplaced} files`);
