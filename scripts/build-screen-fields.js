#!/usr/bin/env node

// require('@babel/register')({
//     // This will override `node_modules` ignoring - you can alternatively pass
//     // an array of strings to be explicitly matched or a regex / glob
//     ignore: [],
//     babelrc: false,
//     configFile: `${__dirname}/../babel.config.scripts.js`,
// });

const path = require('path');
const { program } = require('commander');
const fsExtra = require('fs-extra');

const { default: getScreenFields } = require('./lib/getScreenFields');

let outDir;
program.arguments('<out>').action((out) => {
    outDir = path.join(process.cwd(), out);
});

program.parse(process.argv);

const fields = getScreenFields();
const { fonts: fontsMap, medias: mediasMap } = fields;

const fieldsJs = `module.exports = {
    fonts: {\n${Object.keys(fontsMap)
        .map(
            (key) =>
                `        "${key}": [\n${fontsMap[key]
                    .map((it) => `            ${it}`)
                    .join(',\n')}\n        ]`,
        )
        .join(',\n\n')}},
    medias: {\n${Object.keys(mediasMap)
        .map(
            (key) =>
                `        "${key}": [\n${mediasMap[key]
                    .map((it) => `            ${it}`)
                    .join(',\n')}\n        ]`,
        )
        .join(',\n\n')}}
};`;

fsExtra.writeFileSync(path.join(outDir, './fields.js'), fieldsJs);
fsExtra.writeJsonSync(path.join(outDir, './fields.json'), fields, {
    spaces: 4,
});
