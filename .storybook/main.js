const path = require('path');
const getPackagesPaths = require('../scripts/lib/getPackagesPaths');
const getPackagesAliases = require('../scripts/lib/getPackagesAliases');

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
    ],
    webpackFinal: async (config, { configType }) => {
        const packagesAliases = getPackagesAliases();
        config.resolve.alias = {
            ...config.resolve.alias,
            ...packagesAliases,
        };
        return config;
    },
};
