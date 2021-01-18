const path = require('path');
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
        // api.env('node') && [
        //     require('@babel/preset-env'),
        //     {
        //         modules: 'cjs',
        //         targets: {
        //             node: 'current',
        //         },
        //     },
        // ],
        api.env('production') && [
            require('@babel/preset-react'),
            {
                useBuiltIns: true,
            },
        ],
        api.env(['development', 'node']) && require.resolve('babel-preset-react-app/dev'),
        // api.env('node') && require.resolve('babel-preset-react-app/test'),
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
        // api.env('node') && require.resolve('@babel/plugin-transform-runtime'),
        // api.env('node') && require.resolve('babel-plugin-dynamic-import-node'),
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
        api.env('node') && [
            require.resolve('babel-plugin-css-modules-transform'),
            {
                preprocessCss: path.join(__dirname, './scripts/process-scss.js'),
                extensions: ['.scss'],
                generateScopedName: path.resolve(__dirname, './scripts/lib/generateScopedName.js'),
            },
        ],
        api.env('node') && [
            path.join(__dirname, './scripts/babel-plugin-transform-require-ignore'),
            {
                extensions: ['.global.scss'],
            },
        ],
    ].filter(Boolean),
});
