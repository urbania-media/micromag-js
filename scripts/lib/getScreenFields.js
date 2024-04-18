import FontsParser from '../../packages/core/src/lib/FontsParser';
import MediasParser from '../../packages/core/src/lib/MediasParser';
import getScreenFieldsWithStates from '../../packages/core/src/utils/getScreenFieldsWithStates';

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

    const screens = screensManager.getDefinitions();

    const mediasMap = screens.reduce((map, definition) => {
        const fields = getScreenFieldsWithStates(definition);
        return {
            ...map,
            [definition.id]: mediasParser.getFieldsPattern(fields).map((it) => it.toString()),
        };
    }, {});

    const fontsMap = screens.reduce((map, definition) => {
        const fields = getScreenFieldsWithStates(definition);
        return {
            ...map,
            [definition.id]: fontsParser.getFieldsPattern(fields).map((it) => it.toString()),
        };
    }, {});

    return {
        fonts: fontsMap,
        medias: mediasMap,
    };
}
