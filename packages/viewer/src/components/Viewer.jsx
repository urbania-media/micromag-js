/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSizeFromElement } from '@micromag/core/hooks';
import { ScreenSizeProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';
import { Screens } from '@micromag/core/components';

import Menu from './menus/Viewer';

import styles from '../styles/viewer.module.scss';

const propTypes = {
    value: MicromagPropTypes.story.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    screen: PropTypes.string,
    deviceScreens: MicromagPropTypes.deviceScreens,
    className: PropTypes.string,
    onScreenChange: PropTypes.func,
};

const defaultProps = {
    width: null,
    height: null,
    screen: null,
    deviceScreens: getDeviceScreens(),
    className: null,
    onScreenChange: null,
};

const Viewer = ({
    value,
    width,
    height,
    screen: screenId,
    deviceScreens,
    className,
    onScreenChange,
}) => {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });

    const onClickMenuItem = useCallback(
        (e, it, index) => (onScreenChange !== null ? onScreenChange(it, index) : null),
        [onScreenChange],
    );

    const { components = [] } = value;
    const screen = components.find(it => it.id === screenId) || null;

    return (
        <ScreenSizeProvider size={screenSize}>
            <div
                className={classNames([
                    styles.container,
                    screenSize.screens.map(screenName => `story-screen-${screenName}`),
                    {
                        [className]: className,
                    },
                ])}
                ref={refContainer}
            >
                <div className={styles.top}>
                    <Menu
                        items={components.map(it => ({
                            ...it,
                            active: screen !== null && it.id === screen.id,
                        }))}
                        className={styles.menu}
                        onClickItem={onClickMenuItem}
                    />
                </div>
                <div className={styles.content}>
                    <Screens screens={components} screen={screenId} className={styles.screens} />
                </div>
            </div>
        </ScreenSizeProvider>
    );
};

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
