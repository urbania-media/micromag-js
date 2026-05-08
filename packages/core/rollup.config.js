import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { createConfig } from '../../rollup.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = {
    'index.ts': {
        // prependPlugins: [
        //     alias({
        //         entries: [
        //             {
        //                 find: /(\.|\.\.)\/(contexts|utils|hooks|components)\/?$/,
        //                 replacement: '@micromag/core/$2',
        //             },
        //         ],
        //     }),
        // ],
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.node'],
            resolveOnly: [
                new RegExp(path.join(__dirname, './src/lib')),
                new RegExp(path.join(__dirname, './src/types')),
            ],
        },
    },

    'components.ts': {
        prependPlugins: [
            alias({
                entries: [
                    {
                        find: /^(\.\.\/)*\.\.\/\.\.\/(contexts|utils|hooks)\/?$/,
                        replacement: '@micromag/core/$2',
                    },
                    {
                        find: /(\.\.\/)*\.\.\/\.\.\/lib\/?$/,
                        replacement: '@micromag/core',
                    },
                    {
                        find: /(\.\.\/)*\.\.\/\.\.\/types\/?$/,
                        replacement: '@micromag/core',
                    },
                ],
            }),
        ],
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.node'],
            resolveOnly: [
                new RegExp(path.join(__dirname, './src/components')),
                new RegExp(path.join(__dirname, './src/styles')),
            ],
        },
    },

    'contexts.ts': {
        prependPlugins: [
            alias({
                entries: [
                    {
                        find: /\.\.\/(hooks|utils|contexts)\/?$/,
                        replacement: '@micromag/core/$1',
                    },
                    {
                        find: /\.\.\/lib\/?$/,
                        replacement: '@micromag/core',
                    },
                    {
                        find: /\.\.\/types\/?$/,
                        replacement: '@micromag/core',
                    },
                ],
            }),
        ],
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.node'],
            resolveOnly: [
                new RegExp(path.join(__dirname, './src/components/namespaces')),
                new RegExp(path.join(__dirname, './src/contexts')),
                // new RegExp(path.join(__dirname, './src/hooks/useUppyLocale')),
                new RegExp(path.join(__dirname, './src/utils/getTransloaditMediasFromResponse')),
            ],
        },
    },

    'hooks.ts': {
        prependPlugins: [
            alias({
                entries: [
                    {
                        find: /\.\.\/(contexts|utils)\/?$/,
                        replacement: '@micromag/core/$1',
                    },
                    {
                        find: /\.\.\/lib\/?$/,
                        replacement: '@micromag/core',
                    },
                    {
                        find: /\.\.\/types\/?$/,
                        replacement: '@micromag/core',
                    },
                ],
            }),
        ],
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.node'],
            resolveOnly: [
                path.join(__dirname, './src/lib/EventsManager'),
                new RegExp(path.join(__dirname, './src/hooks')),
            ],
        },
    },

    'utils.ts': {
        prependPlugins: [
            alias({
                entries: [
                    {
                        find: /\.\.\/types\/?$/,
                        replacement: '@micromag/core',
                    },
                ],
            }),
        ],
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.node'],
            resolveOnly: [new RegExp(path.join(__dirname, './src/utils'))],
        },
    },
};

export default Object.keys(files).reduce(
    (configs, file) => [
        ...configs,
        createConfig({
            file,
            format: 'es',
            // outputCjs: `lib/${file.replace('.js', '.cjs')}`,
            ...files[file],
        }),
        // createConfig({
        //     file,
        //     format: 'cjs',
        //     ...files[file],
        // }),
    ],
    [],
);
