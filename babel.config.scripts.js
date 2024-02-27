const path = require('path');
const getPackagesAliases = require('./scripts/lib/getPackagesAliases');

console.log('AAAAAAAAA');

module.exports = {
    ignore: [],
    presets: [
        [
            require('@babel/preset-env'),
            {
                targets: {
                    node: 'current',
                },
                modules: 'cjs'
            },
        ],
        [
            require('@babel/preset-react'),
            {
                useBuiltIns: true,
            },
        ],
    ],
    plugins: [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                alias: {
                    react: require.resolve('react'),
                    'react-dom/server': require.resolve('react-dom/server'),
                    'react-dom': require.resolve('react-dom'),
                    'react-intl': require.resolve('react-intl'),
                    'react-router': require.resolve('react-router'),
                    '@react-spring/core': require.resolve('@react-spring/core'),
                    '@react-spring/web': require.resolve('@react-spring/web'),
                    '@use-gesture/react': require.resolve('@use-gesture/react'),
                    ...getPackagesAliases({ withoutEndSign: true }),
                },
            },
        ],
        require.resolve('@babel/plugin-transform-runtime'),
        require.resolve('babel-plugin-dynamic-import-node'),
        require.resolve('@babel/plugin-proposal-export-namespace-from'),
        require.resolve('@babel/plugin-proposal-numeric-separator'),
        [
            require.resolve('babel-plugin-css-modules-transform'),
            {
                preprocessCss: path.join(__dirname, './scripts/process-scss.js'),
                extensions: ['.scss'],
                generateScopedName: path.resolve(__dirname, './scripts/lib/generateScopedName.js'),
            },
        ],
        [
            path.join(__dirname, './scripts/babel-plugin-transform-require-ignore'),
            {
                extensions: ['.global.scss'],
            },
        ],
        [
            require.resolve('babel-plugin-transform-assets-import-to-string'),
            {
                extensions: ['.png', '.svg'],
            },
        ],
    ],
};
