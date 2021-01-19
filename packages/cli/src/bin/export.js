import program from 'commander';

import readJSON from '../utils/readJSON';
import exportStory from '../utils/exportStory';

let storyJson = null;
program
    .arguments('<path>')
    .description({
        path: 'Path to story JSON file',
    })
    .requiredOption('-f, --format <format>', 'Format of the export')
    .action((jsonPath) => {
        storyJson = readJSON(jsonPath);
    });

program.parse();

const options = program.opts();

console.log(storyJson);
console.log(exportStory(storyJson, options.format));
