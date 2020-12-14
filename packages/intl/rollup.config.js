import path from 'path';
import { sync as syncGlob } from 'glob';
import replace from '@rollup/plugin-replace';
import baseConfig from '../../rollup.config';
import { supportedLocales as locales } from './package.json';

const localesFiles = locales.map((locale) => ({
    ...baseConfig({
        prependPlugins: [
            replace({
                REPLACE_LOCALE: locale,
            }),
        ],
    }),
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
}));

export default [
    {
        ...baseConfig(),
    },
    ...localesFiles,
];
