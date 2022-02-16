/* eslint-disable no-param-reassign */
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const path = require('path');
// const webpack = require('webpack');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const getPackagesPaths = require('../scripts/lib/getPackagesPaths');
const getPackagesAliases = require('../scripts/lib/getPackagesAliases');
const { idInterpolationPattern } = require('../packages/intl/scripts/config');

require('dotenv').config();

const getAbsolutePath = (filePath, relative = process.cwd()) => {
    if (filePath === null) {
        return null;
    }
    if (filePath[0] === '~') {
        return path.join(process.env.HOME, filePath.slice(1));
    }
    return path.isAbsolute(filePath) ? filePath : path.join(relative, filePath);
};

const disableSourceMap = false;
const absSrcPath = getAbsolutePath('./');

module.exports = {
    stories: getPackagesPaths()
        .filter((it) => it.match(/\/cli$/) === null)
        .map((packagePath) => path.join(packagePath, './src/**/*.stories.@(jsx|mdx)')),
    addons: ['@storybook/addon-viewport', '@storybook/addon-docs', '@storybook/addon-actions'],
    features: {
        babelModeV7: true,
    },
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config) => {
        // console.log('config', config.module.rules);

        const getStyleLoaders = (cssOptions, preProcessor) => {
            const styleLoaders = [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: cssOptions,
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        postcssOptions: {
                            implementation: require('postcss'),
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
                        sourceMap: !disableSourceMap,
                    },
                },
            ].filter(Boolean);
            if (preProcessor) {
                styleLoaders.push(
                    {
                        loader: require.resolve('resolve-url-loader'),
                        options: {
                            sourceMap: !disableSourceMap,
                            root: absSrcPath,
                        },
                    },
                    {
                        loader: require.resolve(preProcessor),
                        options: {
                            sourceMap: !disableSourceMap,
                        },
                    },
                );
            }
            return styleLoaders;
        };

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
                    // '@uppy/tus': require.resolve('@uppy/tus'),
                    // '@uppy/react': require.resolve('@uppy/react'),
                    // '@uppy/xhr-upload': require.resolve('@uppy/xhr-upload'),
                    ...getPackagesAliases(),
                    // '@micromag/ckeditor/inline$': path.join(
                    //     __dirname,
                    //     '../packages/ckeditor/dist/inline',
                    // ),
                    '@micromag/ckeditor': path.join(__dirname, '../packages/ckeditor/dist/index'),
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
                                    {
                                        test: /\.css$/,
                                        exclude: /\.module\.css$/,
                                        use: getStyleLoaders({
                                            importLoaders: 1,
                                            sourceMap: !disableSourceMap,
                                            modules: {
                                                mode: 'global',
                                            },
                                        }),
                                        // Don't consider CSS imports dead code even if the
                                        // containing package claims to have no side effects.
                                        // Remove this when webpack adds a warning or an error for this.
                                        // See https://github.com/webpack/webpack/issues/6571
                                        sideEffects: true,
                                    },
                                    // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                                    // using the extension .module.css
                                    {
                                        test: /\.module\.css$/,
                                        use: getStyleLoaders({
                                            importLoaders: 1,
                                            sourceMap: !disableSourceMap,
                                            modules: {
                                                mode: 'local',
                                                getLocalIdent: getCSSModuleLocalIdent,
                                            },
                                        }),
                                    },
                                    {
                                        test: /\.scss$/,
                                        exclude: /\.module\.scss$/,
                                        use: getStyleLoaders(
                                            {
                                                importLoaders: 3,
                                                sourceMap: !disableSourceMap,
                                                modules: {
                                                    mode: 'global',
                                                },
                                            },
                                            'sass-loader',
                                        ),
                                        // Don't consider CSS imports dead code even if the
                                        // containing package claims to have no side effects.
                                        // Remove this when webpack adds a warning or an error for this.
                                        // See https://github.com/webpack/webpack/issues/6571
                                        sideEffects: true,
                                    },
                                    // Adds support for CSS Modules, but using SASS
                                    // using the extension .module.scss or .module.sass
                                    {
                                        test: /\.module\.scss$/,
                                        use: getStyleLoaders(
                                            {
                                                importLoaders: 3,
                                                sourceMap: !disableSourceMap,
                                                modules: {
                                                    mode: 'local',
                                                    getLocalIdent: getCSSModuleLocalIdent,
                                                },
                                            },
                                            'sass-loader',
                                        ),
                                    },
                                    ...config.module.rules,
                                    ...getPackagesPaths().map((packagePath) => ({
                                        loader: require.resolve('babel-loader'),
                                        test: /\.(js|jsx)$/,
                                        include: path.join(packagePath, './src/'),
                                        exclude: /\/node_modules\//,
                                        options: {
                                            babelrc: false,
                                            presets: [
                                                [
                                                    require.resolve('@babel/preset-env'),
                                                    {
                                                        modules: false,
                                                        useBuiltIns: 'entry',
                                                        corejs: 3,
                                                    },
                                                ],
                                                [
                                                    require.resolve('@babel/preset-react'),
                                                    {
                                                        runtime: 'automatic',
                                                        throwIfNamespace: false,
                                                    },
                                                ],
                                            ],
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
                                            cacheDirectory: true,
                                            cacheCompression: false,
                                            compact: false,
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
