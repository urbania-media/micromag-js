import { describe, expect, test, vi } from 'vitest';

import createGoogleMapsLoader from '../createGoogleMapsLoader';

const deferred = <T>() => {
    let resolve: (value: T) => void = () => {};
    let reject: (reason: unknown) => void = () => {};
    const promise = new Promise<T>((promiseResolve, promiseReject) => {
        resolve = promiseResolve;
        reject = promiseReject;
    });
    return { promise, resolve, reject };
};

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('createGoogleMapsLoader', () => {
    test('loads nothing until a consumer asks for it', async () => {
        const load = vi.fn(() => Promise.resolve({ maps: {} }));
        const loader = createGoogleMapsLoader(load);
        const listener = vi.fn();
        loader.subscribe(listener);
        await flush();
        expect(load).not.toHaveBeenCalled();
        expect(loader.getStatus()).toBe('idle');
        expect(loader.getClient()).toBeNull();
        expect(listener).not.toHaveBeenCalled();
    });

    test('loads once for several consumers asking at the same time', async () => {
        const client = { maps: {} };
        const { promise, resolve } = deferred<typeof client>();
        const load = vi.fn(() => promise);
        const loader = createGoogleMapsLoader(load);
        const listener = vi.fn();
        loader.subscribe(listener);

        const options = { apiKey: 'test-key', locale: 'en', libraries: ['places'] };
        loader.request(options);
        loader.request(options);
        loader.request();
        expect(load).toHaveBeenCalledTimes(1);
        expect(load).toHaveBeenCalledWith(options);
        expect(loader.getStatus()).toBe('loading');

        resolve(client);
        await flush();
        expect(loader.getClient()).toBe(client);
        expect(loader.getStatus()).toBe('loaded');
        expect(listener).toHaveBeenCalledTimes(1);

        // Consumers mounting later get the loaded client without a new load
        loader.request(options);
        expect(load).toHaveBeenCalledTimes(1);
    });

    test('stops notifying unsubscribed listeners', async () => {
        const loader = createGoogleMapsLoader(() => Promise.resolve({ maps: {} }));
        const listener = vi.fn();
        const unsubscribe = loader.subscribe(listener);
        unsubscribe();
        loader.request();
        await flush();
        expect(listener).not.toHaveBeenCalled();
        expect(loader.getStatus()).toBe('loaded');
    });

    test('a failed load leaves the client null and can be retried', async () => {
        const client = { maps: {} };
        const error = new Error('network');
        const load = vi
            .fn<() => Promise<typeof client | null>>()
            .mockReturnValueOnce(Promise.reject(error))
            .mockReturnValueOnce(Promise.resolve(client));
        const loader = createGoogleMapsLoader(load);
        const listener = vi.fn();
        loader.subscribe(listener);

        loader.request();
        await flush();
        expect(loader.getStatus()).toBe('error');
        expect(loader.getError()).toBe(error);
        expect(loader.getClient()).toBeNull();
        expect(listener).toHaveBeenCalledTimes(1);

        loader.request();
        await flush();
        expect(load).toHaveBeenCalledTimes(2);
        expect(loader.getStatus()).toBe('loaded');
        expect(loader.getClient()).toBe(client);
    });

    test('treats a loader that throws or resolves without a client as an error', async () => {
        const throwing = createGoogleMapsLoader(() => {
            throw new Error('no document');
        });
        throwing.request();
        expect(throwing.getStatus()).toBe('error');

        const empty = createGoogleMapsLoader(() => Promise.resolve(null));
        empty.request();
        await flush();
        expect(empty.getStatus()).toBe('error');
        expect(empty.getClient()).toBeNull();
    });
});
