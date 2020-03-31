/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { getDeviceScreens } from '../packages/core/utils';
import { useScreenSizeFromElement } from '../packages/core/hooks';
import { ScreenSizeProvider } from '../packages/core/contexts';

export const withScreenSize = (size = null) => storyFn => {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        ...size,
        screens: getDeviceScreens(),
    });
    // console.log('ss', size);

    let style = {};

    if (size !== null && (size.width || size.height)) {
        style = {
            ...style,
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
