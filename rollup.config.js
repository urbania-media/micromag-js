// import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
// import image from '@rollup/plugin-image';
// import svgo from 'rollup-plugin-svgo';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import path from 'path';
// import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';

import generateScopedName from './scripts/lib/generateScopedName';

import imageAssets from './scripts/rollup-image-assets';

export const createConfig = ({
    file = 'index.ts',
    outputConfig = null,
    input = null,
    output = null,
    outputCjs: outputCjsFile = null,
    banner = null,
    format = null,
    withoutPostCss = false,
    withoutPostCssExtract = false,
    resolveOptions = null,
    prependPlugins = [],
    appendPlugins = [],
    afterResolvePlugins = [],
} = {}) => {
    const isNode = format === 'node';
    const isCjs = format === 'cjs' || format === 'node';
    const outputFile = file.replace(/\.tsx?$/, '.js');
    const outputCjs = {
        file: outputCjsFile || output || `lib/${outputFile}`,
        format: 'cjs',
        banner,
    };
    const outputEs = {
        file: output || `es/${outputFile}`,
        banner,
    };
    let finalOutputConfig = outputConfig;
    if (outputConfig === null && format === 'both') {
        finalOutputConfig = [outputCjs, outputEs];
    } else if (outputConfig === null) {
        finalOutputConfig = isCjs ? outputCjs : outputEs;
    }
    return {
        input: input || `src/${file}`,
        output: finalOutputConfig,
        treeshake: {
            moduleSideEffects: ['@micromag/intl/locale/fr', '@micromag/intl/locale/en'],
        },
        plugins: [
            isCjs &&
                resolve({
                    modulesOnly: true,
                    resolveOnly: [
                        '@folklore/routes',
                        /(query-string|decode-uri-component|split-on-first|filter-obj|screenfull|camelcase|[a-z]+-case|wouter)/,
                    ],
                }),

            ...prependPlugins,

            imageAssets({
                // limit: 0,
                include: [
                    'src/**/*.png',
                    'src/**/*.svg',
                    'src/**/*.jpg',
                    'src/**/*.gif',
                    'src/**/*.webp',
                ],
                emitFiles: true,
                // sourceDir: 'src/images',
                destDir: 'assets/images',
            }),
            json(),
            resolve({
                extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.node'],
                jail: path.join(process.cwd(), 'src'),
                ...resolveOptions,
            }),

            ...afterResolvePlugins,
            commonjs(),
            babel({
                extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.node'],
                exclude: 'node_modules/**',
                // rootMode: 'upward',
                babelHelpers: 'runtime',
                configFile: path.resolve(process.cwd(), '../../babel.config.js')
            }),
            !withoutPostCss &&
                postcss({
                    extensions: ['.css'],
                    modules: {
                        generateScopedName,
                    },
                    autoModules: true,
                    extract: !withoutPostCssExtract ? 'styles.css' : false,
                    inject: false,
                }),
            // image({
            //     include: ['**/*.svg'],
            // }),
            url({ include: ['**/*.mp4'] }),
            // url({ include: ['**/*.svg'], limit: 0, destDir: 'assets/img' }),
            replace({
                values: {
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                },
                preventAssignment: true,
            }),
            ...appendPlugins,
        ].filter(Boolean),
    };
};

export default [createConfig({ format: 'es' }) /*, createConfig({ format: 'cjs' })*/];
