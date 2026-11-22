import { describe, expect, it } from 'vitest';

import getNextMediaProgress from '../getNextMediaProgress';

describe('getNextMediaProgress', () => {
    it('reads the media time at the start', () => {
        expect(
            getNextMediaProgress({
                progress: 0.05,
                elapsed: 1,
                duration: 10,
                currentTime: 0.8,
                mediaDuration: 10,
            }),
        ).toBeCloseTo(0.08);
    });

    it('advances by the elapsed time afterwards', () => {
        expect(
            getNextMediaProgress({
                progress: 0.5,
                elapsed: 0.016,
                duration: 8,
                currentTime: 3,
                mediaDuration: 8,
            }),
        ).toBeCloseTo(0.502);
    });
});
