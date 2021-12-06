/* eslint-disable no-param-reassign */
const path = require('path');
// const webpack = require('webpack');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const getPackagesPaths = require('../scripts/lib/getPackagesPaths');
const getPackagesAliases = require('../scripts/lib/getPackagesAliases');
const { idInterpolationPattern } = require('../packages/intl/scripts/config');
require('dotenv').config();

module.exports = {
    stories: getPackagesPaths()
        .filter((it) => it.match(/\/cli$/) === null)
        .map((packagePath) => path.join(packagePath, './src/**/*.stories.@(jsx|mdx)')),
    addons: [
        {
            name: '@storybook/preset-scss',
            options: {
                rule: {
                    test: /\.module\.s[ca]ss$/,
                },
                cssLoaderOptions: {
                    modules: {
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    },
                },
            },
        },
        {
            name: '@storybook/preset-scss',
            options: {
                rule: {
                    exclude: /\.module\.s[ca]ss$/,
                },
            },
        },
        '@storybook/addon-viewport/register',
        '@storybook/addon-docs',
        '@storybook/addon-actions',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
    ],
    webpackFinal: async (config) => ({
        ...config,

        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                'react-router': require.resolve('react-router'),
                'react-router-dom': require.resolve('react-router-dom'),
                'react-intl': require.resolve('react-intl'),
                // '@uppy/core/dist/style.css': require.resolve('@uppy/core/dist/style.css'),
                // '@uppy/core': require.resolve('@uppy/core'),
                // '@uppy/react': require.resolve('@uppy/react'),
                ...getPackagesAliases(),
                // '@micromag/ckeditor/inline$': path.join(
                //     __dirname,
                //     '../packages/ckeditor/dist/inline',
                // ),
                // '@micromag/ckeditor$': path.join(__dirname, '../packages/ckeditor/dist/index'),
            },
        },

        module: {
            ...config.module,
            rules: [
                {
                    oneOf: [
                        {
                            test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                            use: ['raw-loader'],
                        },
                        {
                            test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                            use: [
                                {
                                    loader: 'style-loader',
                                    options: {
                                        injectType: 'singletonStyleTag',
                                        attributes: {
                                            'data-cke': true,
                                        },
                                    },
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: styles.getPostCssConfig({
                                        themeImporter: {
                                            themePath: require.resolve(
                                                '@ckeditor/ckeditor5-theme-lark',
                                            ),
                                        },
                                        minify: true,
                                    }),
                                },
                            ],
                        },
                        {
                            rules: [
                                ...config.module.rules,
                                ...getPackagesPaths().map((packagePath) => ({
                                    loader: require.resolve('babel-loader'),
                                    test: /\.(js|jsx)$/,
                                    include: path.join(packagePath, './src/'),
                                    exclude: /\/node_modules\//,
                                    options: {
                                        babelrc: false,
                                        plugins: [
                                            [
                                                require.resolve('babel-plugin-react-intl'),
                                                {
                                                    ast: true,
                                                    extractFromFormatMessageCall: true,
                                                    idInterpolationPattern,
                                                },
                                            ],
                                        ],
                                    },
                                })),
                                {
                                    loader: require.resolve('babel-loader'),
                                    test: /\.(js|jsx)$/,
                                    include: /\/query-string\//,
                                    options: {
                                        babelrc: false,
                                        plugins: [
                                            require.resolve(
                                                '@babel/plugin-transform-modules-commonjs',
                                            ),
                                        ],
                                    },
                                },
                                {
                                    test: /\.(srt)$/,
                                    loader: require.resolve('file-loader'),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    }),
};
