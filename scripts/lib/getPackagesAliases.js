const path = require('path');
const { sync: globSync } = require('glob');
const getPackagesPaths = require('./getPackagesPaths');

const getPackagesAliases = ({ withoutEndSign = false } = {}) =>
    getPackagesPaths().reduce((aliases, packagePath) => {
        const { name: packageName } = require(path.join(packagePath, './package.json'));
        const subFiles = globSync(path.join(packagePath, './*.js'));
        return {
            ...aliases,
            ...subFiles
                .filter(filePath => path.basename(filePath, '.js').match(/^[a-z]+$/) !== null)
                .reduce((subAliases, filePath) => {
                    const fileName = path.basename(filePath, '.js');
                    return {
                        ...subAliases,
                        [`${packageName}/${fileName}${!withoutEndSign ? '$' : ''}`]: path.join(
                            packagePath,
                            `./src/${fileName}.js`,
                        ),
                    };
                }, {}),
            [`${packageName}/scss`]: path.join(packagePath, './src/styles'),
            [`${packageName}${!withoutEndSign ? '$' : ''}`]: path.join(packagePath, './src/index.js'),
        };
    }, {});

module.exports = getPackagesAliases;
