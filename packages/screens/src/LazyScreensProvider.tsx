import {
    ScreensProvider as BaseScreensProvider,
    type ScreensProviderProps,
} from '@micromag/core/contexts';

import lazyManager from './lazyManager';

/**
 * Like ScreensProvider, with the screens loaded on demand (each screen package and its CSS in a
 * chunk of its own). Needs a bundler that handles dynamic imports and CSS imports.
 */
function LazyScreensProvider(props: Omit<ScreensProviderProps, 'manager'>) {
    return <BaseScreensProvider {...props} manager={lazyManager} />;
}

export default LazyScreensProvider;
