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
        },
        {
            file: `locale/${locale}.cjs.js`,
            format: 'cjs',
        },
    ],
    plugins: [
        replace({
            'REPLACE_LOCALE': locale,
        }),
        ...baseConfig.plugins
    ]
}));

export default [
    {
        ...baseConfig,
    },
    ...localesFiles,
];
