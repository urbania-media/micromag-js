/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Screen from './Screen';

import { getDeviceScreens } from '../../utils/getDeviceScreens';
import { useScreenSizeFromElement } from '../../hooks/useScreenSize';

import { ScreenSizeProvider } from '../../contexts/ScreenSizeContext';
import * as AppPropTypes from '../../PropTypes';

import styles from '../../styles/screens/story.module.scss';

const propTypes = {
    screen: AppPropTypes.component,
    width: PropTypes.number,
    height: PropTypes.number,
    deviceScreens: AppPropTypes.deviceScreens,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    screen: {},
    width: null,
    height: null,
    deviceScreens: getDeviceScreens(),
    className: null,
    children: null,
};

const ScreenStory = ({ screen, width, height, deviceScreens, className, children }) => {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });
    const isFullScreen = width === null || height === null;
    const containerStyle = !isFullScreen ? { width: `${width}px`, height: `${height}px` } : null;

    // console.log(
    //     'core/story',
    //     styles,
    //     isFullScreen,
    //     width,
    //     height,
    //     screenSize,
    //     refContainer,
    //     containerStyle,
    // );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withBorder]: !isFullScreen,
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

ScreenStory.propTypes = propTypes;
ScreenStory.defaultProps = defaultProps;

export default ScreenStory;
