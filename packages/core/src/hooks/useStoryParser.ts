import { StoryParser } from '../lib';

// import createDebug from 'debug';
import { useFieldsManager, useScreensManager } from '../contexts';
import { Story } from '../types';

export function useStoryParser() {
    const screensManager = useScreensManager();
    const fieldsManager = useFieldsManager();
    const parser = new StoryParser({
        screensManager,
        fieldsManager,
        fieldsPattern: screensManager.getFieldsPattern(),
    });

    return parser;
}

export function useParsedStory(story: Story, { disabled = false } = {}) {
    const parser = useStoryParser();
    return disabled ? story : parser.parseToViewer(story);
}
