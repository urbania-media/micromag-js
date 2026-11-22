import { describe, expect, it } from 'vitest';

import { getFrameStats } from '../TransitionMeasure';

describe('getFrameStats', () => {
    it('returns null without frames', () => {
        expect(getFrameStats([])).toBeNull();
    });

    it('counts no dropped frame at a steady 60 Hz', () => {
        const stats = getFrameStats(Array(30).fill(16.7));
        expect(stats).toMatchObject({ count: 31, dropped: 0, interval: 16.7 });
    });

    it('is not fooled by a near-duplicate frame', () => {
        const stats = getFrameStats([...Array(30).fill(16.7), 2]);
        expect(stats?.dropped).toBe(0);
        expect(stats?.interval).toBe(16.7);
    });

    it('counts the frames missed in long gaps', () => {
        const stats = getFrameStats([...Array(30).fill(16.7), 83.5, 50]);
        expect(stats?.dropped).toBe(4 + 2);
        expect(stats?.maxGap).toBe(83.5);
    });

    it('uses the display interval at 120 Hz', () => {
        const stats = getFrameStats([...Array(60).fill(8.3), 16.6]);
        expect(stats?.interval).toBe(8.3);
        expect(stats?.dropped).toBe(1);
    });
});
