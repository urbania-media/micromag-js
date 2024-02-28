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
    file = 'index.js',
    input = null,
    output = null,
    banner = null,
    format = null,
    withoutPostCss = false,
    withoutPostCssExtract = false,
    resolveOptions = null,
    prependPlugins = [],
    appendPlugins = [],
} = {}) => {
    const isNode = format === 'node';
    const isCjs = format === 'cjs' || format === 'node';
    const outputCjs = {
        file: output || `lib/${file}`,
        format: 'cjs',
        banner,
    };
    const outputEs = {
        file: output || `es/${file}`,
        banner,
    };
    let outputConfig;
    if (format === 'both') {
        outputConfig = [outputCjs, outputEs];
    } else {
        outputConfig = isCjs ? outputCjs : outputEs;
    }
    return {
        input: input || `src/${file}`,
        output: outputConfig,
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
                    'src/**/*.webp'
                ],
                emitFiles: true,
                // sourceDir: 'src/images',
                destDir: 'assets/images',
            }),
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
                // rootMode: 'upward',
                babelHelpers: 'runtime',
                presets: [
                    [
                        require('@babel/preset-env'),
                        isNode
                            ? {
                                  modules: false,
                                  useBuiltIns: false,
                                  targets: {
                                      node: '12',
                                  },
                              }
                            : {
                                  modules: false,
                                  useBuiltIns: false,
                              },
                    ],
                    [
                        require('@babel/preset-react'),
                        {
                            useBuiltIns: true,
                        },
                    ],
                ],
                plugins: [
                    [
                        require.resolve('@babel/plugin-transform-runtime'),
                        {
                            version: require('@babel/helpers/package.json').version,
                            helpers: true,
                            // useESModules: !isCjs,
                        },
                    ],
                    require.resolve('@babel/plugin-proposal-export-namespace-from'),
                    [
                        require.resolve('babel-plugin-static-fs'),
                        {
                            target: isNode ? 'node' : 'browser', // defaults to node
                        },
                    ],
                    [
                        require.resolve('babel-plugin-formatjs'),
                        {
                            ast: true,
                            extractFromFormatMessageCall: true,
                            idInterpolationPattern: '[sha512:contenthash:base64:6]',
                        },
                    ],
                ],
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

export default [createConfig({ format: 'es' }), createConfig({ format: 'cjs' })];
