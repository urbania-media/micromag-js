import path from 'path';
import resolve from '@rollup/plugin-node-resolve';

import baseConfig from '../../rollup.config';

export default [
    {
        ...baseConfig,
    },
    {
        ...baseConfig,
        input: 'src/schemas.js',
        output: [
            {
                file: 'lib/schemas.js',
                format: 'cjs',
            },
            {
                file: 'es/schemas.js',
            },
        ],
    },
];
