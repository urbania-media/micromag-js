import program from 'commander';
import fs from 'fs';
import path from 'path';
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
        story = readJSON(jsonPath);
    });

program.parse();

const exportStory = async (format) => {
    switch (format) {
        case 'html': {
            const html = await getStoryHtml(story);
            fs.writeFileSync(path.join(process.cwd(), './story.html'), html, 'utf-8');
            break;
        }
        case 'html-ssr': {
            const html = getStoryHtmlSSR(story);
            fs.writeFileSync(path.join(process.cwd(), './story-ssr.html'), html, 'utf-8');
            break;
        }
        case 'images': {
            console.log('to be implemented');
            captureStory(story);
            break;
        }
        default: {
            const newStory = transformStory(story, format);
            fs.writeFileSync('article.json', JSON.stringify(newStory), 'utf-8');
            console.log(newStory);
            break;
        }
    }
}

const { format } = program.opts();
exportStory(format);
