import { useCallback, useMemo } from 'react';
import { useScreensManager } from '../contexts';
import { ThemeParser } from '../lib';

const useThemeParser = () => {
    const screensManager = useScreensManager();
    const parser = useMemo(() => new ThemeParser({ screensManager }), [screensManager]);
    const parse = useCallback((story) => parser.parse(story), [parser]);
    return parse;
};

export default useThemeParser;
