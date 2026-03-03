/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { ScreensProvider as BaseScreensProvider } from '@micromag/core/contexts';

import manager from './manager';

interface ScreensProviderProps {
    children: React.ReactNode;
}

function ScreensProvider({ children, ...props }) {
    return (
        <BaseScreensProvider {...props} manager={manager}>
            {children}
        </BaseScreensProvider>
    );
}

export default ScreensProvider;
