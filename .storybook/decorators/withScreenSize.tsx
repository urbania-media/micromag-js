import isObject from 'lodash/isObject';
import React from 'react';
import { ScreenSizeProvider } from '../../packages/core/src/contexts';
import { useScreenSizeFromElement } from '../../packages/core/src/hooks';
import { getDeviceScreens } from '../../packages/core/src/utils';

const withScreenSize = (Story, { parameters: { screenSize: screenSizeOptions = null } }) => {
    const enabled = isObject(screenSizeOptions) || screenSizeOptions === true;
    const {
        width = null,
        height = null,
        style = null,
        containerStyle = null,
    } = isObject(screenSizeOptions) ? screenSizeOptions : {};
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: getDeviceScreens(),
    });

    let innerStyle = {
        ...style,
    };

    let outerStyle = {};

    if (width || height) {
        innerStyle = {
            ...style,
            position: 'relative',
            width,
            height,
        };
        outerStyle = {
            display: 'inline-block',
            margin: '10px',
            ...containerStyle,
        };
    }

    return enabled ? (
        <div style={outerStyle}>
            <div
                ref={refContainer}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    ...innerStyle,
                }}
            >
                <ScreenSizeProvider size={screenSize}>
                    <Story />
                </ScreenSizeProvider>
            </div>
        </div>
    ) : (
        <Story />
    );
};

export default withScreenSize;
