import path from 'path';

import { createConfig } from '../../rollup.config';

const files = {
    'index.js': {
        // prependPlugins: [
        //     alias({
        //         entries: [
        //             {
        //                 find: /(\.|\.\.)\/(contexts|utils|hooks|components)\/?$/,
        //                 replacement: '@micromag/core/$2',
        //             },
        //         ],
        //     }),
        // ],
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            resolveOnly: [
                new RegExp(path.join(__dirname, './src/')),
            ],
        },
    },

    'manager.js': {
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            resolveOnly: [
                new RegExp(path.join(__dirname, './src/fields')),
            ],
        },
    },
};

export default Object.keys(files).reduce(
    (configs, file) => [
        ...configs,
        createConfig({
            file,
            format: 'both',
            ...files[file],
        }),
        // createConfig({
        //     file,
        //     format: 'cjs',
        //     ...files[file],
        // }),
    ],
    [],
);
