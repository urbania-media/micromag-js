import path from 'path';
import resolve from '@rollup/plugin-node-resolve';

import baseConfig from '../../rollup.config';

export default [
    baseConfig({
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            resolveOnly: [path.join(__dirname, './src/PropTypes')],
        },
    }),
    {
        ...baseConfig({
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
    {
        ...baseConfig({
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
            resolveOptions: {
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                resolveOnly: [
                    path.join(__dirname, './src/PropTypes'),
                    new RegExp(path.join(__dirname, './src/components/namespaces')),
                    new RegExp(path.join(__dirname, './src/contexts')),
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
];
