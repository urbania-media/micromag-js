import { describe, expect, it, vi } from 'vitest';

import createTimeStore from '../createTimeStore';

describe('createTimeStore', () => {
    it('starts with the initial time', () => {
        expect(createTimeStore().get()).toBe(null);
        expect(createTimeStore(2).get()).toBe(2);
    });

    it('notifies the listeners when the time changes', () => {
        const store = createTimeStore();
        const listener = vi.fn();
        store.subscribe(listener);
        store.set(1.5);
        expect(store.get()).toBe(1.5);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it('does not notify when the time is the same', () => {
        const store = createTimeStore(1);
        const listener = vi.fn();
        store.subscribe(listener);
        store.set(1);
        expect(listener).not.toHaveBeenCalled();
    });

    it('stops notifying after unsubscribe', () => {
        const store = createTimeStore();
        const listener = vi.fn();
        const unsubscribe = store.subscribe(listener);
        unsubscribe();
        store.set(3);
        expect(listener).not.toHaveBeenCalled();
    });
});
