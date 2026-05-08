import { useMemo, useState } from 'react';

import { StoryParser } from '../lib';

// import createDebug from 'debug';
import { useFieldsManager, useScreensManager } from '../contexts';

// const debug = createDebug('core:useParsedStory');

const useParsedStory = (
    story,
    {
        disabled = false,
        withTheme = true,
        withMedias = true,
        withFonts = true,
        withMigrations = true,
    } = {},
) => {
    const screensManager = useScreensManager();
    const fieldsManager = useFieldsManager();
    const [parser] = useState(
        () =>
            new StoryParser({
                screensManager,
                fieldsManager,
                fieldsPattern: screensManager.getFieldsPattern(),
            }),
    );
    const newStory = useMemo(() => {
        if (disabled) {
            return story;
        }
        return parser.parse(story, { withMedias, withTheme, withFonts, withMigrations });
    }, [parser, disabled, withMedias, withTheme, withFonts, story]);

    return newStory;
};

export default useParsedStory;
