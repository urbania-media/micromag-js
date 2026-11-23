const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    plugins: [new LodashModuleReplacementPlugin({ shorthands: true })],
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
