import url from '@rollup/plugin-url';
import { createFilter } from '@rollup/pluginutils';
// import isArray from 'lodash/isArray';
// import minimatch from 'minimatch';
import path from 'path';

// import copy from 'rollup-plugin-copy';

export default (options = {}) => {
    const filter = createFilter(options.include, options.exclude);
    const { load, ...plugin } = url({
        ...options,
        publicPath: '../assets/images/',
    });

    return {
        resolveId: async (module, importer) => {
            if (module.match(/^\./) === null) {
                return null;
            }
            const id = path.join(path.dirname(importer), module);
            if (!filter(id)) {
                return null;
            }
            const exportData = (await load(id)) || null;
            const matches = exportData.match(/^export default "([^\"]+)"$/);
            return matches !== null && matches[1].match(/^data:/) === null
                ? {
                      id: matches[1],
                      external: true,
                  }
                : null;
        },
        load,
        ...plugin,
    };
    // const {
    //     src = 'src/images/**',
    //     dest = 'assets/images',
    //     output = 'dist',
    //     cwd = process.cwd(),
    // } = options;
    // const filter = createFilter(src, options.exclude);
    // return {
    //     ...copy({
    //         targets: [{ src, dest }],
    //         flatten: false
    //     }),
    //     resolveId: (module, importer) => {
    //         if (module.match(/^\./) === null) {
    //             return null;
    //         }
    //         const absolutePath = path.join(path.dirname(importer), module);
    //         if (!filter(absolutePath)) {
    //             return null;
    //         }

    //         const absoluteDest = path.isAbsolute(dest) ? dest : path.join(cwd, dest);
    //         const absoluteOutput = path.isAbsolute(output) ? output : path.join(cwd, output);
    //         const relativePath = path.relative(cwd, absolutePath);

    //         const patterns = isArray(src) ? src : [src];
    //         for (let i = 0, il = patterns.length; i < il; i += 1) {
    //             const pattern = patterns[i];
    //             const patternRe = minimatch.makeRe(pattern);
    //             const matches = relativePath.match(patternRe);
    //             if (matches !== null) {
    //                 console.log(path.join(path.relative(absoluteOutput, absoluteDest), pattern.substr(0, pattern.indexOf('*'))));
    //                 return null;
    //                 // return {
    //                 //     id: path.join(path.relative(absoluteOutput, absoluteDest),),
    //                 //     external: true,
    //                 // };
    //             }
    //             console.log(relativePath, pattern, patternRe, matches);
    //         }
    //         return null;

    //         // const matches = module.match(match);
    //         // if (matches !== null) {
    //         //     return {
    //         //         id: `${destPath.replace(match, destPath)}`,
    //         //         external: true,
    //         //     };
    //         // }
    //         // return null;
    //     },
    // };
};
