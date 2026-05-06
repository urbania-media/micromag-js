import path from 'path';
import fs from 'fs';
import slugify from 'slugify';

const findNearestPackageJson = (startDir) => {
    let currentDir = startDir;
    while (currentDir && currentDir !== path.dirname(currentDir)) {
        const candidate = path.join(currentDir, 'package.json');
        if (fs.existsSync(candidate)) {
            return candidate;
        }
        currentDir = path.dirname(currentDir);
    }
    return null;
};

const generateScopedName = (localName, filePath) => {
    if (!filePath.match(/\.module\.css$/)) {
        return localName;
    }
    const packageJsonPath = findNearestPackageJson(path.dirname(filePath));
    if (!packageJsonPath) {
        return localName;
    }
    const packagePath = path.dirname(packageJsonPath);
    const { name: packageName } = require(packageJsonPath);
    const stylesPath = path.join(packagePath, 'src/styles');
    const hasStylesPath = fs.existsSync(stylesPath);
    const namespace = slugify(packageName.replace(/[@/]/gi, ' '));

    const relativePath = hasStylesPath ? path.relative(stylesPath, filePath) : null;
    const subDirectory = relativePath !== null ? path.dirname(relativePath).replace(/\//gi, '-').replace(/[^a-z-]+/gi, '') : null;
    const basename = path.basename(filePath).replace(/(\.module|\.global)?\.css$/i, '');
    const finalNamespace = subDirectory !== null && subDirectory.length > 0 ? `${namespace}-${subDirectory}` : namespace;
    const basenamePattern = new RegExp(`-${basename}$`, 'gi');
    const name = basename !== 'styles' && !basenamePattern.test(finalNamespace) ? `${finalNamespace}-${basename}` : finalNamespace;
    return '[name]-[local]'
        .replace(/\[\s*name\s*\]/gi, name)
        .replace(/\[\s*local\s*\]/gi, localName);
};

export default generateScopedName;
