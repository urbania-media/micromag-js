import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import path from 'path';
import generateScopedName from './scripts/lib/generateScopedName';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'lib/index.js',
            format: 'cjs',
        },
        {
            file: 'es/index.js',
        },
    ],
    plugins: [
        json(),
        resolve({
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            jail: path.join(process.cwd(), 'src'),
        }),
        commonjs(),
        babel({
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            exclude: 'node_modules/**',
            rootMode: 'upward',
            runtimeHelpers: true,
        }),
        postcss({
            extensions: ['.css', '.scss'],
            modules: {
                generateScopedName,
            },
            autoModules: true,
            extract: path.join(process.cwd(), 'assets/css/styles.css'),
            inject: false,
        }),
    ],
    // external: ['react', 'prop-types', 'classnames', 'lodash', 'snake-case', /^lodash\//],
};
