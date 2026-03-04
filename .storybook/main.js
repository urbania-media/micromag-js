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
        getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
        getAbsolutePath('@storybook/addon-docs'),
    ],

    webpackFinal: async (config) => {
        // Filter out Storybook's default CSS rules so our custom ones take over
        const filteredRules = (config.module.rules || []).filter((rule) => {
            if (!rule || !rule.test) return true;
            const testStr = rule.test.toString();
            // Remove default CSS rules — we define our own
            if (testStr === '/\\.css$/' || testStr === '/\\.module\\.css$/') return false;
            return true;
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
                rules: [
                    {
                        test: /\.m?js$/,
                        resolve: {
                            fullySpecified: false,
                        },
                    },
                    // CSS modules (*.module.css)
                    {
                        test: /\.module\.css$/,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        auto: true,
                                        namedExport: false,
                                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                    },
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [require('postcss-nested')],
                                    },
                                },
                            },
                        ],
                    },
                    // Regular CSS (non-module) — exclude .module.css so it doesn't conflict
                    {
                        test: /\.css$/,
                        exclude: [/\.module\.css$/, /ckeditor5-[^/\\]+[/\\]theme[/\\]/],
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [stripSourceMapCommentPlugin],
                                    },
                                },
                            },
                        ],
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
                                                    themePath:
                                                        require.resolve('@ckeditor/ckeditor5-theme-lark'),
                                                },
                                                minify: true,
                                            }),
                                        },
                                    },
                                ],
                            },
                            {
                                rules: [
                                    ...filteredRules,
                                    ...getPackagesPaths().map((packagePath) => ({
                                        loader: require.resolve('babel-loader'),
                                        test: /\.(js|jsx|ts|tsx)$/,
                                        include: path.join(packagePath, './src/'),
                                        exclude: /\/node_modules\//,
                                        options: {
                                            babelrc: false,
                                            configFile: path.join(__dirname, '../babel.config.js'),
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
});
