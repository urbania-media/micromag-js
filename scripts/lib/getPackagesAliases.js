const path = require('path');
const fs = require('fs');
const { sync: globSync } = require('glob');
const getPackagesPaths = require('./getPackagesPaths');

const resolveSourceFile = (packagePath, baseName) => {
    const tsPath = path.join(packagePath, `./src/${baseName}.ts`);
    const jsPath = path.join(packagePath, `./src/${baseName}.js`);
    if (fs.existsSync(tsPath)) return tsPath;
    return jsPath;
};

const getPackagesAliases = ({ withoutEndSign = false } = {}) =>
    getPackagesPaths().reduce((aliases, packagePath) => {
        const { name: packageName } = require(path.join(packagePath, './package.json'));
        const subFiles = globSync(path.join(packagePath, './*.js'));
        return {
            ...aliases,
            ...subFiles
                .filter((filePath) => path.basename(filePath, '.js').match(/^[^\.\/]+$/) !== null)
                .reduce((subAliases, filePath) => {
                    const fileName = path.basename(filePath, '.js');
                    return {
                        ...subAliases,
                        [`${packageName}/${fileName}${!withoutEndSign ? '$' : ''}`]: resolveSourceFile(
                            packagePath,
                            fileName,
                        ),
                    };
                }, {}),
            [`${packageName}${!withoutEndSign ? '$' : ''}`]: resolveSourceFile(
                packagePath,
                'index',
            ),
        };
    }, {});

module.exports = getPackagesAliases;
