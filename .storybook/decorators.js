/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { getDeviceScreens } from '../packages/core/src/utils';
import { useScreenSizeFromElement } from '../packages/core/src/hooks';
import { ScreenSizeProvider } from '../packages/core/src/contexts';

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
