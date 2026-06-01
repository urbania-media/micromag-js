import {
    ScreensProvider as BaseScreensProvider,
    type ScreensProviderProps,
} from '@micromag/core/contexts';

import manager from './manager';

function ScreensProvider(props: ScreensProviderProps) {
    return <BaseScreensProvider {...props} manager={manager} />;
}

export default ScreensProvider;
