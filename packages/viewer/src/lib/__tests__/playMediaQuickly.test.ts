import { describe, expect, it } from 'vitest';

import playMediaQuickly from '../playMediaQuickly';

const createMedia = (muted: boolean) => {
    const calls: string[] = [];
    const media = {
        muted,
        play: () => {
            calls.push(`play muted=${media.muted}`);
            return Promise.resolve();
        },
    };
    return { media, calls };
};

const createFrames = () => {
    const callbacks: (() => void)[] = [];
    return {
        requestFrame: (callback: () => void) => callbacks.push(callback),
        next: () => callbacks.splice(0).forEach((callback) => callback()),
    };
};

describe('playMediaQuickly', () => {
    it('plays a media with sound muted, and gives it back its sound two frames later', () => {
        const { media, calls } = createMedia(false);
        const frames = createFrames();
        playMediaQuickly(media, frames.requestFrame);
        expect(calls).toEqual(['play muted=true']);
        expect(media.muted).toBe(true);
        frames.next();
        expect(media.muted).toBe(true);
        frames.next();
        expect(media.muted).toBe(false);
    });

    it('plays a muted media as is, and keeps it muted', () => {
        const { media, calls } = createMedia(true);
        const frames = createFrames();
        playMediaQuickly(media, frames.requestFrame);
        frames.next();
        frames.next();
        expect(calls).toEqual(['play muted=true']);
        expect(media.muted).toBe(true);
    });
});
