import { describe, expect, it } from 'vitest';

import getVideoPoster from '../getVideoPoster';

const baseMedia = {
    type: 'video',
    url: 'https://example.com/video.mp4',
    thumbnail_url: 'https://example.com/thumbnail-300x300.jpg',
    metadata: { width: 1080, height: 1920 },
};

describe('getVideoPoster', () => {
    it('prefers the full size frame thumbnails.0', () => {
        const media = {
            ...baseMedia,
            files: {
                h264: { handle: 'h264', url: 'https://example.com/video-h264.mp4' },
                'thumbnails.1': { handle: 'thumbnails.1', url: 'https://example.com/frame-1.jpg' },
                'thumbnails.0': { handle: 'thumbnails.0', url: 'https://example.com/frame-0.jpg' },
            },
        };
        expect(getVideoPoster(media)).toEqual({
            url: 'https://example.com/frame-0.jpg',
            metadata: { width: 1080, height: 1920 },
        });
    });

    it('reads files as an array, as some stories store them', () => {
        const media = {
            ...baseMedia,
            files: [{ handle: 'thumbnails.0', url: 'https://example.com/frame-0.jpg' }],
        };
        expect(getVideoPoster(media)?.url).toBe('https://example.com/frame-0.jpg');
    });

    it('uses the key as handle when a file has none', () => {
        const media = {
            ...baseMedia,
            files: { 'thumbnails.0': { url: 'https://example.com/frame-0.jpg' } },
        };
        expect(getVideoPoster(media)?.url).toBe('https://example.com/frame-0.jpg');
    });

    it('falls back to the single thumbnails file of older medias', () => {
        const media = {
            ...baseMedia,
            files: { thumbnails: { handle: 'thumbnails', url: 'https://example.com/frame.jpg' } },
        };
        expect(getVideoPoster(media)?.url).toBe('https://example.com/frame.jpg');
    });

    it('falls back to thumbnail_url without frame files', () => {
        expect(getVideoPoster({ ...baseMedia, files: { h264: { url: 'x.mp4' } } })?.url).toBe(
            'https://example.com/thumbnail-300x300.jpg',
        );
        expect(getVideoPoster(baseMedia)?.url).toBe('https://example.com/thumbnail-300x300.jpg');
    });

    it('skips frame files without url', () => {
        const media = {
            ...baseMedia,
            files: { 'thumbnails.0': { handle: 'thumbnails.0', url: null } },
        };
        expect(getVideoPoster(media)?.url).toBe('https://example.com/thumbnail-300x300.jpg');
    });

    it('returns null without any image', () => {
        expect(getVideoPoster(null)).toBeNull();
        expect(getVideoPoster({ type: 'video', url: 'x.mp4' })).toBeNull();
        expect(getVideoPoster({ type: 'video', url: 'x.mp4', thumbnail_url: '' })).toBeNull();
    });

    it('uses an explicit thumbnail first: an image or the handle of a file', () => {
        const media = {
            ...baseMedia,
            files: {
                'thumbnails.0': { handle: 'thumbnails.0', url: 'https://example.com/frame-0.jpg' },
                'thumbnails.2': { handle: 'thumbnails.2', url: 'https://example.com/frame-2.jpg' },
            },
        };
        const image = {
            url: 'https://example.com/custom.jpg',
            metadata: { width: 10, height: 10 },
        };
        expect(getVideoPoster(media, image)).toBe(image);
        expect(getVideoPoster(media, 'thumbnails.2')?.url).toBe('https://example.com/frame-2.jpg');
        expect(getVideoPoster(media, 'missing')?.url).toBe('https://example.com/frame-0.jpg');
        expect(getVideoPoster(media, { url: null })?.url).toBe('https://example.com/frame-0.jpg');
    });
});
