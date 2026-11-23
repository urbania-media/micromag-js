import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
// import image from '@rollup/plugin-image';
// import svgo from 'rollup-plugin-svgo';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import fs from 'fs';
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
    external = null,
    cssFile = 'styles.css',
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
        ...(external !== null ? { external } : null),
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
                    extract: !withoutPostCssExtract ? cssFile : false,
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

/**
 * Screens split in a definition (fields, labels) and a component: es/definition.js and
 * es/component.js (with the CSS), and es/index.js that imports both through the package's subpaths
 * (`@micromag/screen-x/definition` and `/component`), so the code isn't duplicated.
 */
const createSplitScreenConfigs = () => {
    const { name: packageName } = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    return [
        createConfig({ file: 'definition.ts', format: 'es', withoutPostCssExtract: true }),
        createConfig({ file: 'component.ts', format: 'es' }),
        createConfig({
            file: 'index.ts',
            format: 'es',
            withoutPostCssExtract: true,
            external: [`${packageName}/definition`, `${packageName}/component`],
            prependPlugins: [
                alias({
                    entries: [
                        {
                            find: /^\.\/(definition|component)$/,
                            replacement: `${packageName}/$1`,
                        },
                    ],
                }),
            ],
        }),
    ];
};

const isSplitScreen = fs.existsSync('src/definition.ts') && fs.existsSync('src/component.ts');

export default isSplitScreen
    ? createSplitScreenConfigs()
    : [createConfig({ format: 'es' }) /*, createConfig({ format: 'cjs' })*/];
