import { createConfig } from '../../rollup.config';

export default [
    createConfig({
        file: 'index.js',
        format: 'cjs',
    }),
    createConfig({
        input: 'src/bin/export.js',
        output: 'bin/export.js',
        banner: '#!/usr/bin/env node',
        format: 'node',
    })
];
