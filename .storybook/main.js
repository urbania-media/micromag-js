const path = require('path');
const getPackagesPaths = require('../scripts/lib/getPackagesPaths');

module.exports = {
    stories: getPackagesPaths().map(packagePath =>
        path.join('../', packagePath, './**/*.stories.(jsx|mdx)'),
    ),
    addons: [
        '@storybook/addon-viewport/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-docs',
        // '@storybook/addon-a11y/register',
        '@storybook/addon-actions',
    ],
};
