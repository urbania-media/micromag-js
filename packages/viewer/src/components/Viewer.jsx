/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useRef, useEffect } from 'react';
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
    story: MicromagPropTypes.story.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    screen: PropTypes.string,
    deviceScreens: MicromagPropTypes.deviceScreens,
    interactions: MicromagPropTypes.interactions,
    onScreenChange: PropTypes.func,
    className: PropTypes.string,
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
    story,
    width,
    height,
    screen: screenId,
    deviceScreens,
    interactions,
    onScreenChange,
    className,
}) => {
    const { components = [] } = story || {};
    // Size
    const scrollRef = useRef(null);
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });
    const desktop = screenSize.width > screenSize.height;

    // Index
    const getIndexFromId = useCallback(
        id => {
            const idx = components.findIndex(it => String(it.id) === String(id)) || 0;
            return idx > -1 ? idx : 0;
        },
        [components],
    );
    const currentIndex = getIndexFromId(screenId);
    const changeIndex = useCallback(
        index => {
            if (onScreenChange !== null) {
                onScreenChange(components[index], index);
            }
        },
        [onScreenChange],
    );

    // Swipe mechanics
    const { items, bind, setIndex } = useSwipe({
        width: screenSize.width,
        items: components,
        disabled: desktop,
    });

    // Move it to the right place when id changes
    useEffect(() => {
        if (!desktop) {
            setIndex(currentIndex);
        } else if (desktop && scrollRef.current) {
            scrollRef.current.scrollTo({
                top: currentIndex * screenSize.height,
                behavior: 'smooth',
            });
        }
    }, [screenId, desktop]);

    const onClickMenuItem = useCallback(
        (e, it, index) => {
            e.preventDefault();
            changeIndex(index);
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

    // Track the menu cursor on use change
    const onVisible = useCallback(
        index => {
            changeIndex(index);
        },
        [changeIndex],
    );

    // console.log('current index', screenId, currentIndex);

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
                        current={currentIndex}
                        onClickItem={onClickMenuItem}
                        className={styles.menu}
                    />
                </div>
                <div ref={scrollRef} className={styles.content}>
                    {components.map((scr, i) => {
                        const style = { ...items[i] };
                        const active = i === currentIndex;
                        const visible = i > currentIndex - 2 && i < currentIndex + 2;
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
