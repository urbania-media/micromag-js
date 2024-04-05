import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';

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
                '@folklore/routes',
                'wouter',
                'query-string',
                'decode-uri-component',
                'split-on-first',
                'filter-obj',
            ],
        }),
        url({
            emitFiles: false,
        }),
        commonjs(),
        json(),
    ],
};
