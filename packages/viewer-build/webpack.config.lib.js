const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { runtime } = require('webpack');

module.exports = {
    output: {
        filename: 'micromag.js',
        globalObject: 'this',
        library: {
            name: 'Micromag',
            type: 'umd',
        },
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: false,
        usedExports: false,
    },
    plugins: [new LodashModuleReplacementPlugin()],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
};
