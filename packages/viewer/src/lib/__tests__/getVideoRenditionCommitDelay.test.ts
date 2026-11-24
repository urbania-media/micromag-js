import { describe, expect, it } from 'vitest';

import getVideoRenditionCommitDelay, {
    VIDEO_RENDITION_FRAME_TIMEOUT,
} from '../getVideoRenditionCommitDelay';

describe('getVideoRenditionCommitDelay', () => {
    it('commits at once with a measured frame', () => {
        expect(getVideoRenditionCommitDelay({ ready: true, hasSize: true })).toBe(0);
    });

    it('waits for the measured frame when the screens show without size (readyWithoutSize)', () => {
        expect(getVideoRenditionCommitDelay({ ready: true, hasSize: false })).toBe(
            VIDEO_RENDITION_FRAME_TIMEOUT,
        );
    });

    it('does not commit before the screens show', () => {
        expect(getVideoRenditionCommitDelay({ ready: false, hasSize: false })).toBeNull();
    });
});
