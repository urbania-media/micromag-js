import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';

export default {
    input: '../../scripts/build-screen-fields.js',
    output: {
        file: 'build-screen-fields.cjs',
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
        replace({
            values: {
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            },
            preventAssignment: true,
        }),
        commonjs(),
        json(),
    ],
};
