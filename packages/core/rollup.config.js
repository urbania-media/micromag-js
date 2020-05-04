import path from 'path';
import resolve from '@rollup/plugin-node-resolve';

import baseConfig from '../../rollup.config';

export default [
    {
        ...baseConfig,
        plugins: [
            ...baseConfig.plugins.slice(0, 1),
            resolve({
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                resolveOnly: [
                    new RegExp(path.join(__dirname, './src/PropTypes'))
                ]
            }),
            ...baseConfig.plugins.slice(2),
        ]
    },
    {
        ...baseConfig,
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
        plugins: [
            ...baseConfig.plugins.slice(0, 1),
            resolve({
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                resolveOnly: [
                    new RegExp(path.join(__dirname, './src/components')),
                    new RegExp(path.join(__dirname, './src/styles'))
                ]
            }),
            ...baseConfig.plugins.slice(2),
        ]
    },
    {
        ...baseConfig,
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
        plugins: [
            ...baseConfig.plugins.slice(0, 1),
            resolve({
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                resolveOnly: [
                    new RegExp(path.join(__dirname, './src/hooks'))
                ]
            }),
            ...baseConfig.plugins.slice(2),
        ]
    },
    {
        ...baseConfig,
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
        plugins: [
            ...baseConfig.plugins.slice(0, 1),
            resolve({
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                resolveOnly: [
                    new RegExp(path.join(__dirname, './src/contexts'))
                ]
            }),
            ...baseConfig.plugins.slice(2),
        ]
    },
    {
        ...baseConfig,
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
        plugins: [
            ...baseConfig.plugins.slice(0, 1),
            resolve({
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                resolveOnly: [
                    new RegExp(path.join(__dirname, './src/utils'))
                ]
            }),
            ...baseConfig.plugins.slice(2),
        ]
    },
    // {
    //     ...baseConfig,
    //     input: 'src/contexts.js',
    //     output: [
    //         {
    //             file: 'lib/contexts.js',
    //             format: 'cjs',
    //         },
    //         {
    //             file: 'es/contexts.js',
    //         },
    //     ],
    // },
    // {
    //     ...baseConfig,
    //     input: 'src/hooks.js',
    //     output: [
    //         {
    //             file: 'lib/hooks.js',
    //             format: 'cjs',
    //         },
    //         {
    //             file: 'es/hooks.js',
    //         },
    //     ],
    // },
    // {
    //     ...baseConfig,
    //     input: 'src/utils.js',
    //     output: [
    //         {
    //             file: 'lib/utils.js',
    //             format: 'cjs',
    //         },
    //         {
    //             file: 'es/utils.js',
    //         },
    //     ],
    // },
];
