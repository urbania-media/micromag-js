#!/usr/bin/env node

/**
 * Measures the initial JS and CSS of @micromag/viewer-build (the files of its entrypoint, gzipped)
 * and fails when they are over the budget of packages/viewer-build/size-budget.json.
 *
 * Usage: node scripts/check-viewer-build-size.mjs (after `npm run build:stats` in viewer-build)
 *
 * In GitHub Actions, the report is also written to the job summary.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const packageDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../packages/viewer-build',
);
const statsPath = path.join(packageDir, 'stats.json');
const budgetPath = path.join(packageDir, 'size-budget.json');

const formatKiB = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

const gzipSize = (buffer) => zlib.gzipSync(buffer, { level: 9 }).length;

if (!fs.existsSync(statsPath)) {
    console.error(`${statsPath} is missing: run \`npm run build:stats\` in packages/viewer-build`);
    process.exit(1);
}

const stats = JSON.parse(fs.readFileSync(statsPath, 'utf-8'));
const budget = JSON.parse(fs.readFileSync(budgetPath, 'utf-8'));
const { outputPath, entrypoints = {}, assets = [] } = stats;

const initialNames = new Set(
    Object.values(entrypoints).flatMap(({ assets: entryAssets = [] }) =>
        entryAssets.map((asset) => (typeof asset === 'string' ? asset : asset.name)),
    ),
);

const measure = (name) => {
    const buffer = fs.readFileSync(path.join(outputPath, name));
    return { name, size: buffer.length, gzip: gzipSize(buffer) };
};

const isCode = (name) => /\.(js|css)$/.test(name);
const initialFiles = [...initialNames].filter(isCode).map(measure);
const asyncFiles = assets
    .map(({ name }) => name)
    .filter((name) => isCode(name) && !initialNames.has(name))
    .map(measure);

const sum = (files, key) => files.reduce((total, file) => total + file[key], 0);
const byType = (files, extension) => files.filter(({ name }) => name.endsWith(extension));

const rows = [
    { label: 'Initial JS', files: byType(initialFiles, '.js'), budget: budget.js },
    { label: 'Initial CSS', files: byType(initialFiles, '.css'), budget: budget.css },
].map(({ label, files, budget: max }) => {
    const gzip = sum(files, 'gzip');
    return { label, size: sum(files, 'size'), gzip, budget: max, over: gzip > max };
});
const total = {
    size: sum(initialFiles, 'size'),
    gzip: sum(initialFiles, 'gzip'),
};
const asyncTotal = {
    count: asyncFiles.length,
    size: sum(asyncFiles, 'size'),
    gzip: sum(asyncFiles, 'gzip'),
};
const failed = rows.some(({ over }) => over);

const markdown = [
    '## @micromag/viewer-build size',
    '',
    '| | Minified | Gzip | Budget (gzip) | |',
    '| --- | ---: | ---: | ---: | --- |',
    ...rows.map(
        ({ label, size, gzip, budget: max, over }) =>
            `| ${label} | ${formatKiB(size)} | ${formatKiB(gzip)} | ${formatKiB(max)} | ${over ? '❌ over budget' : '✅'} |`,
    ),
    `| **Initial total** | ${formatKiB(total.size)} | **${formatKiB(total.gzip)}** | | |`,
    `| Async chunks (${asyncTotal.count}) | ${formatKiB(asyncTotal.size)} | ${formatKiB(asyncTotal.gzip)} | | not budgeted |`,
    '',
    '<details><summary>Initial files</summary>',
    '',
    '| File | Minified | Gzip |',
    '| --- | ---: | ---: |',
    ...initialFiles
        .sort((a, b) => b.gzip - a.gzip)
        .map(({ name, size, gzip }) => `| ${name} | ${formatKiB(size)} | ${formatKiB(gzip)} |`),
    '',
    '</details>',
    '',
    failed
        ? 'The initial bundle is over budget. If the increase is intended, raise the budget in `packages/viewer-build/size-budget.json` in the same pull request and say why.'
        : 'Budget: `packages/viewer-build/size-budget.json`.',
    '',
].join('\n');

console.log(markdown);

if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`);
}

if (failed) {
    rows.filter(({ over }) => over).forEach(({ label, gzip, budget: max }) => {
        console.error(
            `::error::${label} is ${formatKiB(gzip)} gzip, over the budget of ${formatKiB(max)}`,
        );
    });
    process.exit(1);
}
