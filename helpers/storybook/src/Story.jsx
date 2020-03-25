/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ScreenSizeProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';
import { useScreenSizeFromElement } from '@micromag/core/hooks';

import { Screen, PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './story.module.scss';

const propTypes = {
    screen: MicromagPropTypes.component,
    width: PropTypes.number,
    height: PropTypes.number,
    isPlaceholder: PropTypes.bool,
    isPreview: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    screen: {
        type: 'screen-type',
    },
    width: null,
    height: null,
    isPlaceholder: false,
    isPreview: false,
    className: null,
    children: null,
};

const placeholderSize = { width: 100, height: 150 };

const previewSize = { width: 320, height: 480 };

const Story = ({ screen, width, height, isPlaceholder, isPreview, className, children }) => {
    let size = {
        width,
        height,
    };

    if (isPlaceholder) {
        size = { ...placeholderSize };
    }

    if (isPreview) {
        size = { ...previewSize };
    }

    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        ...size,
        screens: getDeviceScreens(),
    });

    const isFullScreen = size.width === null || size.height === null;
    const containerStyle = !isFullScreen
        ? { width: `${size.width}px`, height: `${size.height}px` }
        : null;

    const customSize = !isFullScreen || isPlaceholder || isPreview;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withBorder]: customSize,
                    [styles.withMargin]: customSize,
                    [styles.isFullScreen]: isFullScreen,
                },
            ])}
            ref={refContainer}
            style={containerStyle}
        >
            <ScreenSizeProvider size={screenSize}>
                <Screen
                    screen={screen}
                    component={children}
                    isPlaceholder
                    className={classNames([
                        styles.screen,
                        {
                            [className]: className !== null,
                        },
                    ])}
                />
            </ScreenSizeProvider>
        </div>
    );
};

Story.propTypes = propTypes;
Story.defaultProps = defaultProps;

export default Story;
