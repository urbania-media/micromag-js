import { transformAsync } from '@babel/core';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const require = createRequire(import.meta.url);
const getPackagesAliases = require('./scripts/lib/getPackagesAliases');

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

// Same aliases as Storybook: tests run on the sources of the packages, not on their build
const packagesAliases = Object.entries(getPackagesAliases() as Record<string, string>).map(
    ([find, replacement]) => ({
        find: new RegExp(`^${escapeRegExp(find.replace(/\$$/, ''))}$`),
        replacement,
    }),
);

// The sources are compiled by Babel everywhere else (Rollup, Storybook, webpack), which accepts
// code that Vite's own TypeScript transform refuses (ex.: a type import and a value import with the
// same name). Strip the types with Babel first, as the builds do.
const babelTypescript = {
    name: 'micromag-babel-typescript',
    enforce: 'pre' as const,
    async transform(code: string, id: string) {
        if (!/\.tsx?$/.test(id) || id.includes('/node_modules/')) {
            return null;
        }
        const result = await transformAsync(code, {
            filename: id,
            babelrc: false,
            configFile: false,
            sourceMaps: true,
            presets: [
                ['@babel/preset-react', { runtime: 'automatic' }],
                ['@babel/preset-typescript', { isTSX: id.endsWith('.tsx'), allExtensions: true }],
            ],
            // The ids of the messages, as in the builds (react-intl needs them to render)
            plugins: [
                [
                    require.resolve('babel-plugin-formatjs'),
                    { idInterpolationPattern: '[sha512:contenthash:base64:6]' },
                ],
            ],
        });
        return result !== null ? { code: result.code ?? '', map: result.map } : null;
    },
};

export default defineConfig({
    plugins: [babelTypescript],
    resolve: {
        alias: [
            ...packagesAliases,
            { find: /^#\.storybook\/(.*)$/, replacement: path.join(rootDir, '.storybook/$1') },
        ],
    },
    ssr: {
        // Resolve the browser builds of the dependencies, as the viewer does
        resolve: { conditions: ['browser', 'module', 'import', 'default'] },
    },
    test: {
        include: ['{packages,elements,screens}/*/src/**/*.test.ts'],
        environment: 'node',
        server: {
            deps: {
                // Built packages that import `lodash-es/x` without extension, which Node's ESM
                // loader refuses: let Vite resolve them
                inline: [/@folklore\//, /@panneau\//, /uuid/],
            },
        },
    },
});
