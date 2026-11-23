import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

import { createConfig } from '../../rollup.config';

const files = {
    'index.ts': {},
    'all.ts': {},
    // ESM only: the screens are dynamic imports, with their CSS
    'lazy.ts': { format: 'es' },
};

const isFieldsImport = (id) =>
    ['../fields', '../fields.js', '../theme-fields', '../theme-fields.js'].includes(id);

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
