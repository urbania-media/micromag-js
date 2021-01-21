/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useRef, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDrag } from 'react-use-gesture';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    useScreenSizeFromElement,
    useResizeObserver,
    useParsedStory,
    useTrackScreenView,
    useTrackEvent,
} from '@micromag/core/hooks';
import { ScreenSizeProvider, ViewerProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';

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
    fullscreen: PropTypes.bool,
    renderContext: MicromagPropTypes.renderContext,
    onScreenChange: PropTypes.func,
    tapNextScreenWidthPercent: PropTypes.number,
    neighborScreensActive: PropTypes.number,
    scrollIndexHeightPercent: PropTypes.number,
    storyIsParsed: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    screen: null,
    deviceScreens: getDeviceScreens(),
    fullscreen: false,
    renderContext: 'view',
    onScreenChange: null,
    tapNextScreenWidthPercent: 0.5,
    neighborScreensActive: 2,
    scrollIndexHeightPercent: 0.5,
    storyIsParsed: false,
    className: null,
};

const Viewer = ({
    story,
    width,
    height,
    screen: screenId,
    deviceScreens,
    fullscreen,
    renderContext,
    onScreenChange,
    tapNextScreenWidthPercent,
    neighborScreensActive,
    scrollIndexHeightPercent,
    storyIsParsed,
    className,
}) => {
    const { components: screens = [], title = 'Story title' } =
        useParsedStory(story, { disabled: storyIsParsed }) || {};

    const trackScreenView = useTrackScreenView();
    const trackEvent = useTrackEvent();

    const contentRef = useRef(null);
    const scrollIndexChanged = useRef(false);

    // Get screen size
    const { ref: containerRef, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });
    const { width: screenWidth = null, height: screenHeight = null } = screenSize || {};

    // Get menu size
    const {
        ref: menuDotsContainerRef,
        entry: { contentRect: menuDotsContainerRect },
    } = useResizeObserver();

    const { width: menuDotsContainerWidth = null, height: menuDotsContainerHeight = null } =
        menuDotsContainerRect || {};

    const landscape = screenWidth > screenHeight;

    // Index
    const currentIndex = useMemo(
        () =>
            Math.max(
                0,
                screens.findIndex((it) => String(it.id) === String(screenId)),
            ),
        [screenId, screens],
    );

    const changeIndex = useCallback(
        (index) => {
            if (index === currentIndex) {
                return;
            }
            if (onScreenChange !== null) {
                onScreenChange(screens[index], index);
            }
        },
        [currentIndex, screens, onScreenChange],
    );

    // Handle interaction
    const onScreenPrevious = useCallback(() => {
        changeIndex(Math.max(0, currentIndex - 1));
    }, [changeIndex]);

    const onScreenNext = useCallback(() => {
        changeIndex(Math.min(screens.length - 1, currentIndex + 1));
    }, [changeIndex]);

    const screensCount = screens.length;
    const [screensInteractionEnabled, setScreensInteractionEnabled] = useState(
        screens.map(() => true),
    );
    useEffect(() => {
        setScreensInteractionEnabled([...Array(screensCount).keys()].map(() => true));
    }, [screensCount]);
    const currentScreenInteractionEnabled = screensInteractionEnabled[currentIndex];

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

    const screensRefs = useRef([]);

    // Handle screen change
    useEffect(() => {
        if (landscape) {
            if (!scrollIndexChanged.current) {
                let scrollTop = 0;
                screensRefs.current.forEach((screen, screenI) => {
                    if (screenI < currentIndex) {
                        scrollTop += screen.offsetHeight;
                    }
                });
                contentRef.current.scrollTop = scrollTop;
            } else {
                scrollIndexChanged.current = false;
            }
        }
    }, [landscape, currentIndex, screenHeight]);

    // Handle landscape scroll updating currentScreen @TODO use Observer
    const onContentScrolled = useCallback(() => {
        if (!landscape) {
            return;
        }

        const { scrollTop } = contentRef.current;

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
                screens.length - 1,
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
            if (landscape) {
                scrollIndexChanged.current = true;
            }
            changeIndex(scrollIndex);
        }
    }, [landscape, currentIndex, screenHeight, screens]);

    // handle tap
    const onTap = useCallback(
        (e) => {
            const checkClickable = (el, maxDistance = 5, distance = 1) => {
                const { tagName = null, parentNode = null } = el || {};

                if (tagName === 'BODY') {
                    return false;
                }

                const tags = ['BUTTON', 'A', 'INPUT', 'TEXTAREA'];

                if (tags.indexOf(tagName) > -1) {
                    return true;
                }

                if (distance < maxDistance) {
                    return checkClickable(parentNode, maxDistance, distance + 1);
                }

                return false;
            };

            if (checkClickable(e.target)) {
                return;
            }

            const it = screens[currentIndex] || null;
            const interactionEnabled = screensInteractionEnabled[currentIndex];

            if (it === null || !interactionEnabled) {
                return;
            }

            let nextIndex = currentIndex;

            const contentEl = contentRef.current;
            const { left: contentX = 0 } = contentEl.getBoundingClientRect();
            const tapX = e.clientX;
            const hasTappedLeft = tapX - contentX < screenWidth * (1 - tapNextScreenWidthPercent);

            if (hasTappedLeft) {
                nextIndex = Math.max(0, currentIndex - 1);
            } else {
                nextIndex = Math.min(screens.length - 1, currentIndex + 1);
            }
            changeIndex(nextIndex);
        },
        [
            onScreenChange,
            screenWidth,
            screens,
            changeIndex,
            currentIndex,
            screensInteractionEnabled,
        ],
    );

    const [menuOpened, setMenuOpened] = useState(false);

    const onDrag = useCallback(
        ({ swipe: [, swipeY], initial: [, iy] }) => {
            if (swipeY !== 0) {
                const swipeToBottom = swipeY > 0;
                const swipeFromTop = iy < screenHeight / 5;
                if (!swipeToBottom || swipeFromTop) {
                    setMenuOpened(swipeToBottom);
                }
            }
        },
        [setMenuOpened, screenHeight],
    );

    const bindDrag = useDrag(onDrag, { enabled: !landscape });

    // Track screen view

    const trackingEnabled = renderContext === 'view';
    const validIndex = screens.length > 0 && currentIndex < screens.length;
    const currentScreen = validIndex ? screens[currentIndex] : null;

    useEffect(() => {
        if (trackingEnabled && currentScreen !== null) {
            trackScreenView(currentScreen, currentIndex);
        }
    }, [currentScreen, trackScreenView, trackingEnabled]);

    // Handle dot menu item click

    const onClickDotsMenuItem = useCallback(
        (index) => {
            const clickedOnDot = index !== null;
            const goToScreen = landscape && clickedOnDot;

            if (goToScreen) {
                changeIndex(index);
            } else {
                setMenuOpened(true);
            }
            if (trackingEnabled) {
                const trackAction = goToScreen ? 'viewer-menu' : 'open';
                trackEvent(
                    'viewer-menu',
                    trackAction,
                    clickedOnDot ? { label: 'dot', dotIndex: index } : { label: 'menu' },
                );
            }
        },
        [changeIndex, setMenuOpened, landscape, trackingEnabled, trackEvent],
    );

    // handle preview menu item click

    const onClickPreviewMenuItem = useCallback(
        (index) => {
            changeIndex(index);
            setMenuOpened(false);

            if (trackingEnabled) {
                const clickedScreen = screens[index];
                trackEvent(currentScreen, 'viewer-menu', 'screen-change', { clickedScreen });
            }
        },
        [setMenuOpened, changeIndex, trackingEnabled, currentScreen, trackEvent, screens],
    );

    // Handle preview menu close click

    const onClickPreviewMenuClose = useCallback(() => {
        setMenuOpened(false);
        if (trackingEnabled) {
            trackEvent(currentScreen, 'viewer-menu', 'close');
        }
    }, [setMenuOpened, trackingEnabled, trackEvent, currentScreen]);

    // Handle preview menu share click

    const onClickShare = useCallback(() => {
        if (trackingEnabled) {
            trackEvent(currentScreen, 'viewer-menu', 'share');
        }
        console.log('@TODO share'); // eslint-disable-line
    }, [trackingEnabled, trackEvent, currentScreen]);

    console.log(story);

    return (
        <ScreenSizeProvider size={screenSize}>
            <ViewerProvider
                menuVisible={currentScreenInteractionEnabled}
                menuPosition={landscape ? 'right' : 'top'}
                menuSize={landscape ? menuDotsContainerWidth : menuDotsContainerHeight}
                menuOpened={menuOpened}
            >
                {/* @TODO better way to prevent pull-to-refresh */}
                <Helmet>
                    <style type="text/css">
                        {`body {
                            overscroll-behavior: contain;
                        }`}
                    </style>
                </Helmet>
                <div
                    className={classNames([
                        styles.container,
                        screenSize.screens.map((screenName) => `story-screen-${screenName}`),
                        {
                            [styles.fullscreen]: fullscreen,
                            [styles.landscape]: landscape,
                            [styles.hideMenu]: !currentScreenInteractionEnabled,
                            [styles.menuOpened]: menuOpened,
                            [className]: className,
                        },
                    ])}
                    ref={containerRef}
                    {...(!landscape && currentScreenInteractionEnabled ? bindDrag() : null)}
                >
                    <div className={styles.menuDotsContainer} ref={menuDotsContainerRef}>
                        <MenuDots
                            direction={landscape ? 'vertical' : 'horizontal'}
                            items={screens}
                            current={currentIndex}
                            onClickItem={onClickDotsMenuItem}
                            className={styles.menuDots}
                        />
                    </div>
                    <MenuPreview
                        title={title}
                        className={styles.menuPreview}
                        screenWidth={screenWidth}
                        screenHeight={screenHeight}
                        items={screens}
                        current={currentIndex}
                        onClickItem={onClickPreviewMenuItem}
                        onClose={onClickPreviewMenuClose}
                        onShare={onClickShare}
                    />
                    <div
                        ref={contentRef}
                        className={styles.content}
                        onScroll={landscape ? onContentScrolled : null}
                        {...(!landscape ? { onClick: onTap } : null)}
                    >
                        {screens.map((scr, i) => {
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
                                    landscape={landscape}
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
                                <div
                                    key={key}
                                    style={{
                                        left: screenWidth * (i - currentIndex),
                                    }}
                                    className={screenClass}
                                >
                                    {viewerScreen}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ViewerProvider>
        </ScreenSizeProvider>
    );
};

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
