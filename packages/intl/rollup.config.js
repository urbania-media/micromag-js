import path from 'path';
import { sync as syncGlob } from 'glob';
import replace from '@rollup/plugin-replace';
import { default as configs, createConfig } from '../../rollup.config';
import { supportedLocales as locales } from './package.json';

const localesFiles = locales.reduce(
    (configs, locale) => [
        ...configs,
        createConfig({
            input: 'src/lang.js',
            output: `locale/${locale}.js`,
            prependPlugins: [
                replace({
                    values: {
                        REPLACE_LOCALE: locale,
                    },
                    delimiters: ['', ''],
                    preventAssignment: false,
                }),
            ],
        }),
        // createConfig({
        //     input: 'src/lang.js',
        //     output: `locale/${locale}.cjs.js`,
        //     format: 'cjs',
        //     prependPlugins: [
        //         replace({
        //             values: {
        //                 REPLACE_LOCALE: locale,
        //             },
        //             delimiters : ['', ''],
        //             preventAssignment: false,
        //         }),
        //     ],
        // }),
    ],
    [],
);

export default [
    ...configs,
    ...localesFiles,
];
