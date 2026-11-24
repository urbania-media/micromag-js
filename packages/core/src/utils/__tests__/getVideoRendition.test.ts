import { afterEach, describe, expect, it, vi } from 'vitest';

import getVideoRendition, {
    VIDEO_RENDITION_RULES,
    getVideoRenditionFile,
    getVideoRenditionPreloads,
} from '../getVideoRendition';

const goodConnection = { effectiveType: '4g', saveData: false };

describe('getVideoRendition', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('keeps the rendering forced by the host', () => {
        expect(
            getVideoRendition({ setting: 'h264', width: 390, connection: { saveData: true } }),
        ).toBe('h264');
        expect(getVideoRendition({ setting: 'h264_720', width: 1920, devicePixelRatio: 2 })).toBe(
            'h264_720',
        );
    });

    it('takes the 720p rendering on a slow or save-data connection, whatever the frame', () => {
        ['slow-2g', '2g', '3g'].forEach((effectiveType) => {
            expect(
                getVideoRendition({
                    width: 1200,
                    devicePixelRatio: 2,
                    connection: { effectiveType },
                }),
            ).toBe('h264_720');
        });
        expect(
            getVideoRendition({
                width: 1200,
                devicePixelRatio: 2,
                connection: { effectiveType: '4g', saveData: true },
            }),
        ).toBe('h264_720');
    });

    it('takes the 720p rendering on a phone frame, whatever the pixel ratio', () => {
        expect(VIDEO_RENDITION_RULES.maxPhoneFrameWidth).toBe(430);
        expect(
            getVideoRendition({ width: 390, devicePixelRatio: 3, connection: goodConnection }),
        ).toBe('h264_720');
        expect(
            getVideoRendition({ width: 430, devicePixelRatio: 3, connection: goodConnection }),
        ).toBe('h264_720');
    });

    it('takes the 720p rendering up to 800 device pixels, h264 above', () => {
        expect(
            getVideoRendition({ width: 600, devicePixelRatio: 1, connection: goodConnection }),
        ).toBe('h264_720');
        expect(
            getVideoRendition({ width: 800, devicePixelRatio: 1, connection: goodConnection }),
        ).toBe('h264_720');
        expect(
            getVideoRendition({ width: 600, devicePixelRatio: 2, connection: goodConnection }),
        ).toBe('h264');
        expect(
            getVideoRendition({ width: 801, devicePixelRatio: 1, connection: goodConnection }),
        ).toBe('h264');
        // Unknown connection (Safari, Firefox): the width alone decides
        expect(getVideoRendition({ width: 600, devicePixelRatio: 2, connection: null })).toBe(
            'h264',
        );
        expect(getVideoRendition({ width: 390, devicePixelRatio: 3, connection: null })).toBe(
            'h264_720',
        );
    });

    it('reads the window and the connection of the browser by default', () => {
        vi.stubGlobal('window', { innerWidth: 390, devicePixelRatio: 3 });
        vi.stubGlobal('navigator', { connection: { effectiveType: '4g' } });
        expect(getVideoRendition()).toBe('h264_720');
        expect(getVideoRendition({ setting: 'auto' })).toBe('h264_720');
        vi.stubGlobal('window', { innerWidth: 1440, devicePixelRatio: 2 });
        expect(getVideoRendition({ setting: 'auto' })).toBe('h264');
        vi.stubGlobal('navigator', { connection: { effectiveType: '3g' } });
        expect(getVideoRendition()).toBe('h264_720');
    });

    it('answers h264 without a known width (server)', () => {
        vi.stubGlobal('window', undefined);
        vi.stubGlobal('navigator', undefined);
        expect(getVideoRendition()).toBe('h264');
        expect(getVideoRendition({ setting: 'auto' })).toBe('h264');
        expect(getVideoRendition({ setting: 'h264_720' })).toBe('h264_720');
    });
});

describe('getVideoRenditionFile', () => {
    const h264 = { id: '1001', mime: 'video/mp4', url: 'video-h264.mp4', size: 2000 };
    const h264720 = { id: '1002', mime: 'video/mp4', url: 'video-h264_720.mp4', size: 1000 };

    it('finds the rendering in the files of a media, as an object or an array', () => {
        const files = { original: { url: 'original.mp4' }, h264, h264_720: h264720 };
        expect(getVideoRenditionFile(files, 'h264')?.url).toBe('video-h264.mp4');
        expect(getVideoRenditionFile(files, 'h264_720')?.url).toBe('video-h264_720.mp4');
        expect(getVideoRenditionFile(files)?.url).toBe('video-h264.mp4');
        expect(
            getVideoRenditionFile(
                [
                    { handle: 'h264', ...h264 },
                    { handle: 'h264_720', ...h264720 },
                ],
                'h264_720',
            )?.url,
        ).toBe('video-h264_720.mp4');
    });

    it('falls back to the other rendering, then to nothing', () => {
        expect(getVideoRenditionFile({ h264 }, 'h264_720')?.url).toBe('video-h264.mp4');
        expect(getVideoRenditionFile({ h264_720: h264720 }, 'h264')?.url).toBe(
            'video-h264_720.mp4',
        );
        expect(getVideoRenditionFile({ original: { url: 'original.mp4' } }, 'h264')).toBeNull();
        expect(getVideoRenditionFile(null, 'h264')).toBeNull();
    });
});

describe('getVideoRenditionPreloads', () => {
    const h264 = { mime: 'video/mp4', url: 'video-h264.mp4' };
    const h264720 = { mime: 'video/mp4', url: 'video-h264_720.mp4' };

    it('gives the 720p file to phone windows and the 1080p file above, as step 3 of the rule', () => {
        expect(
            getVideoRenditionPreloads({
                original: { url: 'original.mp4' },
                h264,
                h264_720: h264720,
            }),
        ).toEqual([
            { rendition: 'h264_720', url: 'video-h264_720.mp4', media: '(max-width: 430px)' },
            { rendition: 'h264', url: 'video-h264.mp4', media: '(min-width: 431px)' },
        ]);
    });

    it('gives one link for every window with a single rendering, none without', () => {
        expect(getVideoRenditionPreloads({ h264 })).toEqual([
            { rendition: 'h264', url: 'video-h264.mp4', media: null },
        ]);
        expect(getVideoRenditionPreloads([{ handle: 'h264_720', ...h264720 }])).toEqual([
            { rendition: 'h264_720', url: 'video-h264_720.mp4', media: null },
        ]);
        expect(getVideoRenditionPreloads({ original: { url: 'original.mp4' } })).toEqual([]);
        expect(getVideoRenditionPreloads(null)).toEqual([]);
    });
});
