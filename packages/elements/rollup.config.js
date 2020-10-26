import path from 'path';
import resolve from '@rollup/plugin-node-resolve';

import baseConfig from '../../rollup.config';

export default [
    baseConfig({
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            resolveOnly: [new RegExp(path.join(__dirname, './src/ElementsProvider'))],
        },
    }),
    {
        ...baseConfig(),
        input: 'src/all.js',
        output: [
            {
                file: 'all.js',
            },
        ],
    },
];
