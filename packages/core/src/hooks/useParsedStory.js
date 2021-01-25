import { useMemo } from 'react';

import { useScreensManager, useFieldsManager } from '../contexts';
import { StoryParser } from '../lib';

const useParsedStory = (story, { disabled = false, withTheme = true, withMedias = true } = {}) => {
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
        return parser.parse(story, { withMedias, withTheme });
    }, [parser, disabled, withMedias, withTheme, story]);
    return newStory;
};

export default useParsedStory;
