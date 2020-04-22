import path from 'path';
import { sync as syncGlob } from 'glob';
import replace from '@rollup/plugin-replace';
import baseConfig from '../../rollup.config';

const locales = syncGlob(path.join(__dirname, './locale/*.json')).map(it => path.basename(it, '.json'));
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
