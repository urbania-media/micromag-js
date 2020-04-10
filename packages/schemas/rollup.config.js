// eslint-disable-next-line import/no-extraneous-dependencies
import baseConfig from '../../rollup.config';

export default [
    {
        ...baseConfig,
    },
    {
        ...baseConfig,
        input: 'src/repository.js',
        output: [
            {
                file: 'lib/repository.js',
                format: 'cjs',
            },
            {
                file: 'es/repository.js',
            },
        ],
    },
];
