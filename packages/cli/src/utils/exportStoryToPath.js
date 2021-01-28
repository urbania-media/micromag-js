import fs from 'fs';
import { StoryParser } from '@micromag/core';
import ScreensManager from '@micromag/screens';
import FieldsManager from '@micromag/fields';

import transformStory from './transformStory';
import captureStory from './captureStory';
import getStoryHtml from './getStoryHtml';
import getStoryHtmlSSR from './getStoryHtmlSSR';
import getOutputPath from './getOutputPath';

const storyParser = new StoryParser({
    fieldsManager: FieldsManager,
    screensManager: ScreensManager,
});

const exportStoryToPath = async (story, output, format, settings = {}) => {
    const storyParsed = storyParser.parse(story);
    switch (format) {
        case 'html': {
            const html = await getStoryHtml(storyParsed, settings);
            const destination = getOutputPath(output, 'story.html');
            console.log('destination', destination);
            fs.writeFileSync(destination, html, 'utf-8');
            break;
        }
        case 'html-ssr': {
            const html = getStoryHtmlSSR(storyParsed, settings);
            const destination = getOutputPath(output, 'story-ssr.html');
            fs.writeFileSync(destination, html, 'utf-8');
            break;
        }
        case 'images': {
            captureStory(storyParsed, output, settings);
            break;
        }
        default: {
            const newStory = transformStory(storyParsed, format, settings);
            // const mediaDestination = getOutputPath(output);
            const fileDestination = getOutputPath(output, 'article.json');
            fs.writeFileSync(fileDestination, JSON.stringify(newStory), 'utf-8');
            break;
        }
    }
};

export default exportStoryToPath;
