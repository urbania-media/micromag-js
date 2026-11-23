#!/usr/bin/env node

/**
 * Checks that the initial JS of @micromag/viewer-build sets the webpack public path from
 * `window.MICROMAG_PUBLIC_PATH` (packages/viewer-build/src/public-path.ts). Without it, async
 * chunks are requested from `/static/js/...` and fail when the build is served under a sub-path
 * (#66). The module is only an import for its side effect: it is dropped if it is not listed in the
 * `sideEffects` of packages/viewer-build/package.json.
 *
 * Usage: node scripts/check-viewer-build-public-path.mjs (after `npm run build:stats` in
 * viewer-build)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const packageDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../packages/viewer-build',
);
const statsPath = path.join(packageDir, 'stats.json');

if (!fs.existsSync(statsPath)) {
    console.error(`${statsPath} is missing: run \`npm run build:stats\` in packages/viewer-build`);
    process.exit(1);
}

const { outputPath, entrypoints = {} } = JSON.parse(fs.readFileSync(statsPath, 'utf-8'));

const initialJs = [
    ...new Set(
        Object.values(entrypoints).flatMap(({ assets = [] }) =>
            assets.map((asset) => (typeof asset === 'string' ? asset : asset.name)),
        ),
    ),
].filter((name) => name.endsWith('.js'));

const found = initialJs.filter((name) =>
    fs.readFileSync(path.join(outputPath, name), 'utf-8').includes('MICROMAG_PUBLIC_PATH'),
);

if (found.length === 0) {
    console.error(
        `::error::No initial JS file of @micromag/viewer-build references MICROMAG_PUBLIC_PATH (checked: ${initialJs.join(', ')}). Is src/public-path.ts listed in the sideEffects of packages/viewer-build/package.json?`,
    );
    process.exit(1);
}

console.log(`MICROMAG_PUBLIC_PATH is set in ${found.join(', ')}`);
