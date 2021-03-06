import path from 'path';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
// import svgo from 'rollup-plugin-svgo';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';
import generateScopedName from './scripts/lib/generateScopedName';

export default ({
    withoutPostCss = false,
    withoutPostCssExtract = false,
    resolveOptions = null,
    prependPlugins = [],
    appendPlugins = [],
} = {}) => ({
    input: 'src/index.js',
    output: [
        {
            file: 'lib/index.js',
            format: 'cjs',
            exports: 'auto'
        },
        {
            file: 'es/index.js',
        },
    ],
    plugins: [
        ...prependPlugins,
        json(),
        resolve({
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            jail: path.join(process.cwd(), 'src'),
            ...resolveOptions,
        }),
        commonjs(),
        babel({
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            exclude: 'node_modules/**',
            rootMode: 'upward',
            runtimeHelpers: true,
        }),
        !withoutPostCss &&
            postcss({
                extensions: ['.css', '.scss'],
                modules: {
                    generateScopedName,
                },
                autoModules: true,
                extract: !withoutPostCssExtract ? 'styles.css' : false,
                inject: false,
            }),
        image({
            // exclude: ['**/*.svg'],
        }),
        url({ include: ['**/*.mp4'] }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        ...appendPlugins,
    ].filter(Boolean),
});
