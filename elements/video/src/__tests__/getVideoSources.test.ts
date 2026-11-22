import { describe, expect, it } from 'vitest';

import getVideoSources, { DEFAULT_VIDEO_MIMES, getFileMime } from '../getVideoSources';

const files = [
    { handle: 'original', mime: 'video/mp4', url: 'original.mp4', size: 9000 },
    { handle: 'webm', mime: 'video/webm', url: 'video.webm', size: 1000 },
    { handle: 'h264', mime: 'video/mp4', url: 'video-h264.mp4', size: 2000 },
    { handle: 'thumbnails.0', mime: 'image/jpeg', url: 'frame-0.jpg', size: 100 },
];

describe('getVideoSources', () => {
    it('chooses h264 mp4 by default, even when a smaller webm exists', () => {
        expect(DEFAULT_VIDEO_MIMES).toEqual(['video/mp4']);
        expect(getVideoSources(files)?.map(({ url }) => url)).toEqual(['video-h264.mp4']);
        expect(getVideoSources(files, null)?.map(({ url }) => url)).toEqual(['video-h264.mp4']);
        expect(getVideoSources(files, [])?.map(({ url }) => url)).toEqual(['video-h264.mp4']);
    });

    it('keeps webm when the host opts in, smallest file first', () => {
        expect(getVideoSources(files, ['video/webm', 'video/mp4'])?.map(({ url }) => url)).toEqual([
            'video.webm',
            'video-h264.mp4',
        ]);
    });

    it('guesses the mime from the handle of files without mime', () => {
        expect(getFileMime({ handle: 'h264' })).toBe('video/mp4');
        expect(getFileMime({ id: 'webm' })).toBe('video/webm');
        expect(
            getVideoSources([
                { handle: 'webm', url: 'video.webm' },
                { handle: 'h264', url: 'video-h264.mp4' },
            ])?.map(({ url }) => url),
        ).toEqual(['video-h264.mp4']);
    });

    it('uses the original file when it is the only playable one', () => {
        expect(
            getVideoSources([
                { handle: 'original', mime: 'video/mp4', url: 'original.mp4' },
                { handle: 'webm', mime: 'video/webm', url: 'video.webm' },
            ])?.map(({ url }) => url),
        ).toEqual(['original.mp4']);
    });

    it('returns null without playable files', () => {
        expect(getVideoSources(null)).toBeNull();
        expect(getVideoSources([])).toBeNull();
        expect(
            getVideoSources([{ handle: 'webm', mime: 'video/webm', url: 'video.webm' }]),
        ).toBeNull();
        // An animated gif: the viewer then shows the original image
        expect(
            getVideoSources([{ handle: 'original', mime: 'image/gif', url: 'image.gif' }]),
        ).toBeNull();
    });
});
