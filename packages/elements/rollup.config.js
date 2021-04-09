import path from 'path';
import resolve from '@rollup/plugin-node-resolve';

import { createConfig } from '../../rollup.config';

export default [
    createConfig({
        format: 'mode',
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            resolveOnly: [new RegExp(path.join(__dirname, './src/ElementsProvider'))],
        },
    }),
    // createConfig({
    //     format: 'cjs',
    //     resolveOptions: {
    //         extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
    //         resolveOnly: [new RegExp(path.join(__dirname, './src/ElementsProvider'))],
    //     },
    // }),

    createConfig({
        file: 'all.js',
        format: 'both',
    }),
    // createConfig({
    //     file: 'all.js',
    //     format: 'cjs',
    // }),
];
