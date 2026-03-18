import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

import { createConfig } from '../../rollup.config.mjs';

const files = {
    'index.ts': {},
    'all.ts': {},
};

export default Object.keys(files).reduce(
    (configs, file) => [
        ...configs,
        createConfig({
            file,
            format: 'es',
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
