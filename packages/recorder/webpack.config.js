const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
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
