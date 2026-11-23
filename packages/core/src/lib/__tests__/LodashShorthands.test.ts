/**
 * The parsers must not use lodash iteratee shorthands (`uniqBy(items, 'name')`,
 * `sortBy(items, ['color', 'alpha'])`, ...): hosts that bundle with `lodash-webpack-plugin` and its
 * default options strip the shorthands, and the parse then crashes with "t is not a function"
 * (https://github.com/urbania-media/micromag-js/issues/64).
 *
 * The lodash functions are replaced here by versions that only accept function iteratees, as with
 * the plugin's defaults.
 */
import { describe, expect, test, vi } from 'vitest';

import ColorsParser from '../ColorsParser';
import FontsParser from '../FontsParser';

const assertFunctionIteratees = (name: string, iteratees: unknown) => {
    const list = Array.isArray(iteratees) ? iteratees : [iteratees];
    list.forEach((iteratee) => {
        if (typeof iteratee !== 'function') {
            throw new TypeError(
                `${name}: iteratee shorthand ${JSON.stringify(iteratee)} is not a function`,
            );
        }
    });
};

vi.mock('lodash-es/uniqBy', async (importOriginal) => {
    const { default: uniqBy } = await importOriginal<typeof import('lodash-es/uniqBy')>();
    return {
        default: (items: unknown[], iteratee: unknown) => {
            assertFunctionIteratees('uniqBy', iteratee);
            return uniqBy(items, iteratee as (item: unknown) => unknown);
        },
    };
});

vi.mock('lodash-es/sortBy', async (importOriginal) => {
    const { default: sortBy } = await importOriginal<typeof import('lodash-es/sortBy')>();
    return {
        default: (items: unknown[], iteratees: unknown) => {
            assertFunctionIteratees('sortBy', iteratees);
            return sortBy(items, iteratees as ((item: unknown) => unknown)[]);
        },
    };
});

const fontA = { type: 'google', name: 'Font A' };
const fontB = { type: 'custom', name: 'Font B', media: { id: 'font-b' } };

describe('FontsParser without lodash shorthands', () => {
    // The patterns are given directly so that the test does not depend on the screen definitions
    const fontsParser = new FontsParser({
        fieldsManager: { getDefinition: () => null },
        screensManager: { getDefinition: () => null },
        fieldsPattern: {
            text: [/^text\.textStyle\.fontFamily$/],
            title: [/^title\.textStyle\.fontFamily$/],
        },
    });

    test('extracts the fonts of the screens, without duplicates', () => {
        const story = {
            components: [
                { type: 'text', text: { body: 'a', textStyle: { fontFamily: fontA } } },
                { type: 'text', text: { body: 'b', textStyle: { fontFamily: fontA } } },
                { type: 'title', title: { body: 'c', textStyle: { fontFamily: fontB } } },
            ],
        };
        expect(fontsParser.parse(story)).toEqual({ ...story, fonts: [fontA, fontB] });
    });

    test('merges the fonts of the screens and of the theme', () => {
        const theme = {
            components: [{ type: 'title', title: { textStyle: { fontFamily: fontB } } }],
        };
        const story = {
            theme,
            components: [{ type: 'text', text: { textStyle: { fontFamily: fontA } } }],
        };
        expect(fontsParser.parse(story)).toEqual({
            ...story,
            theme: { components: theme.components },
            fonts: [fontB, fontA],
        });
    });

    test('leaves a story without fonts unchanged', () => {
        const story = { components: [{ type: 'text', text: { body: 'a' } }] };
        expect(fontsParser.parse(story)).toBe(story);
    });
});

describe('ColorsParser without lodash shorthands', () => {
    const colorsParser = new ColorsParser({
        fieldsManager: { getDefinition: () => null },
        screensManager: {
            getDefinition: () => ({ fields: [{ name: 'background', id: 'color' }] }),
        },
    });

    test('extracts the colors of the screens, sorted and without duplicates', () => {
        const story = {
            components: [
                { type: 'text', background: { color: '#ffffff', alpha: 1 } },
                { type: 'text', background: { color: '#000', alpha: 0.5 } },
                { type: 'text', background: { color: '#FFFFFF', alpha: 1 } },
            ],
        };
        expect(colorsParser.parse(story)).toEqual([
            { color: '#000000', alpha: 0.5 },
            { color: '#FFFFFF', alpha: 1 },
        ]);
    });
});
