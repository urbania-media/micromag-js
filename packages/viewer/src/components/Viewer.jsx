/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { animated } from 'react-spring';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSizeFromElement, useSwipe } from '@micromag/core/hooks';
import { ScreenSizeProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';
import { Screen } from '@micromag/core/components';

import Menu from './menus/Menu';

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
    interactions: ['tap'],
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
    const desktop = screenSize.width > screenSize.height;

    const { components = [] } = value;

    const onIndexChange = useCallback(
        index => {
            // console.log('onIndexChange', index);
            if (onScreenChange !== null) {
                onScreenChange(components[index], index);
            }
        },
        [onScreenChange],
    );

    const { items, bind, setIndex } = useSwipe({
        width: screenSize.width,
        items: components,
        disabled: desktop,
        onIndexChange,
    });

    const onClickMenuItem = useCallback(
        (e, it, index) => {
            e.preventDefault();
            if (!desktop && setIndex !== null) {
                setIndex(index);
            }
        },
        [onScreenChange, desktop],
    );

    const onTap = useCallback(
        e => {
            e.stopPropagation();
            const { index: stringIndex } = e.currentTarget.dataset;
            const index = parseInt(stringIndex, 10);
            const it = { ...components[parseInt(index, 10)] };
            if (!it) return;

            let next = index;
            if (e.clientX > screenSize.width / 2) {
                next = index < items.length - 1 ? index + 1 : index;
            } else {
                next = index > 0 ? index - 1 : index;
            }
            if (setIndex !== null) {
                setIndex(next);
            }
        },
        [onScreenChange, items, screenSize, components],
    );

    const currentScreen = components.find(it => String(it.id) === String(screenId)) || null;

    return (
        <ScreenSizeProvider size={screenSize}>
            <div
                className={classNames([
                    styles.container,
                    screenSize.screens.map(screenName => `story-screen-${screenName}`),
                    {
                        [styles.desktop]: desktop,
                        [className]: className,
                    },
                ])}
                ref={refContainer}
            >
                <div className={styles.top}>
                    <Menu
                        items={components.map(it => ({
                            ...it,
                            active: currentScreen !== null && it.id === currentScreen.id,
                        }))}
                        className={styles.menu}
                        onClickItem={onClickMenuItem}
                    />
                </div>
                <div className={styles.content}>
                    {components.map((scr, i) => {
                        const color = (i + 1) * 30;
                        const style = { ...items[i] };
                        return (
                            <animated.div
                                {...(!desktop &&
                                interactions !== null &&
                                interactions.includes('swipe')
                                    ? bind()
                                    : null)}
                                {...(!desktop &&
                                interactions !== null &&
                                interactions.includes('tap')
                                    ? { onClick: onTap }
                                    : null)}
                                key={`screen-viewer-${scr.id || ''}-${i + 1}`}
                                data-index={i}
                                style={style}
                                className={styles.screen}
                            >
                                {scr !== null ? (
                                    <Screen screen={scr} />
                                ) : (
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: `rgb(${color}, ${color}, ${color})`,
                                        }}
                                    />
                                )}
                            </animated.div>
                        );
                    })}
                </div>
            </div>
        </ScreenSizeProvider>
    );
};

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
