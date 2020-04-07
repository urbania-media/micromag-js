/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { getDeviceScreens } from '../packages/core/src/utils';
import { useScreenSizeFromElement } from '../packages/core/src/hooks';
import { ScreenSizeProvider, GoogleMapsClientProvider } from '../packages/core/src/contexts';

import keys from '../keys.json';

const GoogleMapsApiKey = keys && keys.GOOGLE_MAPS_API_KEY ? keys.GOOGLE_MAPS_API_KEY : null;

export const withGoogleMapsApi = storyFn => {
    return (
        <GoogleMapsClientProvider apiKey={GoogleMapsApiKey}>{storyFn()}</GoogleMapsClientProvider>
    );
};

export const withScreenSize = (size = null) => storyFn => {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        ...size,
        screens: getDeviceScreens(),
    });

    let style = {};

    if (size !== null && (size.width || size.height)) {
        style = {
            ...style,
            position: 'relative',
            border: '1px solid #ccc',
            margin: '10px',
            width: size.width,
            height: size.height,
        };
    }

    return (
        <div
            ref={refContainer}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                ...style,
            }}
        >
            <ScreenSizeProvider size={screenSize}>{storyFn()}</ScreenSizeProvider>
        </div>
    );
};

export const withPlaceholderSize = () => withScreenSize({ width: 80, height: 120 });

export const withPreviewSize = () => withScreenSize({ width: 100, height: 150 });

export default withScreenSize;
