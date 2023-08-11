const path = require('path');
const globSync = require('glob').sync;
const packageJson = require('../../package.json');

const rootDir = path.join(__dirname, '../../');

const getPackagesPaths = () =>
    packageJson.workspaces
        .map((it) => it.replace(/\/\*/, '/'))
        .reduce(
            (paths, packagesPath) => [
                ...paths,
                ...globSync(path.join(rootDir, packagesPath, './*')),
            ],
            [],
        );

module.exports = getPackagesPaths;
