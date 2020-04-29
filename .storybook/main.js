/* eslint-disable no-param-reassign */
const path = require('path');
const getPackagesPaths = require('../scripts/lib/getPackagesPaths');
const getPackagesAliases = require('../scripts/lib/getPackagesAliases');
require('dotenv').config();

module.exports = {
    stories: getPackagesPaths().map(packagePath =>
        path.join(packagePath, './src/**/*.stories.(jsx|mdx)'),
    ),
    addons: [
        '@storybook/addon-viewport/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-docs',
        // '@storybook/addon-a11y/register',
        '@storybook/addon-actions',
        // path.join(__dirname, './addons/layouts/register')
    ],
    webpackFinal: async (config) => {
        const packagesAliases = getPackagesAliases();

        config.resolve.alias = {
            ...config.resolve.alias,
            'react-router': require.resolve('react-router'),
            'react-router-dom': require.resolve('react-router-dom'),
            'react-intl': require.resolve('react-intl'),
            ...packagesAliases,
        };

        // const rules = config.module.rules;
        // config.module.rules[0].use[0].options.plugins.push([
        //     require.resolve('babel-plugin-react-intl'),
        //     {
        //         overrideIdFn: require(path.join(__dirname, '../scripts/lib/getIntlMessagesNamespace')),
        //         extractSourceLocation: true,
        //     },
        // ]);

        config.module.rules = [
            ...config.module.rules,
            ...getPackagesPaths().map(packagePath => {
                const packageJson = require(path.join(packagePath, './package.json'));
                const { name = null } = packageJson || {};
                const namespace =
                    name !== null
                        ? name
                              .replace(/^@micromag\/(screen|element|field)-(.*)$/, '$1s.$2')
                              .replace(/^@micromag\/(.*)$/, '$1')
                        : null;
                return {
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
                                    overrideIdFn: id =>
                                        namespace !== null ? `${namespace}.${id}` : id,
                                    extractSourceLocation: true,
                                },
                            ],
                        ],
                    },
                };
            }),
            {
                loader: require.resolve('babel-loader'),
                test: /\.(js|jsx)$/,
                include: /\/query-string\//,
                options: {
                    babelrc: false,
                    plugins: [
                        require.resolve('@babel/plugin-transform-modules-commonjs'),
                    ],
                },
            }
        ];

        return config;
    },
};
