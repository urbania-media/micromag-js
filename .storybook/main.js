const path = require('path');
const getPackagesPaths = require('../scripts/lib/getPackagesPaths');

module.exports = {
    stories: getPackagesPaths().map(packagePath =>
        path.join('../', packagePath, './**/*.stories.jsx'),
    ),
};
