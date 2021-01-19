const path = require('path');

module.exports = (api) => {
    if (api.env('node')) {
        return {
            presets: [
                [
                    require('@babel/preset-env'),
                    {
                        targets: {
                            node: 'current',
                        },
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
                require.resolve('@babel/plugin-transform-runtime'),
                require.resolve('babel-plugin-dynamic-import-node'),
                require.resolve('@babel/plugin-proposal-export-namespace-from'),
                [
                    require.resolve('babel-plugin-css-modules-transform'),
                    {
                        preprocessCss: path.join(__dirname, './scripts/process-scss.js'),
                        extensions: ['.scss'],
                        generateScopedName: path.resolve(
                            __dirname,
                            './scripts/lib/generateScopedName.js',
                        ),
                    },
                ],
                [
                    path.join(__dirname, './scripts/babel-plugin-transform-require-ignore'),
                    {
                        extensions: ['.global.scss'],
                    },
                ],
            ],
        };
    }
    return {
        presets: [
            api.env('development') && require.resolve('babel-preset-react-app/dev'),
        ].filter(Boolean),
        plugins: [
            require.resolve('@babel/plugin-proposal-export-namespace-from'),
            [
                require.resolve('babel-plugin-static-fs'),
                {
                    target: 'browser', // defaults to node
                },
            ],
        ].filter(Boolean),
    };
};
