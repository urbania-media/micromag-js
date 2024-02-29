import FontsParser from '../../packages/core/src/lib/FontsParser';
import MediasParser from '../../packages/core/src/lib/MediasParser';

import fieldsManager from '../../packages/fields/src/manager';
import screensManager from '../../packages/screens/src/manager';

export default function getScreenFields() {
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

    return {
        fonts: fontsMap,
        medias: mediasMap,
    };
}
