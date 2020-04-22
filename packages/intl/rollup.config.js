// eslint-disable-next-line import/no-extraneous-dependencies
import replace from '@rollup/plugin-replace';
import baseConfig from '../../rollup.config';

const locales = ['fr', 'en'];
const localesFiles = locales.map((locale) => ({
    ...baseConfig,
    input: 'src/lang.js',
    output: [
        {
            file: `locale/${locale}.js`,
            format: 'cjs',
        },
    ],
    plugins: [
        replace({
            'LOCALE': locale,
        }),
        ...baseConfig.plugins
    ]
}));

export default [
    {
        ...baseConfig,
    },
    {
        ...baseConfig,
        input: 'src/manager.js',
        output: [
            {
                file: 'lib/manager.js',
                format: 'cjs',
            },
            {
                file: 'es/manager.js',
            },
        ],
    },
    ...localesFiles,
];
