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
import MenuPreview from './menus/MenuPreview';

import styles from '../styles/viewer.module.scss';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    screen: PropTypes.string,
    renderFormat: MicromagPropTypes.renderFormat,
    deviceScreens: MicromagPropTypes.deviceScreens,
    interactions: MicromagPropTypes.interactions,
    fullscreen: PropTypes.bool,
    onScreenChange: PropTypes.func,
    tapNextScreenWidthPercent: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    screen: null,
    renderFormat: null,
    deviceScreens: getDeviceScreens(),
    interactions: ['tap'],
    fullscreen: false,
    onScreenChange: null,
    tapNextScreenWidthPercent: 0.5,
    className: null,
};

const Viewer = ({
    story,
    width,
    height,
    screen: screenId,
    renderFormat,
    deviceScreens,
    interactions,
    fullscreen,
    onScreenChange,
    tapNextScreenWidthPercent,
    className,
}) => {
    const { components = [] } = story || {};

    const scrollRef = useRef(null);
    const tappingRef = useRef(true);

    // Get screen size
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });

    // checking if desktop @TODO NOT SAFE
    // desktop disables swiping, simply renders each items in blocks
    // desktop at true also checks for index change
    const desktop = screenSize.width > screenSize.height;

    const hasInteractions = !desktop && interactions !== null;
    const withSwipe = hasInteractions && interactions.includes('swipe');
    const withTap = hasInteractions && interactions.includes('tap');

    // Index
    const getIndexFromId = useCallback(
        (id) => {
            console.log(id)
            const idx = components.findIndex((it) => String(it.id) === String(id));
            return Math.max(0, idx);
        },
        [components],
    );
    const currentIndex = getIndexFromId(screenId);
    const changeIndex = useCallback(
        (index) => {
            if (index === currentIndex) {
                return;
            }
            console.log('call', index);
            if (onScreenChange !== null) {
                onScreenChange(components[index], index);
            }
        },
        [currentIndex, components, onScreenChange],
    );

    // Swipe mechanics
    const { items, bind, setIndex, opened, setOpened } = useSwipe({
        width: screenSize.width,
        items: components,
        disabled: desktop,
        withSpring: hasInteractions,
        onSwipeStart: () => {
            tappingRef.current = false;
        },
        onSwipeEnd: (index) => {
            changeIndex(index);
        },
        onTap: () => {
            tappingRef.current = true;
        },
    });

    // Move it to the right place when id changes
    useEffect(() => {
        if (!desktop) {
            setIndex(currentIndex);
        } else {
            // scrollRef.current.scrollTop = (currentIndex * screenSize.height);
        }
    }, [screenId, desktop, setIndex, currentIndex, screenSize]);

    const onClickMenuItem = useCallback(
        (e, it, index) => {
            e.preventDefault();

            if (desktop) {
                changeIndex(index);
            } else {
                setOpened();
            }
        },
        [onScreenChange, desktop, screenSize, setOpened, changeIndex],
    );

    const onTap = useCallback(
        (e) => {
            e.stopPropagation();

            if (!tappingRef.current) {
                return;
            }

            const { index: stringIndex } = e.currentTarget.dataset;
            const index = parseInt(stringIndex, 10);
            const it = { ...components[parseInt(index, 10)] };
            if (!it) return;

            let next = index;

            if (e.clientX > screenSize.width * (1 - tapNextScreenWidthPercent)) {
                next = index < items.length - 1 ? index + 1 : index;
            } else {
                next = index > 0 ? index - 1 : index;
            }
            if (changeIndex !== null) {
                changeIndex(next);
            }
        },
        [onScreenChange, items, screenSize, components, changeIndex],
    );

    console.log('current index', screenId, currentIndex);

    return (
        <ScreenSizeProvider size={screenSize}>
            <div
                className={classNames([
                    styles.container,
                    screenSize.screens.map((screenName) => `story-screen-${screenName}`),
                    {
                        [styles.fullscreen]: fullscreen,
                        [styles.desktop]: desktop,
                        [className]: className,
                    },
                ])}
                ref={refContainer}
            >
                <Menu
                    items={components}
                    current={currentIndex}
                    onClickItem={onClickMenuItem}
                    className={styles.menu}
                />
                <MenuPreview
                    items={components}
                    current={currentIndex}
                    onClickItem={onClickMenuItem}
                    className={styles.menuPreview}
                />
                <div ref={scrollRef} className={styles.content}>
                    {components.map((scr, i) => {
                        const style = { ...items[i] };
                        const active = i === currentIndex;
                        const visible = i > currentIndex - 2 && i < currentIndex + 2;
                        return (
                            <animated.div
                                {...(withSwipe ? bind() : null)}
                                {...(withTap ? { onClick: onTap } : null)}
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
                                    renderFormat={renderFormat}
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
