import program from 'commander';
import fs from 'fs';
import { StoryParser } from '@micromag/core';
import ScreensManager from '@micromag/screens';
import FieldsManager from '@micromag/fields';
import readJSON from '../utils/readJSON';
import transformStory from '../utils/transformStory';
import captureStory from '../utils/captureStory';
import getStoryHtml from '../utils/getStoryHtml';
import getStoryHtmlSSR from '../utils/getStoryHtmlSSR';
import getOutputPath from '../utils/getOutputPath';

let story = null;
program
    .arguments('<path>')
    .description({
        path: 'Path to story JSON file',
    })
    .requiredOption('-f, --format <format>', 'Format of the export')
    .option('-o, --output <output>', 'Output path')
    .option('-s, --settings <settings>', 'Settings')
    .action((jsonPath) => {
        story = readJSON(jsonPath);
    });

program.parse();

const exportStory = async (format, output, jsonSettings) => {
    const settings = jsonSettings ? JSON.parse(jsonSettings) : {};
    const storyParser = new StoryParser({
        fieldsManager: FieldsManager,
        screensManager: ScreensManager,
    });
    const storyParsed = storyParser.parse(story);

    console.log('cli-out', storyParsed, format, output, settings);

    switch (format) {
        case 'html': {
            const html = await getStoryHtml(storyParsed);
            const destination = getOutputPath(output, 'story.html');
            console.log('destination', destination);
            fs.writeFileSync(destination, html, 'utf-8');
            break;
        }
        case 'html-ssr': {
            const html = getStoryHtmlSSR(storyParsed);
            const destination = getOutputPath(output, 'story-ssr.html');
            fs.writeFileSync(destination, html, 'utf-8');
            break;
        }
        case 'images': {
            const destination = getOutputPath(output);
            console.log('to be implemented', destination);
            captureStory(storyParsed);
            break;
        }
        default: {
            const newStory = transformStory(storyParsed, format);
            // const mediaDestination = getOutputPath(output);
            const fileDestination = getOutputPath(output, '/output/article.json');
            fs.writeFileSync(fileDestination, JSON.stringify(newStory), 'utf-8');
            // console.log(storyParsed);
            break;
        }
    }
};

const { format, output, settings } = program.opts();
exportStory(format, output, settings);
