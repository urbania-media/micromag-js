import { defineMain } from '@storybook/react-webpack5/node';
import { createRequire } from 'module';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPackagesPaths = require('../scripts/lib/getPackagesPaths');
const getPackagesAliases = require('../scripts/lib/getPackagesAliases');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // insecure

export default defineMain({
    stories: getPackagesPaths().map((packagePath) =>
        path.join(packagePath, './src/**/*.@(mdx|stories.@(tsx))'),
    ),

    addons: [
        '@storybook/addon-themes',
        '@storybook/addon-webpack5-compiler-babel',
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
                    // '@micromag/ckeditor/build': path.join(
                    //     __dirname,
                    //     '../packages/ckeditor/src/build',
                    // ),
                    '#.storybook': __dirname,
                },
            },
        };
    },

    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },

    swc: () => ({
        jsc: {
            transform: {
                react: {
                    runtime: 'automatic', // This ensures the automatic JSX runtime is used
                },
            },
        },
    }),
});
