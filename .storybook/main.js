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
        // {
        //     name: '@storybook/preset-scss',
        //     options: {
        //         rule: {
        //             test: /\.module\.s[ca]ss$/,
        //             exclude: /\.module\.s[ca]ss$/,
        //         },
        //         cssLoaderOptions: {
        //             modules: {
        //                 localIdentName: '[path][name]__[local]--[hash:base64:5]',
        //             },
        //         },
        //     },
        // },
        // {
        //     name: '@storybook/preset-scss',
        //     options: {
        //         rule: {
        //             exclude: /\.module\.s[ca]ss$/,
        //         },
        //     },
        // },
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
    features: {
        babelModeV7: true,
    },
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config) => {
        console.log(config.module.rules);
        return {
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
                                    // {
                                    //     test: /\.module\.(s*)css$/,
                                    //     use: ['resolve-url-loader'],
                                    // },
                                    {
                                        test: /\.scss$/,
                                        exclude: /\.module\.scss$/,
                                        use: [
                                            'style-loader',
                                            {
                                                loader: require.resolve('resolve-url-loader'),
                                                options: {
                                                    sourceMap: true,
                                                    // root: absSrcPath,
                                                },
                                            },
                                            {
                                                loader: require.resolve('css-loader'),
                                                options: {
                                                    importLoaders: 3,
                                                    sourceMap: true,
                                                    modules: {
                                                        mode: 'icss',
                                                    },
                                                },
                                            },
                                            {
                                                loader: require.resolve('postcss-loader'),
                                                options: {
                                                    postcssOptions: {
                                                        ident: 'postcss',
                                                        plugins: [
                                                            'postcss-flexbugs-fixes',
                                                            [
                                                                'postcss-preset-env',
                                                                {
                                                                    autoprefixer: {
                                                                        flexbox: 'no-2009',
                                                                    },
                                                                    stage: 3,
                                                                },
                                                            ],
                                                            'postcss-normalize',
                                                        ],
                                                    },
                                                    sourceMap: true,
                                                },
                                            },
                                        ],
                                        // Don't consider CSS imports dead code even if the
                                        // containing package claims to have no side effects.
                                        // Remove this when webpack adds a warning or an error for this.
                                        // See https://github.com/webpack/webpack/issues/6571
                                        sideEffects: true,
                                    },
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
                                                    require.resolve('babel-plugin-formatjs'),
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
                                                    '@babel/plugin-proposal-numeric-separator',
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
        };
    },
};
