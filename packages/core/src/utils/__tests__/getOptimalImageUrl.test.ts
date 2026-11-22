import { describe, expect, test } from 'vitest';

import getOptimalImageUrl from '../getOptimalImageUrl';

// Same shape as the image medias stored in stories: the original and three resized files
const portrait = {
    type: 'image',
    url: 'https://cdn.test/original.jpg',
    webp_url: 'https://cdn.test/original.webp',
    metadata: { width: 1080, height: 1920 },
    sizes: {
        large: {
            url: 'https://cdn.test/large.jpg',
            webp_url: 'https://cdn.test/large.webp',
            width: 788,
            height: 1400,
        },
        medium: {
            url: 'https://cdn.test/medium.jpg',
            webp_url: 'https://cdn.test/medium.webp',
            width: 563,
            height: 1000,
        },
        small: {
            url: 'https://cdn.test/small.jpg',
            webp_url: 'https://cdn.test/small.webp',
            width: 338,
            height: 600,
        },
    },
};

// A 375 px wide phone shows the 320 px wide screen scaled by 375 / 320; the viewer caps the device
// pixel ratio at 2 (see useScreenSize)
const scale = 375 / 320;
const getResolution = (devicePixelRatio: number) => scale * Math.min(devicePixelRatio, 2);

describe('getOptimalImageUrl', () => {
    test('returns the media URL when the media has no sizes, as before', () => {
        const media = { url: 'https://cdn.test/a.jpg', metadata: { width: 2000, height: 2000 } };
        expect(getOptimalImageUrl(media, 100, 100)).toBe('https://cdn.test/a.jpg');
        expect(getOptimalImageUrl({ ...media, sizes: null }, 100, 100)).toBe(
            'https://cdn.test/a.jpg',
        );
        expect(
            getOptimalImageUrl({ ...media, webp_url: 'https://cdn.test/a.webp' }, 100, 100, {
                supportsWebp: true,
            }),
        ).toBe('https://cdn.test/a.webp');
    });

    test('returns the media URL without a container size or a media', () => {
        expect(getOptimalImageUrl(portrait)).toBe(portrait.url);
        expect(getOptimalImageUrl(portrait, null, null)).toBe(portrait.url);
        expect(getOptimalImageUrl(null, 100, 100)).toBeNull();
    });

    test('picks the smallest size that covers the rendered size', () => {
        expect(getOptimalImageUrl(portrait, 100, 150)).toBe('https://cdn.test/small.jpg');
        expect(getOptimalImageUrl(portrait, 400, 700)).toBe('https://cdn.test/medium.jpg');
        expect(getOptimalImageUrl(portrait, 600, 1200)).toBe('https://cdn.test/large.jpg');
        expect(getOptimalImageUrl(portrait, 1000, 1800)).toBe('https://cdn.test/original.jpg');
    });

    test('multiplies the container size by the resolution', () => {
        expect(getOptimalImageUrl(portrait, 200, 300, { resolution: 1 })).toBe(
            'https://cdn.test/small.jpg',
        );
        expect(getOptimalImageUrl(portrait, 200, 300, { resolution: 2 })).toBe(
            'https://cdn.test/medium.jpg',
        );
        expect(getOptimalImageUrl(portrait, 200, 300, { resolution: 3 })).toBe(
            'https://cdn.test/large.jpg',
        );
    });

    test.each([
        [1, 'https://cdn.test/medium.jpg'],
        [2, 'https://cdn.test/large.jpg'],
        [3, 'https://cdn.test/large.jpg'],
    ])(
        'full screen background on a 375 px wide phone at %ix: smallest covering size',
        (devicePixelRatio, expected) => {
            // 320 x 568 screen
            expect(
                getOptimalImageUrl(portrait, 320, 568, {
                    resolution: getResolution(devicePixelRatio),
                }),
            ).toBe(expected);
        },
    );

    test.each([
        [1, 'https://cdn.test/small.jpg'],
        [2, 'https://cdn.test/medium.jpg'],
        [3, 'https://cdn.test/medium.jpg'],
    ])('image half the screen wide on a 375 px wide phone at %ix', (devicePixelRatio, expected) => {
        // 160 x 284 rendered
        expect(
            getOptimalImageUrl(portrait, 160, 284, {
                resolution: getResolution(devicePixelRatio),
            }),
        ).toBe(expected);
    });

    test('uses the WebP file of the chosen size when supported', () => {
        expect(getOptimalImageUrl(portrait, 400, 700, { supportsWebp: true })).toBe(
            'https://cdn.test/medium.webp',
        );
        const withoutWebp = {
            ...portrait,
            sizes: { small: { url: 'https://cdn.test/small.jpg', width: 338, height: 600 } },
        };
        expect(getOptimalImageUrl(withoutWebp, 100, 150, { supportsWebp: true })).toBe(
            'https://cdn.test/small.jpg',
        );
    });

    test('picks the largest file when none covers the rendered size', () => {
        expect(getOptimalImageUrl(portrait, 2000, 4000)).toBe('https://cdn.test/original.jpg');
        const withoutOriginalSize = { ...portrait, metadata: {} };
        // The original size is unknown: it is the largest file we can expect
        expect(getOptimalImageUrl(withoutOriginalSize, 2000, 4000)).toBe(
            'https://cdn.test/original.jpg',
        );
        // A covering size is still preferred over an original of unknown size
        expect(getOptimalImageUrl(withoutOriginalSize, 100, 150)).toBe(
            'https://cdn.test/small.jpg',
        );
    });

    test('prefers a resized file over an original of the same size', () => {
        const square = {
            url: 'https://cdn.test/original.png',
            metadata: { width: 300, height: 300 },
            sizes: {
                large: { url: 'https://cdn.test/large.png', width: 300, height: 300 },
                small: { url: 'https://cdn.test/small.png', width: 300, height: 300 },
            },
        };
        expect(getOptimalImageUrl(square, 600, 600)).toBe('https://cdn.test/large.png');
        expect(getOptimalImageUrl(square, 100, 100)).toBe('https://cdn.test/large.png');
    });

    test('compares only the known dimension when the container has one', () => {
        expect(getOptimalImageUrl(portrait, 500, null)).toBe('https://cdn.test/medium.jpg');
        expect(getOptimalImageUrl(portrait, null, 1100)).toBe('https://cdn.test/large.jpg');
    });

    test('ignores sizes without a URL or dimensions and tolerates a null metadata', () => {
        const media = {
            url: 'https://cdn.test/original.jpg',
            metadata: null,
            sizes: {
                broken: { url: null, width: 100, height: 100 },
                unknown: { url: 'https://cdn.test/unknown.jpg' },
                small: { url: 'https://cdn.test/small.jpg', width: 400, height: 400 },
            },
        };
        expect(getOptimalImageUrl(media, 50, 50)).toBe('https://cdn.test/small.jpg');
    });
});
