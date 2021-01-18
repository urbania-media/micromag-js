import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';

import baseConfig from '../../rollup.config';

export default [
    baseConfig({
        prependPlugins: [
            alias({
                entries: [
                    {
                        find: /\.\/(contexts|utils|hooks|components)/,
                        replacement: '@micromag/core/$1',
                    },
                ],
            }),
        ],
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            resolveOnly: [path.join(__dirname, './src/PropTypes')],
        },
    }),
    {
        ...baseConfig({
            prependPlugins: [
                alias({
                    entries: [
                        {
                            find: /\.\.\/(hooks|utils)/,
                            replacement: '@micromag/core/$1',
                        },
                    ],
                }),
            ],
            resolveOptions: {
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                resolveOnly: [
                    path.join(__dirname, './src/PropTypes'),
                    new RegExp(path.join(__dirname, './src/components/namespaces')),
                    new RegExp(path.join(__dirname, './src/contexts')),
                    new RegExp(path.join(__dirname, './src/hooks/useUppyLocale')),
                    new RegExp(path.join(__dirname, './src/utils/getTransloaditMediasFromResponse')),
                ],
            },
        }),
        input: 'src/contexts.js',
        output: [
            {
                file: 'lib/contexts.js',
                format: 'cjs',
            },
            {
                file: 'es/contexts.js',
            },
        ],
    },
    {
        ...baseConfig({
            resolveOptions: {
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                resolveOnly: [
                    path.join(__dirname, './src/PropTypes'),
                    new RegExp(path.join(__dirname, './src/utils')),
                ],
            },
        }),
        input: 'src/utils.js',
        output: [
            {
                file: 'lib/utils.js',
                format: 'cjs',
            },
            {
                file: 'es/utils.js',
            },
        ],
    },
    {
        ...baseConfig({
            prependPlugins: [
                alias({
                    entries: [
                        {
                            find: /\.\.\/(contexts|utils)/,
                            replacement: '@micromag/core/$1',
                        },
                    ],
                }),
            ],
            resolveOptions: {
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                resolveOnly: [
                    path.join(__dirname, './src/PropTypes'),
                    path.join(__dirname, './src/lib/EventsManager'),
                    new RegExp(path.join(__dirname, './src/hooks')),
                ],
            },
        }),
        input: 'src/hooks.js',
        output: [
            {
                file: 'lib/hooks.js',
                format: 'cjs',
            },
            {
                file: 'es/hooks.js',
            },
        ],
    },
    {
        ...baseConfig({
            prependPlugins: [
                alias({
                    entries: [
                        {
                            find: /^(\.\.\/)*\.\.\/\.\.\/(contexts|utils|hooks)/,
                            replacement: '@micromag/core/$2',
                        },
                    ],
                }),
            ],
            resolveOptions: {
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                resolveOnly: [
                    path.join(__dirname, './src/PropTypes'),
                    new RegExp(path.join(__dirname, './src/components')),
                    new RegExp(path.join(__dirname, './src/styles')),
                ],
            },
        }),
        input: 'src/components.js',
        output: [
            {
                file: 'lib/components.js',
                format: 'cjs',
            },
            {
                file: 'es/components.js',
            },
        ],
    },
];
