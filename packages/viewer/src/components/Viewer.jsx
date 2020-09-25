/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { animated } from 'react-spring';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSizeFromElement, useSwipe } from '@micromag/core/hooks';
import { ScreenSizeProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';

import clamp from 'lodash/clamp';
import anime from 'animejs';

import ViewerScreen from './ViewerScreen';

import MenuDots from './menus/MenuDots';
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
    neighborScreensActive: PropTypes.number,
    scrollIndexHeightPercent: PropTypes.number,
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
    neighborScreensActive: 2,
    scrollIndexHeightPercent: 0.75,
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
    neighborScreensActive,
    scrollIndexHeightPercent,
    className,
}) => {
    const { components = [] } = story || {};

    const scrollRef = useRef(null);
    const tappingRef = useRef(true);
    const animateScroll = useRef(false);

    // Get screen size
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });

    // checking if desktop @TODO NOT SAFE
    // desktop disables swiping, simply renders each items in blocks
    // desktop at true also checks for index change while scrolling
    const desktop = screenSize.width > screenSize.height;

    const hasInteractions = !desktop && interactions !== null;
    const withSwipe = hasInteractions && interactions.includes('swipe');
    const withTap = hasInteractions && interactions.includes('tap');

    // Index
    const currentIndex = useMemo(
        () =>
            Math.max(
                0,
                components.findIndex((it) => String(it.id) === String(screenId)),
            ),
        [screenId, components],
    );

    const changeIndex = useCallback(
        (index) => {
            if (index === currentIndex) {
                return;
            }
            console.log('screen change', index);
            if (onScreenChange !== null) {
                onScreenChange(components[index], index);
            }
        },
        [currentIndex, components, onScreenChange],
    );

    // Swipe mechanics
    const { items, menu, bind, setIndex, setMenuOpened } = useSwipe({
        width: screenSize.width,
        height: screenSize.height,
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

    // Handle screen change
    useEffect(() => {
        if (desktop) {
            if (animateScroll.current) {
                anime({
                    targets: scrollRef.current,
                    duration: 500,
                    scrollTop: currentIndex * screenSize.height,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        animateScroll.current = false;
                    },
                });
            }
        } else {
            setIndex(currentIndex);
        }
    }, [desktop, setIndex, currentIndex, screenSize]);

    // Handle dot menu item click
    const onClickDotsMenuItem = useCallback(
        index => {
            if (desktop) {
                animateScroll.current = true;
                changeIndex(index);
            } else {
                setMenuOpened();
            }
        },
        [desktop, setMenuOpened, changeIndex],
    );

    // handle preview menu item click
    const onClickPreviewMenuItem = useCallback(
        index => {
            changeIndex(index);
            setMenuOpened(false);
        },
        [setMenuOpened, changeIndex],
    );

    const onClickPreviewMenuClose = useCallback(
        () => {
            setMenuOpened(false);
        },
        [setMenuOpened]
    );

    // handle tap
    const onTap = useCallback(
        (e) => {
            e.stopPropagation();

            if (!tappingRef.current) {
                return;
            }

            const it = { ...components[currentIndex] };
            if (!it) return;

            let nextIndex = currentIndex;

            if (e.clientX > screenSize.width * (1 - tapNextScreenWidthPercent)) {
                nextIndex = currentIndex < components.length - 1 ? currentIndex + 1 : currentIndex;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
            }
            changeIndex(nextIndex);
        },
        [onScreenChange, screenSize, components, changeIndex, currentIndex],
    );

    // Handle desktop scroll updating currentScreen
    const onContentScrolled = useCallback(() => {
        if (!desktop || animateScroll.current) {
            return;
        }
        const scrollIndex = clamp(
            Math.floor(
                scrollRef.current.scrollTop / screenSize.height + (1 - scrollIndexHeightPercent),
            ),
            0,
            components.length - 1,
        );
        if (scrollIndex !== currentIndex) {
            changeIndex(scrollIndex);
        }
    }, [desktop, currentIndex, screenSize, components]);

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
                {...(withSwipe ? bind() : null)}
            >
                <MenuDots
                    items={components}
                    current={currentIndex}
                    onClickItem={onClickDotsMenuItem}
                    className={styles.menu}
                />
                <animated.div style={menu} className={styles.menuPreviewContainer}>
                    <MenuPreview
                        items={components}
                        current={currentIndex}
                        onClickItem={onClickPreviewMenuItem}
                        onClose={onClickPreviewMenuClose}
                        className={styles.menuPreview}
                    />
                </animated.div>
                <div
                    ref={scrollRef}
                    className={styles.content}
                    onScroll={onContentScrolled}
                    {...(withTap ? { onClick: onTap } : null)}
                >
                    {components.map((scr, i) => {
                        const style = { ...items[i] };
                        const current = i === currentIndex;
                        const active =
                            i > currentIndex - neighborScreensActive &&
                            i < currentIndex + neighborScreensActive;
                        return (
                            <animated.div
                                key={`screen-viewer-${scr.id || ''}-${i + 1}`}
                                style={style}
                                className={styles.screen}
                            >
                                <ViewerScreen
                                    screen={scr}
                                    index={i}
                                    current={current}
                                    active={active}
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
