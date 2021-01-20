import program from 'commander';

import readJSON from '../utils/readJSON';
import transformStory from '../utils/transformStory';
import captureStory from '../utils/captureStory';

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

const { format } = program.opts();

switch (format) {
    case 'html': {
        console.log('to be implemented');
        break;
    }
    case 'images': {
        console.log('to be implemented');
        captureStory(story);
        break;
    }
    default: {
        const newStory = transformStory(story, format);
        console.log(newStory);
        break;
    }
}
