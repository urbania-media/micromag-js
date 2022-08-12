/* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/no-static-element-interactions, no-param-reassign, jsx-a11y/click-events-have-key-events, react/no-array-index-key, react/jsx-props-no-spreading, no-nested-ternary */
import { useSprings } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import EventEmitter from 'wolfy87-eventemitter';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { FontFaces, Meta } from '@micromag/core/components';
import {
    ScreenSizeProvider,
    ViewerProvider,
    usePlaybackContext,
    VisitorProvider,
} from '@micromag/core/contexts';
import {
    useFullscreen,
    useLoadedFonts,
    useParsedStory,
    useDimensionObserver,
    useScreenSizeFromElement,
    useTrackScreenView,
} from '@micromag/core/hooks';
import { getDeviceScreens } from '@micromag/core/utils';

import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import useScreenInteraction from '../hooks/useScreenInteraction';

import ViewerMenu from './ViewerMenu';
import ViewerScreen from './ViewerScreen';
import NavigationButton from './partials/NavigationButton';
import PlaybackControls from './partials/PlaybackControls';
import WebView from './partials/WebView';

import styles from '../styles/viewer.module.scss';

const springConfig = { tension: 250, friction: 30 }; // tight

const propTypes = {
    story: MicromagPropTypes.story, // .isRequired,
    basePath: PropTypes.string,
    theme: MicromagPropTypes.viewerTheme,
    width: PropTypes.number,
    height: PropTypes.number,
    screen: PropTypes.string,
    screenState: PropTypes.string,
    deviceScreens: MicromagPropTypes.deviceScreens,
    renderContext: MicromagPropTypes.renderContext,
    visitor: MicromagPropTypes.visitor,
    onScreenChange: PropTypes.func,
    tapNextScreenWidthPercent: PropTypes.number,
    neighborScreensActive: PropTypes.number,
    neighborScreensMounted: PropTypes.number,
    storyIsParsed: PropTypes.bool,
    // landscapeScreenMargin: PropTypes.number,
    // landscapeSmallScreenScale: PropTypes.number,
    withMetadata: PropTypes.bool,
    withoutMenu: PropTypes.bool,
    withoutScreensMenu: PropTypes.bool,
    withoutShareMenu: PropTypes.bool,
    withoutMenuShadow: PropTypes.bool,
    withoutFullscreen: PropTypes.bool,
    withLandscapeSiblingsScreens: PropTypes.bool,
    withNavigationHint: PropTypes.bool,
    withoutPlaybackControls: PropTypes.bool,
    closeable: PropTypes.bool,
    onClose: PropTypes.func,
    onInteraction: PropTypes.func,
    onEnd: PropTypes.func,
    onViewModeChange: PropTypes.func,
    currentScreenMedia: MicromagPropTypes.ref,
    menuIsScreenWidth: PropTypes.bool,
    screensMedias: MicromagPropTypes.ref,
    screenSizeOptions: PropTypes.shape({
        withoutMaxSize: PropTypes.bool,
        desktopHeightRatio: PropTypes.number,
        screenRatio: PropTypes.number,
    }),
    className: PropTypes.string,
};

const defaultProps = {
    story: null,
    theme: null,
    basePath: null,
    width: null,
    height: null,
    screen: null,
    screenState: null,
    deviceScreens: getDeviceScreens(),
    renderContext: 'view',
    visitor: null,
    onScreenChange: null,
    tapNextScreenWidthPercent: 0.8,
    neighborScreensActive: 1,
    neighborScreensMounted: 1,
    storyIsParsed: false,
    // landscapeScreenMargin: 20,
    // landscapeSmallScreenScale: 0.9,
    withMetadata: false,
    withoutMenu: false,
    withoutScreensMenu: false,
    withoutShareMenu: false,
    withoutMenuShadow: false,
    withoutFullscreen: false,
    withLandscapeSiblingsScreens: false,
    withNavigationHint: false,
    withoutPlaybackControls: false,
    menuIsScreenWidth: false,
    closeable: false,
    onClose: null,
    onInteraction: null,
    onEnd: null,
    onViewModeChange: null,
    currentScreenMedia: null,
    screensMedias: null,
    screenSizeOptions: null,
    className: null,
};

const Viewer = ({
    story,
    basePath,
    theme: viewerTheme,
    width,
    height,
    screen: screenId,
    screenState,
    deviceScreens,
    renderContext,
    visitor,
    tapNextScreenWidthPercent,
    neighborScreensActive,
    neighborScreensMounted,
    storyIsParsed,
    // landscapeScreenMargin,
    // landscapeSmallScreenScale,
    withMetadata,
    withoutMenu,
    withoutScreensMenu,
    withoutShareMenu,
    withoutMenuShadow,
    withoutFullscreen, // eslint-disable-line no-unused-vars
    withLandscapeSiblingsScreens,
    withNavigationHint,
    withoutPlaybackControls,
    menuIsScreenWidth,
    closeable,
    onClose: onCloseViewer,
    onInteraction,
    onEnd,
    onScreenChange,
    onViewModeChange,
    currentScreenMedia,
    screensMedias,
    screenSizeOptions,
    className,
}) => {
    const intl = useIntl();
    const contentRef = useRef(null);

    /**
     * Screen Data + Processing
     */
    const parsedStory = useParsedStory(story, { disabled: storyIsParsed }) || {};
    const { components: screens = [], title = null, metadata = null, fonts = null } = parsedStory;
    const screensCount = screens.length;
    const eventsManager = useMemo(() => new EventEmitter(), [parsedStory]);
    const screenIndex = useMemo(
        () =>
            Math.max(
                0,
                screens.findIndex((it) => `${it.id}` === `${screenId}`),
            ),
        [screenId, screens],
    );
    const currentScreen = screens[screenIndex] || null;
    const { parameters: screenParameters } = currentScreen || {};
    const { metadata: screenMetadata } = screenParameters || {};
    const { title: screenTitle = null, description: screenDescription = null } =
        screenMetadata || {};
    const finalTitle = screenTitle !== null ? screenTitle : title;
    const finalMetadata = useMemo(
        () =>
            screenDescription !== null ? { ...metadata, description: screenDescription } : metadata,
        [metadata, screenDescription],
    );

    const screensMediasRef = useRef([]);

    if (currentScreenMedia !== null) {
        currentScreenMedia.current = screensMediasRef.current[screenIndex] || null;
    }

    if (screensMedias !== null) {
        screensMedias.current = screensMediasRef.current;
    }

    // @todo
    // const { startIndex: mountedScreenStartIndex, endIndex: mountedScreenEndIndex } = useMemo(

    //     () =>
    //         neighborScreensMounted !== null
    //             ? {
    //                   startIndex: Math.max(
    //                       screenIndex - (neighborScreensActive + neighborScreensMounted),
    //                       0,
    //                   ),
    //                   endIndex: Math.min(
    //                       screenIndex + (neighborScreensActive + neighborScreensMounted),
    //                       screensCount,
    //                   ),
    //               }
    //             : {
    //                   startIndex: 0,
    //                   endIndex: screensCount - 1,
    //               },
    //     [screenIndex, neighborScreensActive, neighborScreensMounted, screensCount],
    // );

    // @todo unused: still needed?!
    // const mountedScreens = useMemo(
    //     () =>
    //         neighborScreensMounted != null
    //             ? screens.slice(mountedScreenStartIndex, mountedScreenEndIndex)
    //             : screens,
    //     [
    //         screens,
    //         mountedScreenStartIndex,
    //         mountedScreenEndIndex,
    //         neighborScreensActive,
    //         neighborScreensMounted,
    //     ],
    // );

    /**
     * Screen Layout
     */
    // Viewer Theme
    const { textStyles } = viewerTheme || {};
    const { title: themeTextStyle = null } = textStyles || {};
    const { fontFamily: themeFont = null } = themeTextStyle || {};

    // Fonts
    const finalFonts = useMemo(
        () => [...(fonts || []), themeFont].filter((font) => font !== null),
        [fonts],
    );
    const { loaded: fontsLoaded } = useLoadedFonts(finalFonts); // eslint-disable-line

    const isView = renderContext === 'view';
    const isStatic = renderContext === 'static';
    const isCapture = renderContext === 'capture';

    const withoutScreensTransforms = isStatic || isCapture;

    const {
        playing,
        controls: playbackControls = false,
        controlsVisible: playbackcontrolsVisible = false,
        media: playbackMedia = null,
    } = usePlaybackContext();

    const { ref: playbackControlsContainerRef, height: playbackControlsContainerHeight = 0 } =
        useDimensionObserver();

    const trackScreenView = useTrackScreenView();

    // Get screen size
    const {
        ref: containerRef,
        screenSize,
        scale: screenScale,
    } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
        ...screenSizeOptions,
    });

    const {
        width: screenWidth = null,
        height: screenHeight = null,
        landscape = false,
        menuOverScreen = false,
    } = screenSize || {};
    const screenContainerWidth = screenScale !== null ? screenWidth * screenScale : screenWidth;
    const screenContainerHeight = screenScale !== null ? screenHeight * screenScale : screenHeight;

    const hasSize = screenWidth > 0 && screenHeight > 0;
    const ready = hasSize; // && fontsLoaded;

    useEffect(() => {
        if (ready && onViewModeChange !== null) {
            onViewModeChange({ landscape, menuOverScreen });
        }
    }, [ready, landscape, menuOverScreen, onViewModeChange]);

    // Track screen view
    const trackingEnabled = isView;
    useEffect(() => {
        if (trackingEnabled && currentScreen !== null) {
            trackScreenView(currentScreen, screenIndex);
        }
    }, [currentScreen, trackScreenView, trackingEnabled]);

    /**
     * Screen Transitions
     */
    const [screenSprings, transition] = useSprings(screensCount, (i) => ({
        scale: i >= screenIndex ? 1 : 0.8,
        x: i > screenIndex ? '100%' : '0%',
        shadow: 0,
        zIndex: i >= screenIndex ? 2 : 1,
        config: springConfig,
    }));

    const onScreenTransition = useCallback(
        ({
            index = 0,
            ratio: initialRatio = null,
            immediate: initialImmediate = false,
            reset = false,
        }) => {
            const immediate = initialImmediate || initialRatio !== null;
            const ratio = initialRatio || 0;

            if (reset) {
                transition.start((i) => (i === index ? { immediate: true, zIndex: 4 } : null));
            }

            transition.start((i) => {
                // next screens
                if (i > index) {
                    return {
                        immediate,
                        scale: 1,
                        x: `${100 + Math.max(-1, Math.min(1, ratio)) * 100}%`,
                        shadow: ratio < 0 ? Math.min(1, Math.max(0, ratio)) : 0,
                        zIndex: 3
                    };
                }
                // current screen
                if (i === index) {
                    return {
                        immediate,
                        scale: 1 + Math.min(0, ratio) * 0.2,
                        x: `${Math.max(0, Math.min(1, ratio)) * 100}%`,
                        shadow: ratio > 0 ? Math.min(1, ratio) : 0,
                        zIndex: 2
                    };
                }
                // previous screens
                if (i < index) {
                    return {
                        immediate,
                        scale: 0.8 + Math.min(1, ratio) * 0.2,
                        shadow: 0,
                        x: '0%',
                        zIndex: 1
                    };
                }
            });
        },
        [transition],
    );

    /**
     * Screen Navigation
     */
    const changeIndex = useCallback(
        (index) => {
            if (index === screenIndex) {
                return;
            }

            if (currentScreenMedia !== null) {
                currentScreenMedia.current = screensMediasRef.current[index] || null;
            }

            onScreenTransition({ index, reset: index > screenIndex });

            if (onScreenChange !== null) {
                onScreenChange(screens[index], index);
            }
        },
        [screenIndex, screens, onScreenTransition, onScreenChange],
    );

    const onScreenNavigate = useCallback(
        ({ index, newIndex, end, direction }) => {
            if (end && onEnd !== null) {
                onEnd();
            }
            changeIndex(newIndex);
            eventsManager.emit('navigate', {
                newIndex,
                index,
                direction,
                end,
            });
            if (end) {
                eventsManager.emit('navigate_end');
            } else {
                eventsManager.emit(`navigate_${direction}`, newIndex);
            }
        },
        [onEnd, changeIndex],
    );

    const onDragContent = useCallback(
        ({ active, velocity: [vx], movement: [mx], tap, currentTarget, xy: [x] }) => {
            if (tap) {
                const { left: contentX = 0, width: contentWidth = 0 } =
                    currentTarget.getBoundingClientRect();
                const hasTappedLeft = x - contentX < contentWidth * 0.5;
                const nextIndex = hasTappedLeft
                    ? Math.max(0, screenIndex - 1)
                    : Math.min(screensCount - 1, screenIndex + 1);

                onScreenNavigate({
                    index: screenIndex,
                    newIndex: nextIndex,
                });

                return;
            }

            const ratio = mx / screenContainerWidth; // drag "ratio": how much of the screen width has been swiped?
            const forwards = mx < 0; // true if swiping to left (to navigate forwards)
            const nextIndex = !forwards
                ? Math.max(0, screenIndex - 1)
                : Math.min(screensCount - 1, screenIndex + 1);

            if (!tap) {
                onScreenTransition({ index: screenIndex, ratio });
            }

            if (!active) {
                if (vx > 0.3 || Math.abs(ratio) > 0.3) {
                    onScreenNavigate({
                        index: screenIndex,
                        newIndex: nextIndex,
                    });
                } else {
                    onScreenTransition({ index: screenIndex });
                }
            }
        },
        [
            screenIndex,
            screensCount,
            landscape,
            withLandscapeSiblingsScreens,
            screenContainerWidth,
            onScreenTransition,
        ],
    );

    const dragContentBind = useDrag(onDragContent, {
        filterTaps: true,
    });

    const gotoPreviousScreen = useCallback(() => {
        changeIndex(Math.max(0, screenIndex - 1));
    }, [changeIndex]);

    const gotoNextScreen = useCallback(() => {
        changeIndex(Math.min(screens.length - 1, screenIndex + 1));
    }, [changeIndex]);

    // Handle tap on screens
    // @todo still needed? was conflicting somewhat with tap, buttons, etc.
    // const onDragScreen = useCallback(
    //     ({ args: [tapScreenIndex], event, target, currentTarget, tap, xy: [x, y] }) => {
    //         if (tap) {
    //             interactWithScreen({
    //                 event,
    //                 target,
    //                 currentTarget,
    //                 index: tapScreenIndex,
    //                 x,
    //                 y,
    //             });
    //         }
    //     },
    //     [interactWithScreen],
    // );
    // const dragScreenBind = useDrag(onDragScreen, {
    //     filterTaps: true,
    // });

    /**
     * Screen Interaction
     */
    const {
        toggle: toggleFullscreen,
        active: fullscreenActive,
        enabled: fullscreenEnabled,
    } = useFullscreen(containerRef.current || null);

    const onScreenKeyUp = useCallback(
        ({ key }, i) => {
            if (key === 'Enter' && withLandscapeSiblingsScreens && landscape && i !== screenIndex) {
                changeIndex(i);
            }
        },
        [withLandscapeSiblingsScreens, changeIndex, landscape, screenIndex],
    );

    const [hasInteracted, setHasInteracted] = useState(false);

    const onInteractionPrivate = useCallback(() => {
        if (onInteraction !== null) {
            onInteraction();
        }
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    }, [onInteraction, hasInteracted, setHasInteracted]);

    const {
        // interact: interactWithScreen,
        currentScreenInteractionEnabled,
        enableInteraction,
        disableInteraction,
    } = useScreenInteraction({
        screens,
        screenIndex,
        screenWidth: screenContainerWidth,
        disableCurrentScreenNavigation: !isView,
        clickOnSiblings: landscape && withLandscapeSiblingsScreens,
        nextScreenWidthPercent: tapNextScreenWidthPercent,
        onInteract: onInteractionPrivate,
        onNavigate: onScreenNavigate,
    });

    // swipe menu open
    const menuVisible = screensCount === 0 || currentScreenInteractionEnabled;
    const [menuOpened, setMenuOpened] = useState(false);

    // Get element height
    const { ref: menuDotsContainerRef, height: menuDotsContainerHeight = 0 } =
        useDimensionObserver();

    const onMenuRequestOpen = useCallback(() => setMenuOpened(true), [setMenuOpened]);
    const onMenuRequestClose = useCallback(() => setMenuOpened(false), [setMenuOpened]);

    const onClickMenu = useCallback(() => {
        onInteractionPrivate();
        setMenuOpened(true);
    }, [changeIndex, onInteractionPrivate, setMenuOpened]);

    const onClickMenuItem = useCallback(
        ({ screenId: itemScreenId }) => {
            onInteractionPrivate();
            const index = screens.findIndex(({ id }) => id === itemScreenId);
            changeIndex(index);
            if (menuOpened) {
                setMenuOpened(false);
            }
        },
        [onInteractionPrivate, changeIndex, menuOpened, setMenuOpened],
    );

    const onContextMenu = useCallback(
        (e) => {
            if (!landscape) {
                e.preventDefault();
                return false;
            }
            return true;
        },
        [landscape],
    );

    const overscrollStyle = (
        <style type="text/css">{`body { overscroll-behavior: contain; }`}</style>
    );

    // Keyboard Event
    const keyboardShortcuts = useMemo(
        () => ({
            f: () => toggleFullscreen(),
            m: () => setMenuOpened(!menuOpened),
            escape: () => setMenuOpened(false),
            arrowleft: () => gotoPreviousScreen(),
            arrowright: () => gotoNextScreen(),
            ' ': () => gotoNextScreen(),
        }),
        [menuOpened, setMenuOpened, gotoPreviousScreen, gotoNextScreen],
    );
    useKeyboardShortcuts(keyboardShortcuts, {
        disabled: renderContext !== 'view',
    });

    return (
        <VisitorProvider visitor={visitor}>
            <ScreenSizeProvider size={screenSize}>
                <ViewerProvider
                    containerRef={containerRef}
                    events={eventsManager}
                    menuVisible={menuVisible}
                    menuOverScreen={menuOverScreen}
                    topHeight={
                        menuOverScreen && currentScreenInteractionEnabled
                            ? menuDotsContainerHeight / screenScale
                            : 0
                    }
                    bottomHeight={
                        playbackControls &&
                        (playbackcontrolsVisible || !playing) &&
                        currentScreenInteractionEnabled
                            ? playbackControlsContainerHeight / screenScale
                            : 0
                    }
                    bottomSidesWidth={
                        (playbackcontrolsVisible || !playing || playbackMedia !== null) &&
                        currentScreenInteractionEnabled
                            ? 60 / screenScale
                            : 0
                    }
                    gotoPreviousScreen={gotoPreviousScreen}
                    gotoNextScreen={gotoNextScreen}
                    disableInteraction={disableInteraction}
                    enableInteraction={enableInteraction}
                >
                    {withMetadata ? (
                        <Meta title={finalTitle} metadata={finalMetadata}>
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
                                [styles.withSiblings]: withLandscapeSiblingsScreens,
                                [styles.hideMenu]: !menuVisible,
                                [styles.fadeMenu]:
                                    playing && playbackControls && !playbackcontrolsVisible,
                                [styles.ready]: ready || withoutScreensTransforms,
                                [styles.hasInteracted]: hasInteracted,
                                [className]: className,
                            },
                        ])}
                        ref={containerRef}
                        onContextMenu={onContextMenu}
                    >
                        {!withoutMenu ? (
                            <ViewerMenu
                                story={parsedStory}
                                currentScreenIndex={screenIndex}
                                opened={menuOpened}
                                withShadow={menuOverScreen && !withoutMenuShadow}
                                toggleFullscreen={toggleFullscreen}
                                fullscreenActive={fullscreenActive}
                                fullscreenEnabled={fullscreenEnabled}
                                closeable={closeable}
                                shareBasePath={basePath}
                                screenSize={screenSize}
                                menuWidth={menuIsScreenWidth ? screenContainerWidth : null}
                                trackingEnabled={trackingEnabled}
                                onClickItem={onClickMenuItem}
                                onClickMenu={onClickMenu}
                                onClickShare={onClickMenu}
                                onClickCloseViewer={onCloseViewer}
                                onRequestOpen={onMenuRequestOpen}
                                onRequestClose={onMenuRequestClose}
                                withDotItemClick={screenContainerWidth > 400}
                                withoutScreensMenu={withoutScreensMenu}
                                withoutShareMenu={withoutShareMenu}
                                refDots={menuDotsContainerRef}
                            />
                        ) : null}
                        {ready || withoutScreensTransforms ? (
                            <div ref={contentRef} className={styles.content} {...dragContentBind()}>
                                {screenIndex > 0 && screens.length > 1 ? (
                                    <NavigationButton
                                        direction="previous"
                                        className={classNames([styles.navButton, styles.previous])}
                                        onClick={gotoPreviousScreen}
                                    />
                                ) : null}
                                {screens.map((screen, i) => {
                                    // @todo make sure everything loads correctly, etc.
                                    // const i = mountedScreenStartIndex + mountedIndex;
                                    const current = i === parseInt(screenIndex, 10);
                                    const active =
                                        i >= screenIndex - neighborScreensActive &&
                                        i <= screenIndex + neighborScreensActive;

                                    // @todo abandoning landscape mode eventually or not?
                                    // let screenTransform = null;

                                    // if (landscape) {
                                    //     const max = i - screenIndex;
                                    //     let distance =
                                    //         (screenContainerWidth + landscapeScreenMargin) * max;
                                    //     // Compensates for scaling
                                    //     if (max !== 0) {
                                    //         const halfMargin =
                                    //             (screenContainerWidth *
                                    //                 (1 - landscapeSmallScreenScale)) /
                                    //             2;
                                    //         distance -= halfMargin * max;
                                    //         if (max < -1) {
                                    //             distance -= halfMargin * (max + 1);
                                    //         } else if (max > 1) {
                                    //             distance -= halfMargin * (max - 1);
                                    //         }
                                    //     }
                                    //     screenTransform = withLandscapeSiblingsScreens
                                    //         ? `translateX(calc(${distance}px - 50%)) scale(${
                                    //               current ? 1 : landscapeSmallScreenScale
                                    //           })`
                                    //         : null;
                                    // } else {
                                    //     screenTransform = `translateX(${current ? 0 : '100%'})`;
                                    // }

                                    const { shadow = null } = screenSprings[i];
                                    // const { shadow = null } = ...screenSprings[i],
                                    const finalStyles = {
                                        zIndex: 1,
                                        ...screenSprings[i],
                                        boxShadow: shadow.to(
                                            (v) => `0 0 ${10 * v}rem -5rem rgba(0,0,0,${v})`,
                                        ),
                                    };

                                    return (
                                        <animated.div
                                            key={`screen-viewer-${screen.id || ''}-${i + 1}`}
                                            className={styles.transitionContainer}
                                            style={finalStyles}
                                        >
                                            <div
                                                style={{
                                                    width: screenContainerWidth,
                                                    height: screenContainerHeight,
                                                    // transform: !withoutScreensTransforms
                                                    //     ? screenTransform
                                                    //     : null,
                                                }}
                                                className={classNames([
                                                    styles.screenContainer,
                                                    {
                                                        [styles.current]: current,
                                                        [styles.visible]:
                                                            current || withLandscapeSiblingsScreens,
                                                    },
                                                ])}
                                                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                                                tabIndex={!active ? -1 : null}
                                                aria-hidden={!current}
                                                aria-label={intl.formatMessage(
                                                    {
                                                        defaultMessage: 'Screen {index}',
                                                        description: 'Button label',
                                                    },
                                                    { index: i + 1 },
                                                )}
                                                onKeyUp={(e) => onScreenKeyUp(e, i)}
                                                // {...dragScreenBind(i)}
                                            >
                                                {active && screen !== null ? (
                                                    <ViewerScreen
                                                        className={styles.screen}
                                                        screen={screen}
                                                        screenState={current ? screenState : null}
                                                        renderContext={renderContext}
                                                        index={i}
                                                        current={current}
                                                        active={active}
                                                        mediaRef={(ref) => {
                                                            screensMediasRef.current[i] = ref;
                                                        }}
                                                        width={screenWidth}
                                                        height={screenHeight}
                                                        scale={screenScale}
                                                        withNavigationHint={
                                                            withNavigationHint &&
                                                            !withLandscapeSiblingsScreens &&
                                                            current &&
                                                            screenIndex === 0 &&
                                                            !hasInteracted
                                                        }
                                                    />
                                                ) : null}
                                            </div>
                                        </animated.div>
                                    );
                                })}
                                {screenIndex < screens.length - 1 ? (
                                    <NavigationButton
                                        direction="next"
                                        className={classNames([styles.navButton, styles.next])}
                                        onClick={gotoNextScreen}
                                    />
                                ) : null}
                                {!withoutPlaybackControls ? (
                                    <div
                                        className={styles.playbackControls}
                                        ref={playbackControlsContainerRef}
                                    >
                                        <PlaybackControls className={styles.controls} />
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                        <WebView
                            className={styles.webView}
                            style={{
                                maxWidth: Math.max(screenContainerWidth, 600),
                            }}
                        />
                        {/* {d !== null && Object.keys(d).length > 0 ? (
                            <ul className={styles.debug}>
                                {Object.keys(d).map(k => (
                                    <li key={k}>
                                        <strong>{k}</strong>{`: `}<span>{d[k]}</span>
                                    </li>
                                ))}
                            </ul>
                        ): null} */}
                    </div>
                </ViewerProvider>
            </ScreenSizeProvider>
        </VisitorProvider>
    );
};

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
