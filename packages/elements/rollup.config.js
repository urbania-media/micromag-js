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
                resolveOnly: [new RegExp(path.join(__dirname, './src/ElementsProvider'))],
            }),
            ...baseConfig.plugins.slice(2),
        ],
    },
    {
        ...baseConfig,
        input: 'src/all.js',
        output: [
            {
                file: 'lib/all.js',
                format: 'cjs',
            },
            {
                file: 'es/all.js',
            },
        ],
    },
    {
        ...baseConfig,
        input: 'src/schemas.js',
        output: [
            {
                file: 'lib/schemas.js',
                format: 'cjs',
            },
            {
                file: 'es/schemas.js',
            },
        ],
    },
];
