import { describe, expect, it } from 'vitest';

import { getMediaPlayingOnTimeUpdate } from '../useMediaState';

describe('getMediaPlayingOnTimeUpdate', () => {
    it('is playing when the media plays', () => {
        expect(getMediaPlayingOnTimeUpdate({ paused: false })).toBe(true);
    });

    it('is not playing when a paused media sends timeupdate (seek to the first frame, refused autoplay)', () => {
        expect(getMediaPlayingOnTimeUpdate({ paused: true })).toBe(false);
    });
});
