import eslintReact from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import formatjs from 'eslint-plugin-formatjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const config = defineConfig([
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    },
    {
        ignores: [
            '**/*.config.js',
            '**/*.config.mjs',
            'node_modules',
            '*/*/dist/**',
            '*/*/es/**',
            '!.storybook',
            './node_modules/**',
        ],
    },
    {
        settings: {
            react: {
                version: '19',
                defaultVersion: '19',
            },
        },
        languageOptions: {
            globals: {
                ...Object.keys(globals.browser).reduce(
                    (map, key) => ({
                        ...map,
                        [key.trim()]: globals.browser[key],
                    }),
                    {},
                ),
                __DEV__: 'readonly',
                __SERVER__: 'readonly',
                __EDITOR__: 'readonly',
                __ASSETS_MANIFEST__: 'readonly',
                __EMBEDDED_STYLES__: 'readonly',
                __EMBEDDED_SCRIPTS__: 'readonly',
            },
        },
    },
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintReact.configs['recommended-typescript'],
    formatjs.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        rules: {
            'formatjs/no-literal-string-in-jsx': 'off',

            // PropTypes fully removed — all types are TypeScript interfaces now
            'react/prop-types': 'off',

            // React import is required for Storybook babel-loader JSX parsing
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^(React|_)',
                    argsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

            // False positives for patterns like React.forwardRef, Hls.Events
            'import/no-named-as-default-member': 'off',

            // Computed namespace access (allScreens[name]) can't be statically validated
            'import/namespace': 'off',
        },
    },
]);

export default config;
