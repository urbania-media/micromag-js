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
        const pkg = require(path.join(packagePath, './package.json'));
        const { name: packageName } = pkg;
        const subFiles = globSync(path.join(packagePath, './*.js'));

        // Aliases from .js proxy files at package root
        const proxyAliases = subFiles
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
            }, {});

        // Aliases from package.json exports field (sub-path exports like ./hooks, ./contexts)
        const exportsAliases = {};
        if (pkg.exports) {
            Object.keys(pkg.exports).forEach((exportKey) => {
                // Skip "." (handled by main alias) and CSS/asset paths
                if (exportKey === '.') return;
                if (/\.(css|scss|json)$/.test(exportKey)) return;
                const subName = exportKey.replace(/^\.\//, '');
                // Skip if already covered by a proxy .js file
                const aliasKey = `${packageName}/${subName}${!withoutEndSign ? '$' : ''}`;
                if (proxyAliases[aliasKey]) return;
                const srcFile = resolveSourceFile(packagePath, subName);
                if (fs.existsSync(srcFile)) {
                    exportsAliases[aliasKey] = srcFile;
                }
            });
        }

        return {
            ...aliases,
            ...proxyAliases,
            ...exportsAliases,
            [`${packageName}${!withoutEndSign ? '$' : ''}`]: resolveSourceFile(
                packagePath,
                'index',
            ),
        };
    }, {});

module.exports = getPackagesAliases;
