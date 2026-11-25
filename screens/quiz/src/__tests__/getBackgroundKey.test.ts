import { describe, expect, it } from 'vitest';

import getBackgroundKey from '../getBackgroundKey';

const video = (id: string) => ({
    id,
    type: 'video',
    url: `https://example.com/${id}.mp4`,
    metadata: { width: 1080, height: 1920 },
});

describe('getBackgroundKey', () => {
    it('gives the same key to backgrounds that show the same video, as different objects', () => {
        // Each question of a quiz has its own background object, built from the same media
        expect(getBackgroundKey({ video: video('1'), loop: true })).toBe(
            getBackgroundKey({ video: video('1'), loop: true }),
        );
    });

    it('gives different keys to backgrounds that show something else', () => {
        const key = getBackgroundKey({ video: video('1'), loop: true });
        expect(getBackgroundKey({ video: video('2'), loop: true })).not.toBe(key);
        expect(getBackgroundKey({ video: video('1'), loop: false })).not.toBe(key);
        expect(getBackgroundKey({ color: { color: '#000', alpha: 1 } })).not.toBe(key);
    });

    it('gives one key to a missing background', () => {
        expect(getBackgroundKey(null)).toBe(getBackgroundKey(undefined));
        expect(getBackgroundKey(null)).not.toBe(getBackgroundKey({ video: video('1') }));
    });
});
