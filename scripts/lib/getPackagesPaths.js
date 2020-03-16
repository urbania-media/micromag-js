const lerna = require('../../lerna.json');

const getPackagesPaths = () => lerna.packages.map(it => it.replace(/\/\*/, '/'));

module.exports = getPackagesPaths;
