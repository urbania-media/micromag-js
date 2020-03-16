import baseConfig from '../../rollup.config';

export default [
    {
        ...baseConfig,
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
        ]
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
        ]
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
        ]
    }
];
