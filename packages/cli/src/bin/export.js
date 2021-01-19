#! /usr/bin/env node
import program from 'commander';

import readJSON from '../utils/readJSON';

program
    .option('-j, --json <path>', 'Path to story JSON file')
    .requiredOption('-f, --format <format>', 'Format of the export')
    .parse();

const options = program.opts();

const json = readJSON(options.json);
console.log(json);
