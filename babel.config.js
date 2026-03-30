const path = require('path');
const getPackagesAliases = require('./scripts/lib/getPackagesAliases');
const { runtime } = require('webpack');

module.exports = (api) => {
    if (api.env('node')) {
        return {
            ignore: [/node_modules\/(?!@micromag|wouter)/],
            presets: [
                [
                    require('@babel/preset-env'),
                    {
                        targets: {
                            node: 'current',
                        },
                        modules: 'cjs',
                    },
                ],
                [
                    require('@babel/preset-react'),
                    {
                        useBuiltIns: true,
                        runtime: 'automatic',
                    },
                ],
                require('@babel/preset-typescript'),
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
                            wouter: require.resolve('wouter'),
                            '@folklore/routes': require.resolve('@folklore/routes'),
                            '@react-spring/core': require.resolve('@react-spring/core'),
                            '@react-spring/web': require.resolve('@react-spring/web'),
                            '@use-gesture/react': require.resolve('@use-gesture/react'),
                            ...getPackagesAliases({ withoutEndSign: true }),
                        },
                    },
                ],
                require.resolve('@babel/plugin-transform-runtime'),
                require.resolve('babel-plugin-dynamic-import-node'),
                [
                    require.resolve('babel-plugin-css-modules-transform'),
                    {
                        extensions: ['.css'],
                        generateScopedName: path.resolve(
                            __dirname,
                            './scripts/lib/generateScopedName.js',
                        ),
                    },
                ],
                [
                    path.join(__dirname, './scripts/babel-plugin-transform-require-ignore'),
                    {
                        extensions: ['.global.css'],
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
    }

    return {
        presets: api.env('development')
            ? [
                  [
                      require('@babel/preset-react'),
                      {
                          runtime: 'automatic',
                      },
                  ],
                  [
                      require('@babel/preset-env'),
                      {
                          targets: {
                              node: 'current',
                          },
                      },
                  ],
                  '@babel/preset-typescript',
              ].filter(Boolean)
            : ['@babel/preset-typescript'],
        plugins: [
            require.resolve('babel-plugin-lodash'),
            [
                require.resolve('babel-plugin-static-fs'),
                {
                    target: 'browser', // defaults to node
                },
            ],
        ].filter(Boolean),
    };
};
