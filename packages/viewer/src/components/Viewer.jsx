/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSizeFromElement, useSwipe } from '@micromag/core/hooks';
import { ScreenSizeProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';
import { Screen } from '@micromag/core/components';

import Menu from './menus/Viewer';

import styles from '../styles/viewer.module.scss';

const propTypes = {
    value: MicromagPropTypes.story.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    screen: PropTypes.string,
    deviceScreens: MicromagPropTypes.deviceScreens,
    interactions: MicromagPropTypes.interactions,
    className: PropTypes.string,
    onScreenChange: PropTypes.func,
};

const defaultProps = {
    width: null,
    height: null,
    screen: null,
    deviceScreens: getDeviceScreens(),
    className: null,
    interactions: ['swipe', 'tap'],
    onScreenChange: null,
};

const Viewer = ({
    value,
    width,
    height,
    screen: screenId,
    deviceScreens,
    interactions,
    className,
    onScreenChange,
}) => {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });
    const { components = [] } = value;

    const { items, bind, setIndex } = useSwipe({ width: screenSize.width, items: components });

    const onClickMenuItem = useCallback(
        (e, it, index) => {
            e.preventDefault();
            if (onScreenChange !== null) {
                onScreenChange(it, index);
            }
            if (setIndex !== null) {
                setIndex(index);
            }
        },
        [onScreenChange],
    );

    const onTap = useCallback(
        (e, it, index) => {
            let next = index;
            if (e.clientX > screenSize.width / 2) {
                next = index < items.length - 1 ? index + 1 : index;
            } else {
                next = index > 0 ? index - 1 : index;
            }
            if (onScreenChange !== null) {
                onScreenChange(it, next);
            }
            if (setIndex !== null) {
                setIndex(next);
            }
        },
        [onScreenChange, items, screenSize],
    );

    const screen = components.find(it => it.id === screenId) || null;
    // console.log('value, components', value, components);
    // console.log('screen', screen);
    // console.log(onScreenChange);

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
                    {items.map(({ display, visibility, transform, item }, i) => {
                        const color = (i + 1) * 30;
                        return (
                            <div
                                {...(interactions !== null && interactions.includes('swipe')
                                    ? bind()
                                    : null)}
                                {...(interactions !== null && interactions.includes('tap')
                                    ? { onClick: e => onTap(e, item, i) }
                                    : null)}
                                key={i}
                                style={{ display, visibility, transform }}
                                className={styles.screen}
                            >
                                {screen !== null ? (
                                    <Screen screen={screen} />
                                ) : (
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: `rgb(${color}, ${color}, ${color})`,
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </ScreenSizeProvider>
    );
};

// <Screens screens={components} screen={screenId} className={styles.screens} />

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
