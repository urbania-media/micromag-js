#!/usr/bin/env node
const path = require('path');
const { program } = require('commander');
const { sync: globSync } = require('glob');
const { extractAndWrite } = require('@formatjs/cli');
const { idInterpolationPattern } = require('./formatjs');

let srcPath;
let destPath;
program.arguments('<src> <dest>').action((src, dest) => {
    srcPath = src;
    destPath = dest;
});

program.parse(process.argv);

const files = globSync(srcPath, {
    nodir: true,
    cwd: process.cwd(),
});

extractAndWrite(files, {
    throws: false,
    format: 'transifex',
    idInterpolationPattern,
    outFile: path.join(process.cwd(), destPath),
});
