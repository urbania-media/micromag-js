import { describe, expect, test } from 'vitest';

import getGoogleFontsUrl from '../getGoogleFontsUrl';

describe('getGoogleFontsUrl', () => {
    test('returns null without Google fonts', () => {
        expect(getGoogleFontsUrl(null)).toBeNull();
        expect(getGoogleFontsUrl([])).toBeNull();
        expect(
            getGoogleFontsUrl([
                'Arial',
                { type: 'system', name: 'Georgia' },
                { type: 'custom', name: 'X' },
            ]),
        ).toBeNull();
    });

    test('builds the same family list as webfontloader, with font-display swap', () => {
        expect(
            getGoogleFontsUrl([
                { type: 'google', name: 'Roboto', variants: ['regular', 'italic', '700'] },
                { type: 'google', name: 'Open Sans' },
                { type: 'custom', name: 'Custom' },
            ]),
        ).toBe(
            'https://fonts.googleapis.com/css?family=Roboto:regular,italic,700%7COpen+Sans&display=swap',
        );
    });

    test('dedupes families and ignores invalid variants', () => {
        expect(
            getGoogleFontsUrl([
                {
                    type: 'google',
                    name: 'Gabarito',
                    variants: ['regular', null, { weight: 700 }, 500],
                },
                { type: 'google', name: 'Gabarito', variants: ['regular', 500] },
                { type: 'google', name: '' },
            ]),
        ).toBe('https://fonts.googleapis.com/css?family=Gabarito:regular,500&display=swap');
    });

    test('accepts another display value or none', () => {
        const fonts = [{ type: 'google', name: 'Roboto' }];
        expect(getGoogleFontsUrl(fonts, { display: 'fallback' })).toBe(
            'https://fonts.googleapis.com/css?family=Roboto&display=fallback',
        );
        expect(getGoogleFontsUrl(fonts, { display: null })).toBe(
            'https://fonts.googleapis.com/css?family=Roboto',
        );
    });
});
