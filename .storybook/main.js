// This file has been automatically migrated to valid ESM format by Storybook.

/* eslint-disable no-param-reassign */
import { defineMain } from '@storybook/react-webpack5/node';
import { createRequire } from 'module';
import { dirname, join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const getPackagesPaths = require('../scripts/lib/getPackagesPaths');
const getPackagesAliases = require('../scripts/lib/getPackagesAliases');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // insecure

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

const stripSourceMapCommentPlugin = {
    postcssPlugin: 'strip-source-map-comment',
    Once(root) {
        root.walkComments((comment) => {
            if (/^#\s*sourceMappingURL=.*\.map\s*$/i.test(comment.text.trim())) {
                comment.remove();
            }
        });
    },
};

export default defineMain({
    stories: getPackagesPaths().map((packagePath) =>
        path.join(packagePath, './src/**/*.@(mdx|stories.@(tsx))'),
    ),

    addons: [
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    // Replaces existing CSS rules to support CSS Modules
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: {
                                        auto: true,
                                        namedExport: false,
                                        localIdentName: '[name]__[local]--[hash:base64:5]',
                                    },
                                },
                            },
                            {
                                // Gets options from `postcss.config.js` in your project root
                                loader: 'postcss-loader',
                            },
                        ],
                    },
                ],
            },
        },
        getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
        getAbsolutePath('@storybook/addon-docs'),
    ],

    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(j|t)sx?$/,
            exclude: /node_modules/,
            use: {
                loader: require.resolve('babel-loader'),
                options: {
                    babelrc: false,
                    configFile: path.join(__dirname, '../babel.config.js'),
                    // plugins: [
                    //     [
                    //         require.resolve('babel-plugin-react-intl'),
                    //         {
                    //             ast: true,
                    //             extractFromFormatMessageCall: true,
                    //             idInterpolationPattern: '[sha512:contenthash:base64:6]',
                    //         },
                    //     ],
                    // ],
                },
            },
        });

        config.module.rules.push({
            test: /\.(srt)$/,
            loader: require.resolve('file-loader'),
        });

        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    ...getPackagesAliases(),
                    '@micromag/ckeditor/build': path.join(
                        __dirname,
                        '../packages/ckeditor/src/build',
                    ),
                    '#.storybook': __dirname,
                },
            },
            module: {
                ...config.module,
                // rules: [
                //     {
                //         test: /\.m?js$/,
                //         resolve: {
                //             fullySpecified: false,
                //         },
                //     },
                //     {
                //         oneOf: [
                //             {
                //                 rules: [
                //                     ...config.module.rules,
                //                     {
                //                         test: /\.(srt)$/,
                //                         loader: require.resolve('file-loader'),
                //                     },
                //                 ],
                //             },
                //         ],
                //     },
                // ],
            },
        };
    },

    framework: {
        name: getAbsolutePath('@storybook/react-webpack5'),
        options: {},
    },

    docs: {
        defaultName: 'Docs',
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },

    // swc: () => ({
    //     jsc: {
    //         transform: {
    //             react: {
    //                 runtime: 'automatic', // This ensures the automatic JSX runtime is used
    //             },
    //         },
    //     },
    // }),
});
