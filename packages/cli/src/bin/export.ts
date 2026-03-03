import program from 'commander';

import readJSON from '../utils/readJSON';
import exportStoryToPath from '../utils/exportStoryToPath';

const startProgram = (stdin = null) => {
    let storyArgument = null;
    program
        .arguments('<path>')
        .description({
            path: 'Path to story JSON file',
        })
        .requiredOption('-f, --format <format>', 'Format of the export')
        .option('-o, --output <output>', 'Output path')
        .option('-s, --settings <settings>', 'Settings')
        .action((jsonPath = null) => {
            storyArgument = jsonPath === '-' ? JSON.parse(stdin) : readJSON(jsonPath);
        })
        .parse();

    const { format, output = null, settings: jsonSettings = null } = program.opts();
    const settings = jsonSettings !== null ? JSON.parse(jsonSettings) : {};
    exportStoryToPath(storyArgument, format, output, settings);
};

// Read stdin for the story
if (process.stdin.isTTY) {
    startProgram();
} else {
    let stdin = null;
    process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
            if (stdin === null) {
                stdin = '';
            }
            stdin += chunk;
        }
    });
    process.stdin.on('end', () => {
        startProgram(stdin);
    });
}
