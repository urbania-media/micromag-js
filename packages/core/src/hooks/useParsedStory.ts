import { useMemo } from 'react';

import { StoryParser } from '../lib';

// import createDebug from 'debug';
import { useScreensManager, useFieldsManager } from '../contexts';

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
    const parser = useMemo(
        () =>
            new StoryParser({
                screensManager,
                fieldsManager,
                fieldsPattern: screensManager.getFieldsPattern(),
            }),
        [screensManager, fieldsManager],
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
