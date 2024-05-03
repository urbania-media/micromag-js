/* eslint-disable no-param-reassign */
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const getPackagesPaths = require('../scripts/lib/getPackagesPaths');
const getPackagesAliases = require('../scripts/lib/getPackagesAliases');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // insecure

// console.log(getPackagesPaths());

console.log(
    getPackagesPaths().map((packagePath) =>
        path.join(packagePath, './src/**/*.stories.@(jsx|mdx)'),
    ),
);

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
                // styleLoaderOptions: {
                //     injectType: 'styleTag',
                // },
                cssLoaderOptions: {
                    modules: {
                        auto: true,
                        namedExport: false,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    },
                },
                // sassLoaderOptions: {
                //     sassOptions: (loaderContext) => {
                //         // console.log('loaderContext', loaderContext);
                //         // More information about available properties https://webpack.js.org/api/loaders/
                //         const { resourcePath, rootContext } = loaderContext;
                //         const relativePath = path.relative(rootContext, resourcePath);

                //         console.log('path', relativePath);

                //         if (relativePath === 'styles/foo.scss') {
                //             return {
                //                 includePaths: ['absolute/path/c', 'absolute/path/d'],
                //             };
                //         }

                //         if (resourcePath.indexOf('node_modules') !== -1) {
                //             console.log('resourcePath', resourcePath);
                //         }

                //         // console.log('hum');

                //         return {
                //             includePaths: ['node_modules'],
                //         };
                //     },
                // },
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
        '@storybook/addon-viewport',
        // '@storybook/addon-docs',
        '@storybook/addon-actions',
        // {
        //     name: '@storybook/addon-postcss',
        //     options: {
        //         postcssLoaderOptions: {
        //             implementation: require('postcss'),
        //         },
        //     },
        // },
        // '@storybook/addon-mdx-gfm',
    ],
    // features: {
    //     babelModeV7: true,
    // },
    webpackFinal: async (config) => ({
        ...config,
        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                '@folklore/routes': require.resolve('@folklore/routes'),
                wouter: require.resolve('wouter'),
                'react-intl': require.resolve('react-intl'),
                'query-string': require.resolve('query-string'),
                // '@ckeditor/ckeditor5-editor-classic': require.resolve(
                //     '@ckeditor/ckeditor5-editor-classic',
                // ),
                // '@ckeditor/ckeditor5-editor-inline': require.resolve(
                //     '@ckeditor/ckeditor5-editor-inline',
                // ),
                // '@ckeditor/ckeditor5-react': require.resolve('@ckeditor/ckeditor5-react'),
                // '@uppy/core/dist/style.css': require.resolve('@uppy/core/dist/style.css'),
                // '@uppy/core': require.resolve('@uppy/core'),
                // '@uppy/react': require.resolve('@uppy/react'),
                ...getPackagesAliases(),
                '@micromag/ckeditor/build': path.join(__dirname, '../packages/ckeditor/src/build'),
                // '@micromag/ckeditor': path.join(__dirname, '../packages/ckeditor/es/index'),
            },
        },
        module: {
            ...config.module,
            rules: [
                {
                    test: /\.m?js$/,
                    resolve: {
                        fullySpecified: false,
                    },
                },
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
                                'css-loader',
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        postcssOptions: styles.getPostCssConfig({
                                            themeImporter: {
                                                themePath: require.resolve(
                                                    '@ckeditor/ckeditor5-theme-lark',
                                                ),
                                            },
                                            minify: true,
                                        }),
                                    },
                                },
                            ],
                        },
                        {
                            rules: [
                                ...config.module.rules,

                                // ...config.module.rules.map((rule, index) =>
                                //     index === 0
                                //         ? {
                                //               ...rule,
                                //               exclude: [rule.exclude, /@ckeditor/],
                                //           }
                                //         : rule,
                                // ),
                                ...getPackagesPaths().map((packagePath) => ({
                                    loader: require.resolve('babel-loader'),
                                    test: /\.(js|jsx)$/,
                                    include: path.join(packagePath, './src/'),
                                    exclude: /\/node_modules\//,
                                    options: {
                                        babelrc: false,
                                        configFile: path.join(__dirname, '../babel.config.js'),
                                        // presets: [
                                        //     [
                                        //         require.resolve('@babel/preset-env'),
                                        //         {
                                        //             loose: true,
                                        //         },
                                        //     ],
                                        // ],
                                        plugins: [
                                            [
                                                require.resolve('babel-plugin-react-intl'),
                                                {
                                                    ast: true,
                                                    extractFromFormatMessageCall: true,
                                                    idInterpolationPattern:
                                                        '[sha512:contenthash:base64:6]',
                                                },
                                            ],
                                        ],
                                    },
                                })),
                                // {
                                //     loader: require.resolve('babel-loader'),
                                //     test: /\.(js|jsx)$/,
                                //     include: /\/query-string\//,
                                //     options: {
                                //         babelrc: false,
                                //         plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
                                //     },
                                // },
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
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: false,
        defaultName: 'Docs', // set to change the name of generated docs entries
    },
};
