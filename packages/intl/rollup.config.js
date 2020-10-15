import path from 'path';
import { sync as syncGlob } from 'glob';
import replace from '@rollup/plugin-replace';
import baseConfig from '../../rollup.config';

const locales = syncGlob(path.join(__dirname, './lang/*.json')).map((it) =>
    path.basename(it, '.json'),
);
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
            file: `lang/${locale}.js`,
        },
        {
            file: `lang/${locale}.cjs.js`,
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
