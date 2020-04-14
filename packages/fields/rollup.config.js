// eslint-disable-next-line import/no-extraneous-dependencies
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
