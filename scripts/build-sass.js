#! /usr/bin/env node
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { program } = require('commander');
const sass = require('node-sass');
const tildeImporter = require('node-sass-tilde-importer');

let srcFile = null;
let outFile = null;

program.arguments('<src> <out>').action((src, out) => {
    srcFile = path.join(process.cwd(), src);
    outFile = path.join(process.cwd(), out);
});

program.parse(process.argv);

const result = sass.renderSync({
    file: srcFile,
    outFile,
    importer: tildeImporter,
    outputStyle: 'compressed',
    sourceMap: true,
    includePaths: [path.join(process.cwd(), 'node_modules')],
});

mkdirp.sync(path.dirname(outFile));
fs.writeFileSync(outFile, result.css);

console.log(`Generated ${outFile} from ${result.stats.entry} in ${result.stats.duration}s`);
