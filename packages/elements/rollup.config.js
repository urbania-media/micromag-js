// eslint-disable-next-line import/no-extraneous-dependencies
import baseConfig from '../../rollup.config';

export default [
    {
        ...baseConfig,
    },
    {
        ...baseConfig,
        input: 'src/all.js',
        output: [
            {
                file: 'lib/all.js',
                format: 'cjs',
            },
            {
                file: 'es/all.js',
            },
        ],
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
