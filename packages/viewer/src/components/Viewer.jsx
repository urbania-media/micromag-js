/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { animated } from 'react-spring';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSizeFromElement, useSwipe } from '@micromag/core/hooks';
import { ScreenSizeProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';

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
    deviceScreens: MicromagPropTypes.deviceScreens,
    interactions: MicromagPropTypes.interactions,
    fullscreen: PropTypes.bool,
    renderContext: MicromagPropTypes.renderContext,
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
    deviceScreens: getDeviceScreens(),
    interactions: ['tap'],
    fullscreen: false,
    renderContext: null,
    onScreenChange: null,
    tapNextScreenWidthPercent: 0.5,
    neighborScreensActive: 2,
    scrollIndexHeightPercent: 0.5,
    className: null,
};

const Viewer = ({
    story,
    width,
    height,
    screen: screenId,
    deviceScreens,
    interactions,
    fullscreen,
    renderContext,
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
    const { width: screenWidth = null, height: screenHeight = null } = screenSize || {};

    const landscape = screenWidth > screenHeight;

    const hasInteractions = !landscape && interactions !== null;
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
            if (onScreenChange !== null) {
                onScreenChange(components[index], index);
            }
        },
        [currentIndex, components, onScreenChange],
    );

    // Handle interaction
    const onScreenPrevious = useCallback(() => {
        changeIndex(Math.max(0, currentIndex - 1));
    }, [changeIndex]);

    const onScreenNext = useCallback(() => {
        changeIndex(Math.min(components.length - 1, currentIndex + 1));
    }, [changeIndex]);

    const [screensInteractionEnabled, setScreensInteractionEnabled] = useState(components.map(() => true));

    const onEnableInteraction = useCallback(() => {
        if (!screensInteractionEnabled[currentIndex]) {
            const newArray = [...screensInteractionEnabled];
            newArray[currentIndex] = true;
            setScreensInteractionEnabled(newArray);
        }
    }, [currentIndex, screensInteractionEnabled, setScreensInteractionEnabled]);

    const onDisableInteraction = useCallback(() => {
        if (screensInteractionEnabled[currentIndex]) {
            const newArray = [...screensInteractionEnabled];
            newArray[currentIndex] = false;
            setScreensInteractionEnabled(newArray);
        }
    }, [currentIndex, screensInteractionEnabled, setScreensInteractionEnabled]);

    // Swipe mechanics
    const { items, bind, setIndex } = useSwipe({
        width: screenWidth,
        items: components,
        disabled: landscape,
        withSpring: hasInteractions,
        animateScale: true,
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

    const screensRefs = useRef([]);

    // Handle screen change
    useEffect(() => {
        if (landscape) {
            if (animateScroll.current) {

                let scrollTop = 0;
                screensRefs.current.forEach((screen, screenI) => {
                    if (screenI < currentIndex) {
                        scrollTop += screen.offsetHeight;
                    }
                });

                anime({
                    targets: scrollRef.current,
                    duration: 500,
                    scrollTop,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        animateScroll.current = false;
                    },
                });
            }
        } else {
            setIndex(currentIndex);
        }
    }, [landscape, setIndex, currentIndex, screenHeight]);

    // Handle menu
    const [menuOpened, setMenuOpened] = useState(false);

    // Handle dot menu item click
    const onClickDotsMenuItem = useCallback(() => {
        setMenuOpened(!menuOpened);
    }, [menuOpened, setMenuOpened]);

    // handle preview menu item click
    const onClickPreviewMenuItem = useCallback(
        (index) => {
            if (landscape) {
                animateScroll.current = true;
            }
            changeIndex(index);
            setMenuOpened(false);
        },
        [setMenuOpened, changeIndex, landscape],
    );

    const onClickPreviewMenuClose = useCallback(() => {
        setMenuOpened(false);
    }, [setMenuOpened]);

    // handle tap
    const onTap = useCallback(
        (e) => {
            e.stopPropagation();
            const it = components[currentIndex] || null;
            const interactionEnabled = screensInteractionEnabled[currentIndex];

            if (it === null || !tappingRef.current || !interactionEnabled) {
                return;
            }

            let nextIndex = currentIndex;

            if (e.clientX > screenWidth * (1 - tapNextScreenWidthPercent)) {
                nextIndex = Math.min(components.length - 1, currentIndex + 1);
            } else {
                nextIndex = Math.max(0, currentIndex - 1);
            }
            changeIndex(nextIndex);
        },
        [onScreenChange, screenWidth, components, changeIndex, currentIndex, screensInteractionEnabled],
    );

    // Handle landscape scroll updating currentScreen
    // @TODO use Observer
    const onContentScrolled = useCallback(() => {
        if (!landscape || animateScroll.current) {
            return;
        }

        const { scrollTop } = scrollRef.current;

        let currentY = 0;
        const screensY = screensRefs.current.map((screen) => {
            const screenY = currentY;
            currentY += screen.offsetHeight;
            return screenY;
        });

        const scrollHeightOffset = screenSize.height * scrollIndexHeightPercent;

        const scrollIndex = Math.max(
            0,
            Math.min(
                components.length - 1,
                screensY.findIndex((screenY, screenI) => {
                    const afterCurrent = scrollTop >= screenY - scrollHeightOffset;
                    const lastScreen = screenI === screensY.length - 1;
                    const beforeNext =
                        lastScreen || scrollTop < screensY[screenI + 1] - scrollHeightOffset;
                    return afterCurrent && beforeNext;
                }),
            ),
        );

        if (scrollIndex !== currentIndex) {
            changeIndex(scrollIndex);
        }
    }, [landscape, currentIndex, screenHeight, components]);

    return (
        <ScreenSizeProvider size={screenSize}>
            <div
                className={classNames([
                    styles.container,
                    screenSize.screens.map((screenName) => `story-screen-${screenName}`),
                    {
                        [styles.fullscreen]: fullscreen,
                        [styles.landscape]: landscape,
                        [styles.menuOpened]: menuOpened,
                        [className]: className,
                    },
                ])}
                {...(withSwipe ? bind() : null)}
                ref={refContainer}
            >
                <MenuDots
                    direction={landscape ? 'vertical' : 'horizontal'}
                    items={components}
                    current={currentIndex}
                    onClickItem={onClickDotsMenuItem}
                    className={styles.menuDots}
                />
                <MenuPreview
                    width={screenWidth}
                    height={screenHeight}
                    items={components}
                    current={currentIndex}
                    onClickItem={onClickPreviewMenuItem}
                    onClose={onClickPreviewMenuClose}
                    className={styles.menuPreview}
                />
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

                        const viewerScreen = (
                            <ViewerScreen
                                screen={scr}
                                renderContext={renderContext}
                                index={i}
                                current={current}
                                active={active}
                                onPrevious={onScreenPrevious}
                                onNext={onScreenNext}
                                onEnableInteraction={onEnableInteraction}
                                onDisableInteraction={onDisableInteraction}
                            />
                        );
                        const screenClass = styles.screen;
                        const key = `screen-viewer-${scr.id || ''}-${i + 1}`;
                        return landscape ? (
                            <div
                                key={key}
                                className={screenClass}
                                ref={(el) => {
                                    screensRefs.current[i] = el;
                                }}
                            >
                                {viewerScreen}
                            </div>
                        ) : (
                            <animated.div key={key} style={style} className={screenClass}>
                                {viewerScreen}
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
