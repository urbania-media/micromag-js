import FontsParser from '../../packages/core/src/lib/FontsParser';
import MediasParser from '../../packages/core/src/lib/MediasParser';
import ThemeParser from '../../packages/core/src/lib/ThemeParser';
import getScreenFieldsWithStates from '../../packages/core/src/utils/getScreenFieldsWithStates';

import fieldsManager from '../../packages/fields/src/manager';
import screensManager from '../../packages/screens/src/defaultManager';

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

    // What ThemeParser reads of each definition (a JSON value)
    const themeMap = screens.reduce(
        (map, definition) => ({
            ...map,
            [definition.id]: ThemeParser.getThemePattern(definition),
        }),
        {},
    );

    return {
        fonts: fontsMap,
        medias: mediasMap,
        theme: themeMap,
    };
}
