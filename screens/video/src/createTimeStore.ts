export interface TimeStore {
    get: () => number | null;
    set: (time: number | null) => void;
    subscribe: (listener: () => void) => () => void;
}

/**
 * Holds the current time of the video outside of React state, for `useSyncExternalStore`: only
 * the components that read it render again at each `timeupdate`, not the whole screen.
 */
export default function createTimeStore(initialTime: number | null = null): TimeStore {
    let time = initialTime;
    const listeners = new Set<() => void>();
    return {
        get: () => time,
        set: (newTime) => {
            if (newTime === time) {
                return;
            }
            time = newTime;
            listeners.forEach((listener) => listener());
        },
        subscribe: (listener) => {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
    };
}
