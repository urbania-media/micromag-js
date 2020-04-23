/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { animated } from 'react-spring';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSizeFromElement, useSwipe } from '@micromag/core/hooks';
import { ScreenSizeProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';

import ViewerScreen from './ViewerScreen';

import Menu from './menus/Menu';

import styles from '../styles/viewer.module.scss';

const propTypes = {
    value: MicromagPropTypes.story.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    screenId: PropTypes.string,
    deviceScreens: MicromagPropTypes.deviceScreens,
    interactions: MicromagPropTypes.interactions,
    onScreenChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    screenId: null,
    deviceScreens: getDeviceScreens(),
    className: null,
    interactions: ['tap'],
    onScreenChange: null,
};

const Viewer = ({
    value: { components = [] },
    width,
    height,
    screenId,
    deviceScreens,
    interactions,
    onScreenChange,
    className,
}) => {
    const [menuIndex, setMenuIndex] = useState(
        components.findIndex(it => String(it.id) === String(screenId)) || 0,
    );
    // const [nextIndex, setNextMenuIndex] = useState(menuIndex);
    const scrollRef = useRef(null);
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });
    const desktop = screenSize.width > screenSize.height;

    const onIndexChange = useCallback(
        index => {
            if (onScreenChange !== null) {
                onScreenChange(components[index], index);
            }
        },
        [onScreenChange],
    );

    const onVisible = useCallback(
        index => {
            setMenuIndex(index);
            if (desktop) {
                onIndexChange(index);
            }
        },
        [setMenuIndex],
    );

    // const onFlick = useCallback(
    //     index => {
    //         setNextMenuIndex(index);
    //     },
    //     [setNextMenuIndex],
    // );

    const { items, bind, setIndex } = useSwipe({
        width: screenSize.width,
        items: components,
        disabled: desktop,
        onChangeEnd: onIndexChange,
        // onChangeStart: onFlick,
    });

    const onClickMenuItem = useCallback(
        (e, it, index) => {
            e.preventDefault();
            setMenuIndex(index);
            if (!desktop && setIndex !== null) {
                setIndex(index);
            } else if (desktop && scrollRef.current) {
                scrollRef.current.scrollTo({ top: index * screenSize.height, behavior: 'smooth' });
            }
        },
        [onScreenChange, desktop, scrollRef, screenSize],
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
                        items={components}
                        current={menuIndex}
                        onClickItem={onClickMenuItem}
                        className={styles.menu}
                    />
                </div>
                <div ref={scrollRef} className={styles.content}>
                    {components.map((scr, i) => {
                        const style = { ...items[i] };
                        const active = i === menuIndex;
                        const visible = i > menuIndex - 2 && i < menuIndex + 2;
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
                                <ViewerScreen
                                    screen={scr}
                                    index={i}
                                    active={active}
                                    visible={visible}
                                    onVisible={onVisible}
                                />
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
