/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Screen from './Screen';

import * as AppPropTypes from '../../PropTypes';

import styles from '../../styles/screens/story.module.scss';

const propTypes = {
    screen: AppPropTypes.component,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    screen: {},
    width: null,
    height: null,
    className: null,
    children: null,
};

const ScreenStory = ({ screen, width, height, className, children }) => {
    const isFullScreen = width === null || height === null;
    const containerStyle = !isFullScreen ? { width: `${width}px`, height: `${height}px` } : null;

    // console.log(
    //     'debug: core/story',
    //     width,
    //     height,
    //     isFullScreen,
    //     containerStyle,
    //     styles,
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
            style={containerStyle}
        >
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
        </div>
    );
};

ScreenStory.propTypes = propTypes;
ScreenStory.defaultProps = defaultProps;

export default ScreenStory;
