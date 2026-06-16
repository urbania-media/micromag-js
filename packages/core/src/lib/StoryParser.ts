import createDebug from 'debug';

import type { Story, StoryParser as StoryParserInterface } from '../types';
import FontsParser from './FontsParser';
import MediasParser from './MediasParser';
import MigrationsParser from './MigrationsParser';
import ThemeParser from './ThemeParser';

const debug = createDebug('micromag:parser');

class StoryParser implements StoryParserInterface {
    parsers: StoryParserInterface[];

    lastParsedStoryToViewer: { original: Story; parsed: Story } | null;
    lastParsedStoryFromEditor: { original: Story; parsed: Story } | null;

    constructor({ screensManager, fieldsManager, fieldsPattern }) {
        const { medias: mediasPattern = null, fonts: fontsPattern = null } = fieldsPattern || {};
        this.parsers = [
            new ThemeParser({ screensManager }),
            new MigrationsParser({ screensManager }),
            new FontsParser({
                screensManager,
                fieldsManager,
                fieldsPattern: fontsPattern,
            }),
            new MediasParser({
                screensManager,
                fieldsManager,
                fieldsPattern: mediasPattern,
            }),
        ];

        this.lastParsedStoryToViewer = null;
        this.lastParsedStoryFromEditor = null;
    }

    parseToViewer(story: Story) {
        if (story === null) {
            return story;
        }

        if (this.lastParsedStoryToViewer?.original === story) {
            return this.lastParsedStoryToViewer.parsed;
        }

        const startTime = Date.now();
        const parsedStory = this.parsers.reduce(
            (parsedStory, parser) => parser.parseToViewer?.(parsedStory) ?? parsedStory,
            story,
        );
        const elapsedTime = Date.now() - startTime;
        debug('Story parsed to viewer in %dms', elapsedTime);

        this.lastParsedStoryToViewer = {
            original: story,
            parsed: parsedStory,
        };
        return parsedStory;
    }

    parseFromEditor(story: Story) {
        if (story === null) {
            return story;
        }

        if (this.lastParsedStoryFromEditor?.original === story) {
            return this.lastParsedStoryFromEditor.parsed;
        }

        const startTime = Date.now();
        const parsedStory = this.parsers.reduce(
            (parsedStory, parser) => parser.parseFromEditor?.(parsedStory) ?? parsedStory,
            story,
        );
        const elapsedTime = Date.now() - startTime;
        debug('Story parsed from editor in %dms', elapsedTime);

        this.lastParsedStoryFromEditor = {
            original: story,
            parsed: parsedStory,
        };

        return parsedStory;
    }
}

export default StoryParser;
