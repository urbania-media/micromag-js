/* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/no-static-element-interactions, no-param-reassign, jsx-a11y/click-events-have-key-events, react/no-array-index-key, no-nested-ternary, react/jsx-props-no-spreading */
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
    useProgressTransition,
    useSpringProgress,
} from '@micromag/core/hooks';
import { getDeviceScreens } from '@micromag/core/utils';

import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import useScreenInteraction from '../hooks/useScreenInteraction';

import ViewerMenu from './ViewerMenu';
import ViewerScreen from './ViewerScreen';
import NavigationButton from './buttons/NavigationButton';
import PlaybackControls from './partials/PlaybackControls';
import WebView from './partials/WebView';

import styles from '../styles/viewer.module.scss';

// @todo export from somewhere else
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
    withoutTransitions: PropTypes.bool,
    withNeighborScreens: PropTypes.bool,
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
    neighborScreensActive: 2,
    neighborScreensMounted: 1,
    storyIsParsed: false,
    // landscapeScreenMargin: 20,
    // landscapeSmallScreenScale: 0.9,
    withMetadata: false,
    withNeighborScreens: false,
    withNavigationHint: false,
    withoutGestures: false,
    withoutMenu: false,
    withoutScreensMenu: false,
    withoutShareMenu: false,
    withoutMenuShadow: false,
    withoutFullscreen: false,
    withoutTransitions: false,
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
    // neighborScreensMounted,
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
    withoutTransitions,
    withNeighborScreens,
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
    const ready = hasSize;

    const trackingEnabled = isView;
    useEffect(() => {
        if (trackingEnabled && currentScreen !== null) {
            trackScreenView(currentScreen, screenIndex);
        }
    }, [currentScreen, trackScreenView, trackingEnabled]);

    /**
     * Screen Transitions
     */
    const [transitionType, setTransitionType] = useState(DEFAULT_TRANSITION_TYPE_LANDSCAPE);

    useEffect(() => {
        if (ready && onViewModeChange !== null) {
            onViewModeChange({ landscape, menuOverScreen });
        }
        const newType = landscape
            ? DEFAULT_TRANSITION_TYPE_LANDSCAPE
            : DEFAULT_TRANSITION_TYPE_PORTRAIT;
        setTransitionType(newType);
    }, [ready, landscape, menuOverScreen, onViewModeChange, setTransitionType]);

    const [screenTransitionIndex, setScreenTransitionIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(0);
    const wasDragging = useRef(isDragging);
    const springParams = useMemo(
        () => ({
            immediate: wasDragging.current,
            config: SPRING_CONFIG_TIGHT,
        }),
        [wasDragging.current],
    );
    const isNotDragging = !isDragging || !wasDragging.current;
    const screenTransitionProgress = useSpringProgress(isNotDragging ? screenTransitionIndex : null, springParams);
    if (wasDragging.current !== isDragging) {
        wasDragging.current = isDragging;
    }

    const computeScreenStyle = useCallback(
        (index, progress) => {
            if (transitionType === 'stack') {
                const t = index - progress;
                const clamped = Math.min(1, Math.max(0, t));
                const invert = Math.min(1, Math.max(0, -t));
                const opacity = Math.max(0, 1 - 0.75 * invert + (t + 1));
                return {
                    opacity,
                    transform: `translateX(${clamped * 100}%) scale(${1 - 0.2 * invert})`,
                    boxShadow: `0 0 ${4 * (1 - clamped)}rem ${-0.5 * (1 - clamped)}rem black`,
                    zIndex: index,
                };
            }
            const t = index - progress;
            const clamped = Math.min(1, Math.max(0, Math.abs(t)));
            return {
                opacity: 1 - 0.75 * clamped,
                transform: `translateX(${t * 105}%) scale(${1 - 0.2 * clamped})`,
                zIndex: screens.length - index,
            };
        },
        [screens, transitionType],
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
        nextScreenWidthPercent: tapNextScreenWidthPercent,
        clickOnSiblings: landscape && withNeighborScreens,
        onInteract: onInteractionPrivate,
        onNavigate: onScreenNavigate,
    });

    const onDragContent = useCallback(
        ({
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
                    index: screenIndex,
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
                setScreenTransitionIndex(screenIndex - progress);
            }

            if (!active) {
                setIsDragging(false);
                if (reachedThreshold && !reachedBounds) {
                    onScreenNavigate({
                        index: screenIndex,
                        newIndex,
                    });
                } else {
                    setScreenTransitionIndex(screenIndex);
                }
            }
        },
        [
            isView,
            screenIndex,
            screensCount,
            landscape,
            withNeighborScreens,
            screenContainerWidth,
            interactWithScreen,
            setScreenTransitionIndex,
            setIsDragging,
        ],
    );

    const dragContentBind = useDrag(onDragContent, {
        filterTaps: true,
    });

    useEffect(() => {
        setScreenTransitionIndex(screenIndex);
        const newType =
            landscape && withNeighborScreens
                ? DEFAULT_TRANSITION_TYPE_LANDSCAPE
                : DEFAULT_TRANSITION_TYPE_PORTRAIT;
        setTransitionType(newType);
    }, [landscape, withNeighborScreens, screenIndex, transitionType, setScreenTransitionIndex]);

    const {
        toggle: toggleFullscreen,
        active: fullscreenActive,
        enabled: fullscreenEnabled,
    } = useFullscreen(containerRef.current || null);

    const menuVisible = screensCount === 0 || currentScreenInteractionEnabled;

    // Get element height
    const { ref: menuDotsContainerRef, height: menuDotsContainerHeight = 0 } =
        useDimensionObserver();

    const onClickScreen = useCallback(
        ({ screenId: itemScreenId }) => {
            onInteractionPrivate();
            const index = screens.findIndex(({ id }) => id === itemScreenId);
            changeIndex(index);
        },
        [onInteractionPrivate, changeIndex],
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

    // hmm?
    const overscrollStyle = (
        <style type="text/css">{`body { overscroll-behavior: contain; }`}</style>
    );

    const keyboardShortcuts = useMemo(
        () => ({
            f: () => toggleFullscreen(),
            arrowleft: () => gotoPreviousScreen(),
            arrowright: () => gotoNextScreen(),
            ' ': () => gotoNextScreen(),
        }),
        [gotoPreviousScreen, gotoNextScreen],
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
                                [styles.withoutGestures]: withoutGestures,
                                [styles.hideMenu]: !menuVisible,
                                [styles.fadeMenu]:
                                    playing && playbackControls && !playbackcontrolsVisible,
                                [styles.ready]: ready || withoutScreensTransforms,
                                [styles.hasInteracted]: hasInteracted,
                                [styles.isDragging]: isDragging,
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
                                withShadow={menuOverScreen && !withoutMenuShadow}
                                toggleFullscreen={toggleFullscreen}
                                fullscreenActive={fullscreenActive}
                                fullscreenEnabled={fullscreenEnabled}
                                closeable={closeable}
                                shareBasePath={basePath}
                                screenSize={screenSize}
                                menuWidth={menuIsScreenWidth ? screenContainerWidth : null}
                                trackingEnabled={trackingEnabled}
                                onClickScreen={onClickScreen}
                                onClickCloseViewer={onCloseViewer}
                                withDotItemClick={screenContainerWidth > 400}
                                withoutScreensMenu={withoutScreensMenu}
                                withoutShareMenu={withoutShareMenu}
                                refDots={menuDotsContainerRef}
                            />
                        ) : null}
                        {ready || withoutScreensTransforms ? (
                            <div className={styles.content} {...dragContentBind()}>
                                {!withoutNavigationArrow &&
                                !withNeighborScreens &&
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
                                        overflow: !withNeighborScreens ? 'hidden' : null,
                                    }}
                                >
                                    {screens.map((screen, i) => {
                                        const current = i === parseInt(screenIndex, 10);
                                        const active =
                                            i >= screenIndex - neighborScreensActive &&
                                            i <= screenIndex + neighborScreensActive;

                                        const screenStyles = active
                                            ? computeScreenStyle(
                                                  i,
                                                  isDragging ? screenTransitionIndex : screenTransitionProgress,
                                              )
                                            : {
                                                  opacity: current ? 1 : 0,
                                              };

                                        return (
                                            <div
                                                key={`screen-viewer-${screen.id || ''}-${i + 1}`}
                                                style={screenStyles}
                                                className={classNames([
                                                    styles.screenContainer,
                                                    {
                                                        [styles.current]: current,
                                                    },
                                                ])}
                                            >
                                                {screen !== null && active ? (
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
                                                            !withNeighborScreens &&
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
                                !withNeighborScreens &&
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
