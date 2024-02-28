import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

import { createConfig } from '../../rollup.config';

const files = {
    'index.js': {},
    'all.js': {},
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
