#!/usr/bin/env node
import fsExtra from 'fs-extra';
import path from 'path';

import FontsParser from '../../core/src/lib/FontsParser';
import MediasParser from '../../core/src/lib/MediasParser';

import fieldsManager from '../../fields/src/manager';
import screensManager from '../src/manager';

const mediasParser = new MediasParser({
    screensManager,
    fieldsManager,
});

const fontsParser = new FontsParser({
    screensManager,
    fieldsManager,
});

const mediasMap = screensManager.getDefinitions().reduce(
    (map, { id, fields }) => ({
        ...map,
        [id]: mediasParser.getFieldsPattern(fields).map((it) => it.toString()),
    }),
    {},
);

const fontsMap = screensManager.getDefinitions().reduce(
    (map, { id, fields }) => ({
        ...map,
        [id]: fontsParser.getFieldsPattern(fields).map((it) => it.toString()),
    }),
    {},
);

const fields = {
    fonts: fontsMap,
    medias: mediasMap,
};

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

fsExtra.writeFileSync(path.join(process.cwd(), './fields.js'), fieldsJs);
fsExtra.writeJsonSync(path.join(process.cwd(), './fields.json'), fields, {
    spaces: 4,
});
