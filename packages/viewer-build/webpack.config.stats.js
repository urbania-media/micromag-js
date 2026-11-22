// The config of the viewer build, plus a stats.json file next to the package (not in build/, which
// is published), read by scripts/check-viewer-build-size.mjs
const fs = require('fs');
const path = require('path');

const config = require('./webpack.config');

class StatsFilePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('StatsFilePlugin', (stats) => {
            const json = stats.toJson({
                all: false,
                assets: true,
                entrypoints: true,
                outputPath: true,
            });
            fs.writeFileSync(path.join(__dirname, 'stats.json'), JSON.stringify(json, null, 2));
        });
    }
}

module.exports = {
    ...config,
    plugins: [...(config.plugins || []), new StatsFilePlugin()],
};
