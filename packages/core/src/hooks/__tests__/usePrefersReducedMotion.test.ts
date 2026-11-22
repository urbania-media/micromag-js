import { describe, expect, it, vi } from 'vitest';

import {
    REDUCED_MOTION_QUERY,
    getMediaQueryMatches,
    subscribeToMediaQuery,
} from '../usePrefersReducedMotion';

function createMatchMedia(initial: boolean, { legacy = false } = {}) {
    const listeners = new Set<() => void>();
    const list = {
        matches: initial,
        ...(legacy
            ? {
                  addListener: (cb: () => void) => listeners.add(cb),
                  removeListener: (cb: () => void) => listeners.delete(cb),
              }
            : {
                  addEventListener: (_: string, cb: () => void) => listeners.add(cb),
                  removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
              }),
    };
    const matchMedia = vi.fn(() => list as unknown as MediaQueryList);
    const change = (matches: boolean) => {
        list.matches = matches;
        listeners.forEach((cb) => cb());
    };
    return { matchMedia, change, listeners };
}

describe('usePrefersReducedMotion helpers', () => {
    it('is false without matchMedia (server, old browsers)', () => {
        expect(getMediaQueryMatches(REDUCED_MOTION_QUERY, null)).toBe(false);
        expect(subscribeToMediaQuery(REDUCED_MOTION_QUERY, () => {}, null)).toBeTypeOf('function');
    });

    it('reads the current preference', () => {
        const { matchMedia } = createMatchMedia(true);
        expect(getMediaQueryMatches(REDUCED_MOTION_QUERY, matchMedia)).toBe(true);
        expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    });

    it('follows live changes and unsubscribes', () => {
        const { matchMedia, change, listeners } = createMatchMedia(false);
        const callback = vi.fn();
        const unsubscribe = subscribeToMediaQuery(REDUCED_MOTION_QUERY, callback, matchMedia);
        change(true);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(getMediaQueryMatches(REDUCED_MOTION_QUERY, matchMedia)).toBe(true);
        unsubscribe();
        expect(listeners.size).toBe(0);
        change(false);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('supports the legacy addListener API', () => {
        const { matchMedia, change, listeners } = createMatchMedia(false, { legacy: true });
        const callback = vi.fn();
        const unsubscribe = subscribeToMediaQuery(REDUCED_MOTION_QUERY, callback, matchMedia);
        change(true);
        expect(callback).toHaveBeenCalledTimes(1);
        unsubscribe();
        expect(listeners.size).toBe(0);
    });
});
