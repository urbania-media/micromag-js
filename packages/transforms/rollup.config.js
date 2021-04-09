import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';

import { createConfig } from '../../rollup.config';

const files = {
    'index.js': {
        prependPlugins: [
            alias({
                entries: [
                    {
                        find: /\.\/(apple-news|utils)\/?$/,
                        replacement: '@micromag/transforms/$1',
                    },
                ],
            }),
        ],
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            resolveOnly: [new RegExp(path.join(__dirname, './src'))],
        },
    },

    'apple-news.js': {
        prependPlugins: [
            alias({
                entries: [
                    {
                        find: /^(\.\.\/)*\.\.\/\.\.\/(utils)$/,
                        replacement: '@micromag/transforms/$2',
                    },
                ],
            }),
        ],
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            resolveOnly: [new RegExp(path.join(__dirname, './src/apple-news'))],
        },
    },

    'utils.js': {
        resolveOptions: {
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
            resolveOnly: [new RegExp(path.join(__dirname, './src/utils'))],
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
