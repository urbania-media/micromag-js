/**
 * ThemeParser with the theme pattern precomputed at build time (scripts/lib/getScreenFields.js)
 * must give the same result as with the screen definitions: the lazy screens of the viewer only
 * have their component, not their fields.
 */
import fs from 'fs';
import path from 'path';
import { describe, expect, test } from 'vitest';

import { ScreensManager, StoryParser } from '@micromag/core';
import fieldsManager from '@micromag/fields';

import getScreenFields from '../../../../../scripts/lib/getScreenFields';

import screensManager from '../../../../screens/src/defaultManager';
import ThemeParser from '../ThemeParser';
import createViewerStoryParser from './createViewerStoryParser';

type Story = {
    components?: Record<string, unknown>[];
    theme?: Record<string, unknown> | null;
    [key: string]: unknown;
};

const rootDir = path.resolve(__dirname, '../../../../..');
const dirs = [path.join(__dirname, 'fixtures'), path.join(rootDir, '.storybook/data/stories')];

const readStory = (file: string): Story | null => {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    if (data !== null && Array.isArray(data.components)) {
        return data;
    }
    if (data !== null && data.story && Array.isArray(data.story.components)) {
        return data.story;
    }
    return null;
};

const stories = dirs.flatMap((dir) =>
    fs
        .readdirSync(dir)
        .filter((file) => file.endsWith('.json'))
        .sort()
        .map((file) => [file, readStory(path.join(dir, file))] as [string, Story | null])
        .filter(([, story]) => story !== null),
);

// The theme of the theme fixture, applied to every story, so that every screen type is parsed
// with a theme (most stories of the repo have none)
const { theme: fixtureTheme } = readStory(path.join(__dirname, 'fixtures/theme.json')) || {};

const toRegExps = (patterns: Record<string, string[]>): Record<string, RegExp[]> =>
    Object.keys(patterns).reduce(
        (map, type) => ({
            ...map,
            [type]: patterns[type].map((pattern) => {
                const flagsIndex = pattern.lastIndexOf('/');
                return new RegExp(pattern.slice(1, flagsIndex), pattern.slice(flagsIndex + 1));
            }),
        }),
        {},
    );

const { medias, fonts, theme } = getScreenFields() as {
    medias: Record<string, string[]>;
    fonts: Record<string, string[]>;
    theme: Record<string, unknown>;
};
// As written in theme-fields.js by the build
const themePattern = JSON.parse(JSON.stringify(theme));

// A screens manager like the lazy one: components only, no fields, and the precomputed patterns
const createLazyManager = () => {
    const manager = new ScreensManager(
        screensManager.getDefinitions().map(({ id, type, component }) => ({ id, type, component })),
    );
    manager.setFieldsPattern({
        medias: toRegExps(medias),
        fonts: toRegExps(fonts),
        theme: themePattern,
    });
    return manager;
};

describe('ThemeParser with the precomputed pattern', () => {
    test('the pattern is JSON (it is written in a file at build time)', () => {
        expect(themePattern).toEqual(theme);
        expect(Object.keys(themePattern).sort()).toEqual(
            screensManager
                .getDefinitions()
                .map(({ id }) => id)
                .sort(),
        );
    });

    test('the lazy manager has no fields', () => {
        const manager = createLazyManager();
        expect(manager.getDefinitions().every(({ fields }) => typeof fields === 'undefined')).toBe(
            true,
        );
    });

    describe.each(stories)('%s', (file, story) => {
        test('same result as with the definitions', () => {
            const expected = new ThemeParser({ screensManager }).parse(story);
            const actual = new ThemeParser({ screensManager: createLazyManager() }).parse(story);
            expect(actual).toEqual(expected);
        });

        test('same result with the theme fixture', () => {
            const themedStory = { ...story, theme: { ...fixtureTheme, ...story?.theme } };
            const expected = new ThemeParser({ screensManager }).parse(themedStory);
            const actual = new ThemeParser({ screensManager: createLazyManager() }).parse(
                themedStory,
            );
            expect(actual).toEqual(expected);
        });

        test('same result for the whole StoryParser', () => {
            const expected = createViewerStoryParser().parse(story);
            const manager = createLazyManager();
            const actual = new StoryParser({
                screensManager: manager,
                fieldsManager,
                fieldsPattern: manager.getFieldsPattern(),
            }).parse(story);
            expect(actual).toEqual(expected);
        });
    });
});
