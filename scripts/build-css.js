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
                const resolved = require.resolve(id, { paths: [basedir] });

                // If a CSS @import resolved to a .js file (e.g. bare @panneau/* package
                // names in aggregator CSS), try the package's CSS asset path instead.
                if (resolved.endsWith('.js')) {
                    try {
                        return require.resolve(`${id}/assets/css/styles.css`, {
                            paths: [basedir],
                        });
                    } catch {
                        // No CSS asset — skip this import
                        return id;
                    }
                }

                return resolved;
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
