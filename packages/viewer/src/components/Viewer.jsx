/* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/no-static-element-interactions, no-param-reassign, jsx-a11y/click-events-have-key-events, react/no-array-index-key, react/jsx-props-no-spreading, no-nested-ternary */
import { useSprings } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
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
    useTransitionStyles,
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

const SPRING_CONFIG_TIGHT = { tension: 300, friction: 35 }; // tight
const DRAG_PROGRESS_ACTIVATION_THRESHOLD = 0.3;
const DRAG_VELOCITY_ACTIVATION_THRESHOLD = 0.3;
const DEFAULT_TRANSITION_TYPE_LANDSCAPE = 'carousel';
const DEFAULT_TRANSITION_TYPE_PORTRAIT = 'stack';

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
    withoutGestures: PropTypes.bool,
    withoutMenu: PropTypes.bool,
    withoutScreensMenu: PropTypes.bool,
    withoutShareMenu: PropTypes.bool,
    withoutMenuShadow: PropTypes.bool,
    withoutFullscreen: PropTypes.bool,
    withoutNavigationArrow: PropTypes.bool,
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
    withoutGestures: false,
    withoutMenu: false,
    withoutScreensMenu: false,
    withoutShareMenu: false,
    withoutMenuShadow: false,
    withoutFullscreen: false,
    withLandscapeSiblingsScreens: false,
    withNavigationHint: false,
    withoutNavigationArrow: false,
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
    withoutGestures,
    withoutMenu,
    withoutScreensMenu,
    withoutShareMenu,
    withoutMenuShadow,
    withoutFullscreen, // eslint-disable-line no-unused-vars
    withoutNavigationArrow,
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

    /**
     * Screen Layout
     */
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
    const [isDragging, setIsDragging] = useState(false);
    const [screenTransition, setScreenTransition] = useState(0);
    const [transitionType, setTransitionType] = useState(DEFAULT_TRANSITION_TYPE_LANDSCAPE);

    /**
     * WARNING: MATH AHEAD!
     * Also: very very Work In Progress
     */
    const [carouselTransitionStyles, setCarouselTransitionStyles] = useState({});
    const onProgressChange = useCallback(
        (p) => {
            if (transitionType !== 'carousel') return;

            setCarouselTransitionStyles(
                screens.map((s, i) => {
                    const t = i - p;
                    return {
                        opacity: 0.25 + (1 - 0.25) * (1 - Math.abs(t)),
                        transform: `translateX(${t * 105}%) scale(${
                            1 - Math.abs(0.2 * Math.min(1, Math.max(-1, t)))
                        })`,
                        boxShadow: `0 0 ${2 * (1 + (1 - t))}rem ${0.25 * (1 - t)}rem black`,
                        zIndex: Math.abs(p),
                    };
                }),
            );
        },
        [screens, setCarouselTransitionStyles, transitionType],
    );
    useTransitionStyles(screenTransition, onProgressChange, {
        immediate: isDragging,
        config: SPRING_CONFIG_TIGHT,
    });

    const [stackTransitionStyles, setStackTransitionStyles] = useState({});
    const onStackProgressChange = useCallback(
        (p) => {
            if (transitionType !== 'stack') return;

            setStackTransitionStyles(
                screens.map((s, i) => {
                    const t = i - p;
                    const current = t < 1 && t > -1;
                    const prev = !current && t < 1;
                    const next = !current && t > -1;

                    if (next) {
                        return {
                            transform: `translateX(${t * 100}%) scale(1)`,
                            boxShadow: `0 0 ${t === current + 1 ? Math.abs(t) : 0}rem ${
                                0.25 * t === current + 1 ? Math.abs(t) : 0
                            }rem black`,
                            opacity: 1,
                            zIndex: 3,
                        };
                    }

                    if (current) {
                        return {
                            transform: `translateX(${Math.max(0, t) * 100}%) scale(${
                                1 + Math.min(0, t) * 0.2
                            })`,
                            boxShadow: `0 0 ${Math.abs(1 - t)}rem ${
                                0.25 * Math.abs(1 - t)
                            }rem black`,
                            opacity: 1,
                            zIndex: 2,
                        };
                    }

                    if (prev) {
                        return {
                            transform: `translateX(0%) scale(${0.8 + t * 0.2})`,
                            boxShadow: `0 0 0rem 0rem black`,
                            opacity: 1,
                            zIndex: 1,
                        };
                    }

                    return {};
                }),
            );
        },
        [screens, setStackTransitionStyles, transitionType]
    );
    useTransitionStyles(screenTransition, onStackProgressChange, {
        immediate: isDragging,
        config: SPRING_CONFIG_TIGHT,
    });

    const transitionTypes = {
        stack: stackTransitionStyles || {},
        carousel: carouselTransitionStyles || {},
    };

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

            if (onScreenChange !== null) {
                onScreenChange(screens[index], index);
            }
        },
        [screenIndex, screens, onScreenChange],
    );

    const onScreenNavigate = useCallback(
        ({ index, newIndex, end, direction }) => {
            if (end && onEnd !== null) {
                onEnd();
            }
            changeIndex(newIndex);
            eventsManager.emit('navigate', {
                index,
                newIndex,
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

    const gotoPreviousScreen = useCallback(() => {
        changeIndex(Math.max(0, screenIndex - 1));
    }, [changeIndex, screenIndex]);

    const gotoNextScreen = useCallback(() => {
        changeIndex(Math.min(screens.length - 1, screenIndex + 1));
    }, [changeIndex, screenIndex]);

    const [hasInteracted, setHasInteracted] = useState(false);

    const onInteractionPrivate = useCallback(() => {
        if (onInteraction !== null) {
            onInteraction();
        }
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    }, [onInteraction, hasInteracted, setHasInteracted]);

    // @todo document, educate, elucidate
    const {
        interact: interactWithScreen,
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

    const onDragContent = useCallback(
        ({
            args: [tapScreenIndex],
            active,
            currentTarget,
            event,
            movement: [mx],
            tap,
            target,
            velocity: [vx],
            xy: [x, y],
        }) => {
            if (!isView) {
                return;
            }

            if (tap) {
                interactWithScreen({
                    event,
                    target,
                    currentTarget,
                    index: tapScreenIndex,
                    x,
                    y,
                });

                return;
            }

            if (withoutGestures) {
                return;
            }

            const p = mx / screenContainerWidth; // drag "ratio": how much of the screen width has been swiped?
            const forwards = mx < 0; // true if swiping to left (to navigate forwards)
            const newIndex = !forwards ? screenIndex - 1 : screenIndex + 1; // which item index are we moving towards?
            const reachedThreshold =
                vx > DRAG_VELOCITY_ACTIVATION_THRESHOLD ||
                Math.abs(p) > DRAG_PROGRESS_ACTIVATION_THRESHOLD;
            const reachedBounds = newIndex < 0 || newIndex >= screensCount; // have we reached the end of the stack?
            const damper = reachedBounds ? 0.1 : 1;
            const progress = Math.max(-1, Math.min(1, p * damper));

            if (!tap) {
                setIsDragging(true);
                setScreenTransition(screenIndex - progress);
            }

            if (!active) {
                setIsDragging(false);
                if (reachedThreshold && !reachedBounds) {
                    onScreenNavigate({
                        index: screenIndex,
                        newIndex,
                    });
                } else {
                    setScreenTransition(screenIndex);
                }
            }
        },
        [
            isView,
            screenIndex,
            screensCount,
            landscape,
            withLandscapeSiblingsScreens,
            screenContainerWidth,
            interactWithScreen,
            setScreenTransition,
            setIsDragging,
        ],
    );

    const dragContentBind = useDrag(onDragContent, {
        filterTaps: true,
    });

    useEffect(() => {
        setScreenTransition(screenIndex);
    }, [screenIndex, setScreenTransition]);

    // @todo Work In Progress
    useEffect(() => {
        const newType = landscape
            ? DEFAULT_TRANSITION_TYPE_LANDSCAPE
            : DEFAULT_TRANSITION_TYPE_PORTRAIT;

        setTransitionType((type) => {
            console.log({type, m: 'setTransitionType'});
            if (newType !== type) {
                console.log({type, m: 'new type'});
                // update position if type is new?
                setScreenTransition(screenIndex);
                return newType;
            }

            return type;
        });
    }, [landscape, setScreenTransition, setTransitionType]);

    const {
        toggle: toggleFullscreen,
        active: fullscreenActive,
        enabled: fullscreenEnabled,
    } = useFullscreen(containerRef.current || null);

    // swipe menu open
    const menuVisible = screensCount === 0 || currentScreenInteractionEnabled; // ?
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

    // const onContextMenu = useCallback(
    //     (e) => {
    //         if (!landscape) {
    //             e.preventDefault();
    //             return false;
    //         }
    //         return true;
    //     },
    //     [landscape],
    // );

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
                        // onContextMenu={onContextMenu}
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
                            <div className={styles.content}>
                                {!withoutNavigationArrow &&
                                withLandscapeSiblingsScreens &&
                                screenIndex > 0 &&
                                screens.length > 1 ? (
                                    <NavigationButton
                                        direction="previous"
                                        className={classNames([styles.navButton, styles.previous])}
                                        onClick={gotoPreviousScreen}
                                    />
                                ) : null}
                                <div
                                    className={styles.screensFrame}
                                    style={{
                                        width: screenContainerWidth,
                                        height: screenContainerHeight,
                                    }}
                                    {...dragContentBind()}
                                >
                                    {screens.map((screen, i) => {
                                        const current = i === parseInt(screenIndex, 10);
                                        const active =
                                            i >= screenIndex - neighborScreensActive &&
                                            i <= screenIndex + neighborScreensActive;

                                        const screenStyles = isView && active
                                            ? transitionTypes[transitionType][i]
                                            : {};

                                        return (
                                            <div
                                                key={`screen-viewer-${screen.id || ''}-${i + 1}`}
                                                style={screenStyles}
                                                className={classNames([
                                                    styles.screenContainer,
                                                    {
                                                        [styles.current]: current,
                                                        [styles.visible]:
                                                            current || withLandscapeSiblingsScreens,
                                                    },
                                                ])}
                                            >
                                                {active && screen !== null ? (
                                                    <ViewerScreen
                                                        className={styles.screen}
                                                        screen={screen}
                                                        screenState={current ? screenState : null}
                                                        index={i}
                                                        current={current}
                                                        active={active}
                                                        mediaRef={(ref) => {
                                                            screensMediasRef.current[i] = ref;
                                                        }}
                                                        renderContext={renderContext}
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
                                        );
                                    })}
                                </div>
                                {!withoutNavigationArrow &&
                                withLandscapeSiblingsScreens &&
                                screenIndex < screens.length - 1 ? (
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
                    </div>
                </ViewerProvider>
            </ScreenSizeProvider>
        </VisitorProvider>
    );
};

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
