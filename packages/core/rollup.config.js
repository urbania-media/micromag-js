// eslint-disable-next-line import/no-extraneous-dependencies
import copy from 'rollup-plugin-copy';

import baseConfig from '../../rollup.config';

export default [
    {
        ...baseConfig,
        plugins: [
            ...baseConfig.plugins,
            copy({
                targets: [{ src: 'src/styles/*.scss', dest: 'scss' }],
            }),
        ],
    },
    {
        ...baseConfig,
        input: 'src/components.js',
        output: [
            {
                file: 'lib/components.js',
                format: 'cjs',
            },
            {
                file: 'es/components.js',
            },
        ],
    },
    {
        ...baseConfig,
        input: 'src/contexts.js',
        output: [
            {
                file: 'lib/contexts.js',
                format: 'cjs',
            },
            {
                file: 'es/contexts.js',
            },
        ],
    },
    {
        ...baseConfig,
        input: 'src/hooks.js',
        output: [
            {
                file: 'lib/hooks.js',
                format: 'cjs',
            },
            {
                file: 'es/hooks.js',
            },
        ],
    },
    {
        ...baseConfig,
        input: 'src/utils.js',
        output: [
            {
                file: 'lib/utils.js',
                format: 'cjs',
            },
            {
                file: 'es/utils.js',
            },
        ],
    },
];
