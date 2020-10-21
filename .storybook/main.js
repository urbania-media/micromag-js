/* eslint-disable no-param-reassign */
const path = require('path');
const getPackagesPaths = require('../scripts/lib/getPackagesPaths');
const getPackagesAliases = require('../scripts/lib/getPackagesAliases');
const { idInterpolationPattern } = require('../scripts/formatjs');
require('dotenv').config();

module.exports = {
    stories: getPackagesPaths().map((packagePath) =>
        path.join(packagePath, './src/**/*.stories.@(jsx|mdx)'),
    ),
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
        '@storybook/addon-knobs/register',
        '@storybook/addon-docs',
        '@storybook/addon-actions',
    ],
    webpackFinal: async (config) => {
        return {
            ...config,

            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    'react-router': require.resolve('react-router'),
                    'react-router-dom': require.resolve('react-router-dom'),
                    'react-intl': require.resolve('react-intl'),
                    ...getPackagesAliases(),
                }
            },

            module: {
                ...config.module,
                rules: [
                    ...config.module.rules.map((rule, index) => (index === 0 ? {
                        ...rule,
                        exclude: [rule.exclude, /@ckeditor/],
                    } : rule)),
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
                            plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
                        },
                    },
                ]
            }
        };
    },
};
