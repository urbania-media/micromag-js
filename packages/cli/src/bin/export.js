import program from 'commander';
import fs from 'fs';
import { StoryParser, ScreensManager, FieldsManager } from '@micromag/core';

import readJSON from '../utils/readJSON';
import transformStory from '../utils/transformStory';
import captureStory from '../utils/captureStory';
import getStoryHtml from '../utils/getStoryHtml';
import getStoryHtmlSSR from '../utils/getStoryHtmlSSR';

let story = null;
program
    .arguments('<path>')
    .description({
        path: 'Path to story JSON file',
    })
    .requiredOption('-f, --format <format>', 'Format of the export')
    .action((jsonPath) => {
        const screensManager = new ScreensManager();
        const fieldsManager = new FieldsManager();
        const storyParser = new StoryParser({ fieldsManager, screensManager });

        story = storyParser.parse(readJSON(jsonPath));
    });

program.parse();

const { format } = program.opts();

switch (format) {
    case 'html': {
        getStoryHtml(story);
        break;
    }
    case 'html-ssr': {
        getStoryHtmlSSR(story);
        break;
    }
    case 'images': {
        console.log('to be implemented');
        captureStory(story);
        break;
    }
    default: {
        console.log(story);
        const newStory = transformStory(story, format);
        fs.writeFileSync('article.json', JSON.stringify(newStory), 'utf-8', () => {
            console.log('wrote file');
        });
        console.log(newStory);
        break;
    }
}
