import { createConfig } from '../../rollup.config';

export default [
    createConfig({
        file: 'index.js',
        format: 'cjs',
    }),
    createConfig({
        input: 'src/bin/export.js',
        output: 'bin/export.js',
        format: 'cjs',
    })
];
