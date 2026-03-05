import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

import { createConfig } from '../../rollup.config.js';

const files = {
    'index.ts': {},
    'all.ts': {},
};

const isFieldsImport = (id) => id === '../fields' || id === '../fields.js';

export default Object.keys(files).reduce(
    (configs, file) => [
        ...configs,
        {
            ...createConfig({
                file,
                format: 'both',
                ...files[file],
            }),
            external: isFieldsImport,
        },
        // createConfig({
        //     file,
        //     format: 'cjs',
        //     ...files[file],
        // }),
    ],
    [],
);
