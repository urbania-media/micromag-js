import { afterEach, describe, expect, it, vi } from 'vitest';

describe('getVideoSupportedMimes', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.resetModules();
    });

    it('answers for each list of mimes, not only the first one asked', async () => {
        const playable = ['video/mp4', 'video/webm'];
        vi.stubGlobal('document', {
            createElement: () => ({
                canPlayType: (mime: string) => (playable.includes(mime) ? 'maybe' : ''),
            }),
        });
        const { default: getVideoSupportedMimes } = await import('../getVideoSupportedMimes');
        expect(getVideoSupportedMimes()).toEqual(['video/mp4']);
        expect(getVideoSupportedMimes(['video/webm', 'video/mp4', 'video/ogg'])).toEqual([
            'video/webm',
            'video/mp4',
        ]);
        expect(getVideoSupportedMimes(null)).toEqual(['video/mp4']);
    });
});
