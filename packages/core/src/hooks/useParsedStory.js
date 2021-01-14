import { useMemo } from 'react';

import useThemeParser from './useThemeParser';
import useMediasParser from './useMediasParser';

const useParsedStory = (story, { disabled = false, withTheme = true, withMedias = true } = {}) => {
    const { fromPath: parseMedias } = useMediasParser();
    const parseTheme = useThemeParser();
    const newStory = useMemo(() => {
        if (disabled || story === null) {
            return story;
        }
        const parsers = [
            [withMedias, parseMedias],
            [withTheme, parseTheme]
        ];
        return parsers.reduce((parsedStory, [enabled, parse]) => enabled ? parse(parsedStory) : parsedStory, story);
    }, [story, disabled, withMedias, withTheme, parseMedias, parseTheme]);
    return newStory;
};

export default useParsedStory;
