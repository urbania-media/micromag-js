// const path = require('path');
const { idInterpolationPattern } = require('./packages/intl/scripts/config');

module.exports = (api) => ({
    presets: [
        api.env('production') && [
            require('@babel/preset-env'),
            {
                modules: false,
                useBuiltIns: false,
            },
        ],
        api.env('production') && [
            require('@babel/preset-react'),
            {
                useBuiltIns: true,
            },
        ],
        api.env('development') && require.resolve('babel-preset-react-app/dev'),
    ].filter(Boolean),
    plugins: [
        api.env('production') && [
            require.resolve('@babel/plugin-transform-runtime'),
            {
                version: require('@babel/helpers/package.json').version,
                helpers: true,
                useESModules: true,
            },
        ],
        require.resolve('@babel/plugin-proposal-export-namespace-from'),
        [
            require.resolve('babel-plugin-static-fs'),
            {
                target: 'browser', // defaults to node
            },
        ],
        api.env('production') && [
            require.resolve('babel-plugin-react-intl'),
            {
                ast: true,
                extractFromFormatMessageCall: true,
                idInterpolationPattern,
            },
        ],
    ].filter(Boolean),
});
