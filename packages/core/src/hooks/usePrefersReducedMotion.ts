import { useSyncExternalStore } from 'react';

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

type MatchMedia = (query: string) => MediaQueryList;

function getMatchMedia(): MatchMedia | null {
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia.bind(window)
        : null;
}

/**
 * Subscribe to changes of a media query. Returns the unsubscribe function. Without `matchMedia`
 * (server, old browsers), nothing is subscribed.
 */
export function subscribeToMediaQuery(
    query: string,
    callback: () => void,
    matchMedia: MatchMedia | null = getMatchMedia(),
): () => void {
    if (matchMedia === null) {
        return () => {};
    }
    const list = matchMedia(query);
    if (typeof list.addEventListener === 'function') {
        list.addEventListener('change', callback);
        return () => list.removeEventListener('change', callback);
    }
    // Safari < 14
    list.addListener(callback);
    return () => list.removeListener(callback);
}

export function getMediaQueryMatches(
    query: string,
    matchMedia: MatchMedia | null = getMatchMedia(),
): boolean {
    return matchMedia !== null ? matchMedia(query).matches : false;
}

const subscribe = (callback: () => void) => subscribeToMediaQuery(REDUCED_MOTION_QUERY, callback);
const getSnapshot = () => getMediaQueryMatches(REDUCED_MOTION_QUERY);
const getServerSnapshot = () => false;

/**
 * Whether the reader asked the system to reduce motion. Follows live changes of the preference.
 * False on the server and where the media query is not supported, so readers without the
 * preference get the animations as before.
 */
function usePrefersReducedMotion(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default usePrefersReducedMotion;
