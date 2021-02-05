import { useMemo } from 'react';
// import createDebug from 'debug';

import { useScreensManager, useFieldsManager } from '../contexts';
import { StoryParser } from '../lib';

// const debug = createDebug('core:useParsedStory');

const useParsedStory = (story, { disabled = false, withTheme = true, withMedias = true, withFonts = true } = {}) => {
    const screensManager = useScreensManager();
    const fieldsManager = useFieldsManager();
    const parser = useMemo(() => new StoryParser({ screensManager, fieldsManager }), [
        screensManager,
        fieldsManager,
    ]);
    const newStory = useMemo(() => {
        if (disabled) {
            return story;
        }
        return parser.parse(story, { withMedias, withTheme, withFonts });
    }, [parser, disabled, withMedias, withTheme, withFonts, story]);
    return newStory;
};

export default useParsedStory;
