/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ScreenSizeProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';
import { useScreenSizeFromElement } from '@micromag/core/hooks';

export const ScreenSize = (size = null) => storyFn => {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        ...size,
        screens: getDeviceScreens(),
    });

    return (
        <div
            ref={refContainer}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
            <ScreenSizeProvider size={screenSize}>{storyFn()}</ScreenSizeProvider>
        </div>
    );
};

export default ScreenSize;
