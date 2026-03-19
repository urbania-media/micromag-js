import babelParser from '@babel/eslint-parser';
import eslintReact from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import formatjs from 'eslint-plugin-formatjs';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
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
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
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
    {
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                ecmaVersion: 'latest',
                requireConfigFile: false,
                babelOptions: {
                    presets: ['@babel/preset-react', '@babel/preset-typescript'],
                },
            },
        },
    },
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintReact.configs['recommended-typescript'],
    importPlugin.flatConfigs.typescript,
    importPlugin.flatConfigs.recommended,
    formatjs.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    eslintPluginPrettierRecommended,
    reactHooks.configs.flat['recommended-latest'],
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

            // React Compiler rules from react-hooks v7 — suppress until codebase is ready
            'react-hooks/preserve-manual-memoization': 'off',
            'react-hooks/refs': 'off',
            'react-hooks/set-state-in-effect': 'off',
            'react-hooks/immutability': 'off',
            'react-hooks/purity': 'off',
        },
    },
]);

export default config;
