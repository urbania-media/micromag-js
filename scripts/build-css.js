#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { program } = require('commander');
const postcss = require('postcss');
const atImport = require('postcss-import');
const postcssConfig = require('../postcss.config');

let srcFile = null;
let outFile = null;

program
    .arguments('<src> <out>')
    .action((src, out) => {
        srcFile = path.join(process.cwd(), src);
        outFile = path.join(process.cwd(), out);
    });

program.parse(process.argv);

const cssContent = fs.readFileSync(srcFile, 'utf-8');

postcss([
    atImport({
        resolve(id, basedir) {
            // postcss-import's built-in resolver doesn't respect package.json "exports".
            // Fall back to require.resolve which does.
            try {
                return require.resolve(id, { paths: [basedir] });
            } catch {
                return id;
            }
        },
    }),
    ...postcssConfig.plugins,
])
    .process(cssContent, {
        from: srcFile,
        to: outFile,
    })
    .then((result) => {
        mkdirp.sync(path.dirname(outFile));
        fs.writeFileSync(outFile, result.css);
        console.log(`Generated ${outFile}`);
    });
