export type GoogleMapsLoaderStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface GoogleMapsLoaderOptions {
    apiKey?: string | null;
    locale?: string | null;
    libraries?: string[] | null;
}

export interface GoogleMapsLoader<T = unknown> {
    request: (options?: GoogleMapsLoaderOptions) => void;
    getClient: () => T | null;
    getStatus: () => GoogleMapsLoaderStatus;
    getError: () => unknown;
    subscribe: (listener: () => void) => () => void;
}

/**
 * Holds the Google Maps client of one provider and loads it only when something asks for it.
 *
 * - Nothing is loaded until `request()` is called.
 * - Several `request()` calls while loading or once loaded start a single load.
 * - A failed load leaves the client `null` and goes back to a state where a later `request()`
 *   (ex.: a map screen mounting again) can try again.
 */
export default function createGoogleMapsLoader<T = unknown>(
    load: (options: GoogleMapsLoaderOptions) => Promise<T | null>,
): GoogleMapsLoader<T> {
    let client: T | null = null;
    let status: GoogleMapsLoaderStatus = 'idle';
    let error: unknown = null;
    const listeners = new Set<() => void>();

    const notify = () => {
        listeners.forEach((listener) => listener());
    };

    const onError = (loadError: unknown) => {
        status = 'error';
        error = loadError;
        notify();
    };

    const request = (options: GoogleMapsLoaderOptions = {}) => {
        if (status === 'loading' || status === 'loaded') {
            return;
        }
        status = 'loading';
        error = null;
        let promise: Promise<T | null>;
        try {
            promise = load(options);
        } catch (loadError) {
            onError(loadError);
            return;
        }
        promise.then((newClient) => {
            if (newClient === null || typeof newClient === 'undefined') {
                onError(new Error('Google Maps did not load'));
                return;
            }
            client = newClient;
            status = 'loaded';
            notify();
        }, onError);
    };

    return {
        request,
        getClient: () => client,
        getStatus: () => status,
        getError: () => error,
        subscribe: (listener) => {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
    };
}
