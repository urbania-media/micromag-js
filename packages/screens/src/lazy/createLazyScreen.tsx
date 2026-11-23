import React, { ElementType, Suspense, use } from 'react';

import type { ScreenDefinition } from '@micromag/core';

export interface LazyScreenOptions {
    /**
     * After a failed load, one more attempt after this delay (ms). The next attempts are up to the
     * viewer (when the reader gets to the screen or next to it).
     */
    retryDelay?: number;
}

/**
 * A screen definition whose component is loaded on demand: `load()` starts loading it, and the
 * component renders nothing until it is loaded. The viewer loads the screens of the story when it
 * mounts and waits for them before it changes screen, so a reader never sees a screen loading.
 *
 * When the load fails, the screen is "settled" all the same (`hasFailed()`): its component throws
 * the error, which the error boundary of the viewer shows, and the viewer doesn't wait for it. The
 * next call to `load()` tries again, and the listeners of `onSettled` are called after each
 * attempt, so that the viewer renders the screen again once it is loaded.
 */
export default function createLazyScreen(
    id: string,
    loader: () => Promise<ElementType>,
    { retryDelay = 3000 }: LazyScreenOptions = {},
): ScreenDefinition {
    let component: ElementType | null = null;
    let error: Error | null = null;
    let promise: Promise<ElementType> | null = null;
    let failures = 0;
    const listeners = new Set<() => void>();
    const notify = () => listeners.forEach((listener) => listener());

    const load = (): Promise<ElementType> => {
        if (component !== null) {
            return Promise.resolve(component);
        }
        if (promise === null) {
            promise = loader().then(
                (loadedComponent) => {
                    component = loadedComponent;
                    error = null;
                    failures = 0;
                    promise = null;
                    notify();
                    return loadedComponent;
                },
                (loadError) => {
                    error = loadError instanceof Error ? loadError : new Error(String(loadError));
                    failures += 1;
                    promise = null;
                    notify();
                    // One automatic attempt after the first failure only: no loop
                    if (failures === 1 && retryDelay > 0) {
                        setTimeout(() => {
                            load().catch(() => {});
                        }, retryDelay);
                    }
                    throw error;
                },
            );
        }
        return promise;
    };

    function LazyScreenComponent(props: Record<string, unknown>) {
        if (component === null && error !== null) {
            // Shown by the error boundary of the screen
            throw error;
        }
        const ScreenComponent = component !== null ? component : use(load());
        return <ScreenComponent {...props} />;
    }

    function LazyScreen(props: Record<string, unknown>) {
        // Its own boundary: a screen that isn't loaded yet never suspends the viewer
        return (
            <Suspense fallback={null}>
                <LazyScreenComponent {...props} />
            </Suspense>
        );
    }
    LazyScreen.displayName = `LazyScreen(${id})`;

    return {
        id,
        type: 'screen',
        component: LazyScreen,
        load,
        isLoaded: () => component !== null,
        hasFailed: () => component === null && error !== null,
        onSettled: (listener: () => void) => {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
    };
}
