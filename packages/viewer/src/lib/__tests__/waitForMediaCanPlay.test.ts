import { describe, expect, it, vi } from 'vitest';

import waitForMediaCanPlay from '../waitForMediaCanPlay';

function createMedia(readyState = 0) {
    const listeners = new Map<string, Set<() => void>>();
    return {
        readyState,
        addEventListener: (type: string, listener: () => void) => {
            listeners.set(type, (listeners.get(type) || new Set()).add(listener));
        },
        removeEventListener: (type: string, listener: () => void) => {
            listeners.get(type)?.delete(listener);
        },
        emit: (type: string) => {
            [...(listeners.get(type) || [])].forEach((listener) => listener());
        },
        listenersCount: () => [...listeners.values()].reduce((total, set) => total + set.size, 0),
    };
}

describe('waitForMediaCanPlay', () => {
    it('is ready right away without a media', () => {
        const onReady = vi.fn();
        waitForMediaCanPlay(null, { timeout: 2000, onReady });
        expect(onReady).toHaveBeenCalledTimes(1);
    });

    it('is ready right away when the media can already play', () => {
        const onReady = vi.fn();
        waitForMediaCanPlay(createMedia(3), { timeout: 2000, onReady });
        expect(onReady).toHaveBeenCalledTimes(1);
    });

    it('waits for canplay, once, and removes its listeners', () => {
        vi.useFakeTimers();
        const media = createMedia(1);
        const onReady = vi.fn();
        waitForMediaCanPlay(media, { timeout: 2000, onReady });
        expect(onReady).not.toHaveBeenCalled();
        media.emit('canplay');
        media.emit('playing');
        vi.advanceTimersByTime(5000);
        expect(onReady).toHaveBeenCalledTimes(1);
        expect(media.listenersCount()).toBe(0);
        vi.useRealTimers();
    });

    it('is ready after the timeout when the media never plays', () => {
        vi.useFakeTimers();
        const media = createMedia(0);
        const onReady = vi.fn();
        waitForMediaCanPlay(media, { timeout: 2000, onReady });
        vi.advanceTimersByTime(1999);
        expect(onReady).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);
        expect(onReady).toHaveBeenCalledTimes(1);
        expect(media.listenersCount()).toBe(0);
        vi.useRealTimers();
    });

    it('does nothing once cancelled', () => {
        vi.useFakeTimers();
        const media = createMedia(0);
        const onReady = vi.fn();
        const cancel = waitForMediaCanPlay(media, { timeout: 2000, onReady });
        cancel();
        media.emit('canplay');
        vi.advanceTimersByTime(5000);
        expect(onReady).not.toHaveBeenCalled();
        expect(media.listenersCount()).toBe(0);
        vi.useRealTimers();
    });
});
