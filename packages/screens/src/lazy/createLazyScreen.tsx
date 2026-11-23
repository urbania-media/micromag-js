import React, { ElementType, Suspense, use } from 'react';

import type { ScreenDefinition } from '@micromag/core';

/**
 * A screen definition whose component is loaded on demand: `load()` starts loading it (once), and
 * the component renders nothing until it is loaded. The viewer loads the screens of the story when
 * it mounts and waits for them before it changes screen, so a reader never sees a screen loading.
 */
export default function createLazyScreen(
    id: string,
    loader: () => Promise<ElementType>,
): ScreenDefinition {
    let component: ElementType | null = null;
    let promise: Promise<ElementType> | null = null;

    const load = () => {
        if (promise === null) {
            promise = loader().then(
                (loadedComponent) => {
                    component = loadedComponent;
                    return loadedComponent;
                },
                (error) => {
                    // Try again next time
                    promise = null;
                    throw error;
                },
            );
        }
        return promise;
    };

    function LazyScreenComponent(props: Record<string, unknown>) {
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
    };
}
