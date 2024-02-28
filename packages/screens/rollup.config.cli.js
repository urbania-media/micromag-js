import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';

export default {
    input: '../../scripts/build-screen-fields.js',
    output: {
        file: 'build-screen-fields.js',
        format: 'cjs',
        inlineDynamicImports: true,
    },
    plugins: [
        resolve({
            resolveOnly: [
                /@micromag/,
                /@folklore/,
                'wouter'
            ]
        }),
        url({
            emitFiles: false,
        }),
        commonjs(),
        json()
    ],
};
