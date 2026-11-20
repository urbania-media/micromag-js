#!/usr/bin/env node

/**
 * Downloads published stories for the local mode of the StoryParser test.
 *
 * Usage:
 *   node scripts/fetch-parser-stories.mjs [--out <dir>] [--anonymous] <slug|url>...
 *   MICROMAG_PARSER_STORIES="slug-1 slug-2" node scripts/fetch-parser-stories.mjs
 *
 * A slug is fetched from https://microm.ag/<slug>.json; a URL is fetched as is (a microm.ag story
 * URL gets `.json` added). Default folder: packages/core/src/lib/__tests__/local/stories, ignored
 * by git. Never commit these stories: the repository is public.
 *
 * --anonymous names the files story-1.json, story-2.json... and logs no slug or URL (for CI, whose
 * logs are public).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const anonymous = process.argv.includes('--anonymous');
const args = process.argv.slice(2).filter((arg) => arg !== '--anonymous');
const outIndex = args.indexOf('--out');
const outDir =
    outIndex !== -1
        ? path.resolve(args[outIndex + 1])
        : path.join(rootDir, 'packages/core/src/lib/__tests__/local/stories');
const sources = [
    ...args.filter(
        (arg, index) => outIndex === -1 || (index !== outIndex && index !== outIndex + 1),
    ),
    ...(process.env.MICROMAG_PARSER_STORIES || '').split(/[\s,]+/),
].filter((source) => source !== '');

if (sources.length === 0) {
    console.error('No story given: pass slugs or URLs, or set MICROMAG_PARSER_STORIES');
    process.exit(1);
}

const getUrl = (source) => {
    if (!/^https?:\/\//.test(source)) {
        return `https://microm.ag/${source}.json`;
    }
    const url = new URL(source);
    if (url.hostname === 'microm.ag' && !url.pathname.endsWith('.json')) {
        url.pathname = `${url.pathname.replace(/\/$/, '')}.json`;
    }
    return url.toString();
};

const getFileName = (url) => {
    const name = path.basename(new URL(url).pathname).replace(/\.json$/, '');
    return `${name.replace(/[^a-zA-Z0-9_-]/g, '-') || 'story'}.json`;
};

fs.mkdirSync(outDir, { recursive: true });

let fetched = 0;
for (const [index, source] of sources.entries()) {
    const url = getUrl(source);
    const fileName = anonymous ? `story-${index + 1}.json` : getFileName(url);
    try {
        const response = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const story = await response.json();
        const { components = null } = story?.story || story || {};
        if (!Array.isArray(components)) {
            throw new Error('not a story (no components)');
        }
        fs.writeFileSync(path.join(outDir, fileName), JSON.stringify(story));
        console.log(`${fileName}: ${components.length} screens`);
        fetched += 1;
    } catch (e) {
        // Only the file name: the logs of CI are public
        console.error(`${fileName}: ${e.message}`);
    }
}

console.log(
    `${fetched}/${sources.length} stories in ${path.relative(process.cwd(), outDir) || '.'}`,
);
if (fetched === 0) {
    process.exit(1);
}
