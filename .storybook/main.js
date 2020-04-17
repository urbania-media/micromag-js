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
    webpackFinal: async (config, { configType }) => {
        const packagesAliases = getPackagesAliases();
        config.resolve.alias = {
            ...config.resolve.alias,
            'react-router': require.resolve('react-router'),
            'react-router-dom': require.resolve('react-router-dom'),
            'react-intl': require.resolve('react-intl'),
            ...packagesAliases,
        };
        return config;
    },
};
