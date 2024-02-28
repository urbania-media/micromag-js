
import path from 'path';
import { program } from 'commander';
import fsExtra from 'fs-extra';

import getScreenFields from './lib/getScreenFields';

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
