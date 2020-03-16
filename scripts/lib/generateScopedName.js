import path from 'path';
import slugify from 'slugify';

const { name: packageName } = require(path.join(process.cwd(), 'package.json'));
const namespace = slugify(packageName.replace(/[@/]/gi, ' '));

const generateScopedName = (localName, filePath) => {
    const basename = path.basename(filePath).replace(/(\.module|\.global)?\.s?css$/i, '');
    const name = basename !== 'styles' ? `${namespace}-${basename}` : namespace;
    return '[name]-[local]'
        .replace(/\[\s*name\s*\]/gi, name)
        .replace(/\[\s*local\s*\]/gi, localName);
};

export default generateScopedName;
