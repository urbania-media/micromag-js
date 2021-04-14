/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useRef, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDrag } from 'react-use-gesture';
import { useSpring, config } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    useScreenSizeFromElement,
    useResizeObserver,
    useParsedStory,
    useTrackScreenView,
    useTrackEvent,
    useLoadedFonts,
    useFullscreen,
} from '@micromag/core/hooks';
import { ScreenSizeProvider, ViewerProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';
import { FontFaces, Meta } from '@micromag/core/components';

import ViewerScreen from './ViewerScreen';
import MenuDots from './menus/MenuDots';
import MenuPreview from './menus/MenuPreview';

import styles from '../styles/viewer.module.scss';

const propTypes = {
    story: MicromagPropTypes.story, // .isRequired,
    basePath: PropTypes.string,
    theme: MicromagPropTypes.branding,
    width: PropTypes.number,
    height: PropTypes.number,
    screen: PropTypes.string,
    deviceScreens: MicromagPropTypes.deviceScreens,
    renderContext: MicromagPropTypes.renderContext,
    onScreenChange: PropTypes.func,
    tapNextScreenWidthPercent: PropTypes.number,
    neighborScreensActive: PropTypes.number,
    storyIsParsed: PropTypes.bool,
    landscapeScreenMargin: PropTypes.number,
    withMetadata: PropTypes.bool,
    withoutMenu: PropTypes.bool,
    withoutFullscreen: PropTypes.bool,
    closeable: PropTypes.bool,
    onClose: PropTypes.func,
    onInteraction: PropTypes.func,
    onEnd: PropTypes.func,
    onViewModeChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    story: null,
    theme: null,
    basePath: null,
    width: null,
    height: null,
    screen: null,
    deviceScreens: getDeviceScreens(),
    renderContext: 'view',
    onScreenChange: null,
    tapNextScreenWidthPercent: 0.5,
    neighborScreensActive: 2,
    storyIsParsed: false,
    landscapeScreenMargin: 50,
    withMetadata: false,
    withoutMenu: false,
    withoutFullscreen: false,
    closeable: false,
    onClose: null,
    onInteraction: null,
    onEnd: null,
    onViewModeChange: null,
    className: null,
};

const Viewer = ({
    story,
    basePath,
    theme,
    width,
    height,
    screen: screenId,
    deviceScreens,
    renderContext,
    onScreenChange,
    tapNextScreenWidthPercent,
    neighborScreensActive,
    storyIsParsed,
    landscapeScreenMargin,
    withMetadata,
    withoutMenu,
    withoutFullscreen, // eslint-disable-line no-unused-vars
    closeable,
    onClose,
    onInteraction,
    onEnd,
    onViewModeChange,
    className,
}) => {
    const parsedStory = useParsedStory(story, { disabled: storyIsParsed }) || {};
    const { components: screens = [], title = null, metadata = null, fonts = null } = parsedStory;

    const { textStyle: themeTextStyle = null } = theme || {};
    const { fontFamily: themeFont = null } = themeTextStyle || {};

    // Fonts

    const finalFonts = useMemo(
        () => [...(fonts || []), themeFont].filter((font) => font !== null),
        [fonts],
    );
    const { loaded: fontsLoaded } = useLoadedFonts(finalFonts); // eslint-disable-line

    const shareUrl = useMemo(() => {
        const origin =
            typeof window !== 'undefined' ? window.location.origin.replace(/\/+$/, '') : '';
        const path = basePath !== null ? `${origin}${basePath}` : origin;
        return path;
    }, [basePath]);

    const isView = renderContext === 'view';
    const isStatic = renderContext === 'static';
    const isCapture = renderContext === 'capture';

    const trackScreenView = useTrackScreenView();
    const trackEvent = useTrackEvent();

    const contentRef = useRef(null);

    // Get screen size

    const { ref: containerRef, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });
    const {
        width: screenWidth = null,
        height: screenHeight = null,
        landscape = false,
        menuOverScreen = false,
    } = screenSize || {};

    useEffect(() => {
        if (onViewModeChange !== null) {
            onViewModeChange({ landscape });
        }
    }, [landscape, onViewModeChange]);

    // Get dots menu height

    const {
        ref: menuDotsContainerRef,
        entry: { contentRect: menuDotsContainerRect },
    } = useResizeObserver();

    const { height: menuDotsContainerHeight = 0 } = menuDotsContainerRect || {};

    // Get preview menu height

    const {
        ref: menuPreviewContainerRef,
        entry: { contentRect: menuPreviewContainerRect },
    } = useResizeObserver();

    const { height: menuPreviewContainerHeight = 0 } = menuPreviewContainerRect || {};

    // Screen index

    const screenIndex = useMemo(
        () =>
            Math.max(
                0,
                screens.findIndex((it) => String(it.id) === String(screenId)),
            ),
        [screenId, screens],
    );

    const changeIndex = useCallback(
        (index) => {
            if (index === screenIndex) {
                return;
            }
            if (onScreenChange !== null) {
                onScreenChange(screens[index], index);
            }
        },
        [screenIndex, screens, onScreenChange],
    );

    // Track screen view

    const trackingEnabled = isView;
    const validIndex = screens.length > 0 && screenIndex < screens.length;
    const currentScreen = validIndex ? screens[screenIndex] : null;
    const { type: screenType = null } = currentScreen || {};

    useEffect(() => {
        if (trackingEnabled && currentScreen !== null) {
            trackScreenView(currentScreen, screenIndex);
        }
    }, [currentScreen, trackScreenView, trackingEnabled]);

    // Handle interaction enable

    const onScreenPrevious = useCallback(() => {
        changeIndex(Math.max(0, screenIndex - 1));
    }, [changeIndex]);

    const onScreenNext = useCallback(() => {
        changeIndex(Math.min(screens.length - 1, screenIndex + 1));
    }, [changeIndex]);

    const screensCount = screens.length;
    const [screensInteractionEnabled, setScreensInteractionEnabled] = useState(
        screens.map(() => true),
    );

    useEffect(() => {
        setScreensInteractionEnabled([...Array(screensCount).keys()].map(() => true));
    }, [screensCount]);
    const currentScreenInteractionEnabled = screensInteractionEnabled[screenIndex];

    const onEnableInteraction = useCallback(() => {
        if (!screensInteractionEnabled[screenIndex]) {
            const newArray = [...screensInteractionEnabled];
            newArray[screenIndex] = true;
            setScreensInteractionEnabled(newArray);
        }
    }, [screenIndex, screensInteractionEnabled, setScreensInteractionEnabled]);

    const onDisableInteraction = useCallback(() => {
        if (screensInteractionEnabled[screenIndex]) {
            const newArray = [...screensInteractionEnabled];
            newArray[screenIndex] = false;
            setScreensInteractionEnabled(newArray);
        }
    }, [screenIndex, screensInteractionEnabled, setScreensInteractionEnabled]);

    // handle screenClick

    const onInteractionPrivate = useCallback(() => {
        if (onInteraction !== null) {
            onInteraction();
        }
    }, [onInteraction]);

    const onScreenClick = useCallback(
        (e, index) => {
            onInteractionPrivate();

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

            const tappedCurrent = screenIndex === index;

            if ((!isView && tappedCurrent) || checkClickable(e.target)) {
                return;
            }

            const it = screens[screenIndex] || null;
            const interactionEnabled = screensInteractionEnabled[screenIndex];

            if (it === null || (tappedCurrent && !interactionEnabled)) {
                return;
            }

            let nextIndex = screenIndex;

            const { left: contentX = 0 } = e.currentTarget.getBoundingClientRect();
            const tapX = e.clientX;
            const hasTappedLeft = tappedCurrent
                ? tapX - contentX < screenWidth * (1 - tapNextScreenWidthPercent)
                : screenIndex > index;

            if (hasTappedLeft) {
                nextIndex = landscape ? index : Math.max(0, screenIndex - 1);
            } else {
                nextIndex = landscape ? index : Math.min(screens.length - 1, screenIndex + 1);

                const isLastScreen = screenIndex === screens.length - 1;
                if (isLastScreen && onEnd !== null) {
                    onEnd();
                }
            }
            changeIndex(nextIndex);
        },
        [
            onScreenChange,
            screenWidth,
            screens,
            changeIndex,
            screenIndex,
            screensInteractionEnabled,
            isView,
            onInteractionPrivate,
            onEnd,
        ],
    );

    // swipe menu open

    const menuOpened = useRef(false);
    const [{ y: menuY }, setMenuSpring] = useSpring(() => ({
        y: 0,
        config: { ...config.stiff, clamp: true },
    }));
    const menuPreviewStyle = {
        transform: menuY.to((y) => `translateY(${y * menuPreviewContainerHeight}px)`),
    };

    const menuDragBind = useDrag(
        ({ movement: [, my], first, last, direction: [, dy], cancel, canceled, tap }) => {
            if (canceled || tap) {
                return;
            }

            const isMenuOpened = menuOpened.current;

            if (first) {
                if (isMenuOpened) {
                    cancel();
                    return;
                }
            }

            const yProgress = Math.max(
                0,
                Math.min(1, my / menuPreviewContainerHeight + (isMenuOpened ? 1 : 0)),
            );

            if (last) {
                const menuNowOpened = dy > 0 && yProgress > 0.1;
                menuOpened.current = menuNowOpened;
                setMenuSpring.start({ y: menuNowOpened ? 1 : 0 });
            } else {
                setMenuSpring.start({ y: yProgress });
            }
        },
        { axis: 'y', filterTaps: true },
    );

    // Handle dot menu item click

    const onClickDotsMenuItem = useCallback(
        (index) => {
            onInteractionPrivate();

            const clickedOnDot = index !== null;
            const goToScreen = landscape && clickedOnDot;

            if (goToScreen) {
                changeIndex(index);
            } else {
                setMenuSpring.start({ y: menuOpened.current ? 0 : 1 });
                menuOpened.current = !menuOpened.current;
            }
            if (trackingEnabled) {
                const trackAction = goToScreen ? 'click_screen_change' : 'click_open';
                const trackLabel = clickedOnDot ? `Screen ${index + 1}` : 'Menu icon';
                trackEvent('viewer_menu', trackAction, trackLabel, {
                    screenId,
                    screenType,
                    screenIndex: index,
                });
            }
        },
        [
            changeIndex,
            landscape,
            trackingEnabled,
            trackEvent,
            screenId,
            screenType,
            onInteractionPrivate,
        ],
    );

    // handle preview menu item click

    const onClickPreviewMenuItem = useCallback(
        (index) => {
            changeIndex(index);
            setMenuSpring.start({ y: 0 });
            menuOpened.current = false;

            if (trackingEnabled) {
                trackEvent('viewer_menu', 'click_screen_change', `Screen ${index + 1}`, {
                    screenId,
                    screenType,
                    screenIndex: index,
                });
            }
        },
        [changeIndex, trackingEnabled, trackEvent, screenId, screenType],
    );

    // Handle preview menu close click

    const onClickPreviewMenuClose = useCallback(() => {
        setMenuSpring.start({ y: 0 });
        menuOpened.current = false;
        if (trackingEnabled) {
            trackEvent('viewer_menu', 'click_close', 'Close icon', {
                screenId,
                screenIndex,
                screenType,
            });
        }
    }, [trackingEnabled, trackEvent, screenId, screenIndex, screenType]);

    // Handle preview menu share click

    const onClickShare = useCallback(
        (type) => {
            if (trackingEnabled) {
                trackEvent('viewer_menu', 'click_share', type, {
                    screenId,
                    screenIndex,
                    screenType,
                });
            }
        },
        [trackingEnabled, trackEvent, screenId, screenIndex, screenType],
    );

    const withoutScreensTransforms = isStatic || isCapture;
    const hasSize = screenWidth > 0 && screenHeight > 0;
    const ready = hasSize; // && fontsLoaded;

    const menuVisible = screensCount === 0 || currentScreenInteractionEnabled;
    const overscrollStyle = (
        <style type="text/css">{`body { overscroll-behavior: contain; }`}</style>
    );

    // Fullscreen
    const {
        toggle: toggleFullscreen,
        active: fullscreenActive,
        enabled: fullscreenEnabled,
    } = useFullscreen(containerRef.current || null);

    return (
        <ScreenSizeProvider size={screenSize}>
            <ViewerProvider menuVisible={menuVisible} menuSize={menuDotsContainerHeight}>
                {withMetadata ? (
                    <Meta title={title} metadata={metadata}>
                        {overscrollStyle}
                    </Meta>
                ) : (
                    <Helmet>{overscrollStyle}</Helmet>
                )}
                <FontFaces fonts={finalFonts} />
                <div
                    className={classNames([
                        styles.container,
                        screenSize.screens.map((screenName) => `story-screen-${screenName}`),
                        {
                            [styles.landscape]: landscape,
                            [styles.hideMenu]: !menuVisible,
                            [styles.ready]: ready || withoutScreensTransforms,
                            [className]: className,
                        },
                    ])}
                    ref={containerRef}
                >
                    {!withoutMenu ? (
                        <>
                            <div
                                className={styles.menuDotsContainer}
                                ref={menuDotsContainerRef}
                                style={{ width: screenWidth }}
                                {...menuDragBind()}
                            >
                                <MenuDots
                                    direction="horizontal"
                                    withShadow={menuOverScreen}
                                    items={screens}
                                    current={screenIndex}
                                    onClickItem={onClickDotsMenuItem}
                                    closeable={closeable}
                                    onClose={onClose}
                                    className={styles.menuDots}
                                />
                            </div>
                            <animated.div
                                className={styles.menuPreviewContainer}
                                style={menuPreviewStyle}
                                ref={menuPreviewContainerRef}
                            >
                                <MenuPreview
                                    theme={theme}
                                    title={title}
                                    shareUrl={shareUrl}
                                    className={styles.menuPreview}
                                    screenWidth={screenWidth}
                                    screenHeight={screenHeight}
                                    items={screens}
                                    current={screenIndex}
                                    onClickItem={onClickPreviewMenuItem}
                                    onClose={onClickPreviewMenuClose}
                                    onShare={onClickShare}
                                    toggleFullscreen={toggleFullscreen}
                                    fullscreenActive={fullscreenActive}
                                    fullscreenEnabled={fullscreenEnabled}
                                />
                            </animated.div>
                        </>
                    ) : null}
                    {ready || withoutScreensTransforms ? (
                        <div ref={contentRef} className={styles.content}>
                            {screens.map((scr, i) => {
                                const current = i === screenIndex;
                                const active =
                                    i > screenIndex - neighborScreensActive &&
                                    i < screenIndex + neighborScreensActive;

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
                                const key = `screen-viewer-${scr.id || ''}-${i + 1}`;
                                const screenTransform = landscape
                                    ? `translateX(calc(${
                                          (screenWidth + landscapeScreenMargin) * (i - screenIndex)
                                      }px - 50%)) scale(${current ? 1 : 0.9})`
                                    : `translateX(${current ? 0 : '100%'})`;
                                return (
                                    <div
                                        key={key}
                                        style={{
                                            width: landscape ? screenWidth : null,
                                            height: landscape ? screenHeight : null,
                                            transform: !withoutScreensTransforms
                                                ? screenTransform
                                                : null,
                                        }}
                                        className={classNames([
                                            styles.screen,
                                            { [styles.current]: current },
                                        ])}
                                        {...{
                                            onClick: (e) => {
                                                onScreenClick(e, i);
                                            },
                                        }}
                                    >
                                        {viewerScreen}
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                </div>
            </ViewerProvider>
        </ScreenSizeProvider>
    );
};

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
