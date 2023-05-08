/* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/no-static-element-interactions, no-param-reassign, jsx-a11y/click-events-have-key-events, react/no-array-index-key, no-nested-ternary, react/jsx-props-no-spreading */
import { animated } from '@react-spring/web';
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
    StoryProvider,
} from '@micromag/core/contexts';
import {
    useFullscreen,
    useLoadedFonts,
    useParsedStory,
    useDimensionObserver,
    useScreenSizeFromElement,
    useTrackScreenView,
    useDragProgress,
} from '@micromag/core/hooks';
import { getDeviceScreens } from '@micromag/core/utils';
import { ShareIncentive } from '@micromag/elements/all';

import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import useScreenInteraction from '../hooks/useScreenInteraction';

import ViewerMenu from './ViewerMenu';
import ViewerScreen from './ViewerScreen';
import NavigationButton from './buttons/NavigationButton';
import ArrowHint from './partials/ArrowHint';
import PlaybackControls from './partials/PlaybackControls';
import WebView from './partials/WebView';

import styles from '../styles/viewer.module.scss';

// @todo export from somewhere else; or use as props in possible component for screen transitions
const SPRING_CONFIG_TIGHT = { tension: 300, friction: 35 }; // tight
const DRAG_PROGRESS_ACTIVATION_THRESHOLD = 0.3;
const DRAG_VELOCITY_ACTIVATION_THRESHOLD = 0.3;
const DEFAULT_TRANSITION_TYPE_LANDSCAPE = 'carousel';
const DEFAULT_TRANSITION_TYPE_PORTRAIT = 'stack';
const SHARE_INCENTIVE_TIMEOUT = 6000;

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
    onScreenChange: PropTypes.func,
    tapNextScreenWidthPercent: PropTypes.number,
    storyIsParsed: PropTypes.bool,
    neighborScreensActive: PropTypes.number,
    neighborScreenOffset: PropTypes.number,
    neighborScreenScale: PropTypes.number,
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
    onScreenChange: null,
    tapNextScreenWidthPercent: 0.8,
    storyIsParsed: false,
    neighborScreensActive: 1,
    neighborScreenOffset: 105,
    neighborScreenScale: 0.8,
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
    tapNextScreenWidthPercent,
    storyIsParsed,
    neighborScreensActive,
    neighborScreenOffset,
    neighborScreenScale,
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
    const isEditor = renderContext === 'edit';

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

    const {
        ref: containerRef,
        fullWidth: viewerWidth,
        fullHeight: viewerHeight,
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

    useEffect(() => {
        if (ready && onViewModeChange !== null) {
            onViewModeChange({ landscape, menuOverScreen });
        }
    }, [ready, landscape, menuOverScreen, onViewModeChange]);

    /**
     * Screen Transitions
     */
    const transitionType =
        landscape && withNeighborScreens
            ? DEFAULT_TRANSITION_TYPE_LANDSCAPE
            : DEFAULT_TRANSITION_TYPE_PORTRAIT;

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
        onInteract: onInteractionPrivate,
        onNavigate: onScreenNavigate,
    });

    const onTap = useCallback(
        ({ currentTarget, event, target, xy: [x, y] }) => {
            if (event) {
                event.stopPropagation();
            }
            interactWithScreen({
                event,
                target,
                currentTarget,
                index: screenIndex,
                x,
                y,
            });
        },
        [interactWithScreen, screenIndex],
    );

    const computeScreenProgress = useCallback(
        ({ active, movement: [mx], velocity: [vx] }) => {
            const p = mx / screenContainerWidth; // drag "ratio": how much of the screen width has been swiped?
            const forwards = mx < 0; // true if swiping to left (to navigate forwards)
            const newIndex = !forwards ? screenIndex - 1 : screenIndex + 1; // which item index are we moving towards?
            const reachedThreshold =
                vx > DRAG_VELOCITY_ACTIVATION_THRESHOLD ||
                Math.abs(p) > DRAG_PROGRESS_ACTIVATION_THRESHOLD;
            const reachedBounds = newIndex < 0 || newIndex >= screensCount; // have we reached the end of the stack?
            const damper = reachedBounds ? 0.1 : 1;
            const progress = Math.max(-1, Math.min(1, p * damper));

            if (!active) {
                return reachedThreshold && !reachedBounds ? newIndex : screenIndex;
            }
            return screenIndex - progress;
        },
        [screenContainerWidth, screenIndex],
    );

    const onScreenProgress = useCallback(
        (progress, { active }) => {
            const delta = Math.abs(progress - screenIndex);
            const reachedBounds = progress < 0 || progress >= screensCount; // have we reached the end of the stack?
            if (!active && delta === 1 && !reachedBounds) {
                onScreenNavigate({
                    index: screenIndex,
                    newIndex: progress,
                });
            }
        },
        [onScreenNavigate, screenIndex],
    );

    const [transitioned, setTransitioned] = useState(true);
    const onTransitionStart = useCallback(() => {
        setTransitioned(false);
    }, [setTransitioned]);

    const onTransitionComplete = useCallback(() => {
        setTransitioned(true);
    }, [setTransitioned]);

    const springParams = useMemo(
        () => ({
            config: SPRING_CONFIG_TIGHT,
            onStart: onTransitionStart,
            onRest: onTransitionComplete,
        }),
        [onTransitionStart, onTransitionComplete],
    );

    const menuVisible = screensCount === 0 || currentScreenInteractionEnabled;
    const navigationDisabled = currentScreenInteractionEnabled === false;

    const {
        dragging: isDragging,
        progress: progressSpring,
        bind: dragContentBind,
    } = useDragProgress({
        progress: screenIndex,
        disabled: !isView || withoutTransitions,
        dragDisabled: withoutGestures || !currentScreenInteractionEnabled,
        computeProgress: computeScreenProgress,
        onProgress: onScreenProgress,
        onTap,
        springParams,
    });

    const getScreenStylesByIndex = (index, spring) => {
        if (transitionType === 'stack') {
            return {
                zIndex: index,
                opacity: spring.to((progress) => {
                    const t = index - progress;
                    const invert = Math.min(1, Math.max(0, -t));
                    if (Math.abs(t) > neighborScreensActive) return 0;
                    return Math.max(0, 1 - 0.75 * invert + (t + 1));
                }),
                transform: spring.to((progress) => {
                    const t = index - progress;
                    const clamped = Math.min(1, Math.max(0, t));
                    const invert = Math.min(1, Math.max(0, -t));
                    if (Math.abs(t) > neighborScreensActive) return 'translateX(100%)';
                    return `translateX(${clamped * 100}%) scale(${1 - 0.2 * invert})`;
                }),
                boxShadow: spring.to((progress) => {
                    const t = index - progress;
                    if (Math.abs(t) > neighborScreensActive) return null;
                    const clamped = Math.min(1, Math.max(0, t));
                    return `0 0 ${4 * (1 - clamped)}rem ${-0.5 * (1 - clamped)}rem black`;
                }),
            };
        }

        return {
            opacity: spring.to((progress) => {
                const t = index - progress;
                if (Math.abs(t) > neighborScreensActive) return 0;
                const clamped = Math.min(1, Math.max(0, Math.abs(t)));
                return 1 - 0.75 * clamped;
            }),
            transform: spring.to((progress) => {
                const t = index - progress;
                if (Math.abs(t) > neighborScreensActive) return `translate(100%)`;
                const clamped = Math.min(1, Math.max(0, Math.abs(t)));
                return `translateX(${t * neighborScreenOffset}%) scale(${
                    1 - (1 - neighborScreenScale) * clamped
                })`;
            }),
            zIndex: screensCount - index,
        };
    };

    const {
        toggle: toggleFullscreen,
        active: fullscreenActive,
        enabled: fullscreenEnabled,
    } = useFullscreen(containerRef.current || null);

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

    const [currentShareIncentive, setCurrentShareIncentive] = useState(null);
    const [shareIncentiveVisible, setShareIncentiveVisible] = useState(false);
    const { header = null } = currentScreen || {};
    const { shareIncentive = null } = header || {};
    const { active: hasShareIncentive = false, label: shareIncentiveLabel = null } =
        shareIncentive || {};
    const { label: currentShareIncentiveLabel = null } = currentShareIncentive || {};
    const { body: incentiveLabel = null } = shareIncentiveLabel || {};
    const { body: currentIncentiveLabel = null } = currentShareIncentiveLabel || {};

    useEffect(() => {
        setShareIncentiveVisible(true);

        if (hasShareIncentive && shareIncentiveLabel !== currentShareIncentiveLabel) {
            setCurrentShareIncentive(shareIncentive);
        }

        const timeout = setTimeout(() => {
            if (isView) {
                setShareIncentiveVisible(false);
            }
        }, SHARE_INCENTIVE_TIMEOUT);

        return () => {
            clearTimeout(timeout);
        };
    }, [
        shareIncentiveLabel,
        setShareIncentiveVisible,
        hasShareIncentive,
        incentiveLabel,
        currentIncentiveLabel,
        setCurrentShareIncentive,
        isView,
    ]);

    return (
        <StoryProvider story={parsedStory}>
            <ScreenSizeProvider size={screenSize}>
                <ViewerProvider
                    containerRef={containerRef}
                    events={eventsManager}
                    menuVisible={menuVisible}
                    menuOverScreen={menuOverScreen}
                    width={viewerWidth}
                    height={viewerHeight}
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
                                [styles.disableMenu]: navigationDisabled,
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
                                theme={viewerTheme}
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
                                !navigationDisabled &&
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
                                        const current = screenIndex === i;
                                        const active =
                                            i >= screenIndex - neighborScreensActive &&
                                            i <= screenIndex + neighborScreensActive;

                                        const screenStyles = getScreenStylesByIndex(
                                            i,
                                            progressSpring,
                                        );

                                        return (
                                            <animated.div
                                                key={`screen-viewer-${screen.id || ''}-${i + 1}`}
                                                style={screenStyles}
                                                className={classNames([
                                                    styles.screenContainer,
                                                    {
                                                        [styles.current]: current,
                                                    },
                                                ])}
                                            >
                                                {screen !== null ? (
                                                    <ViewerScreen
                                                        className={styles.screen}
                                                        screen={screen}
                                                        screenState={current ? screenState : null}
                                                        index={i}
                                                        current={current}
                                                        active={active}
                                                        ready={current && transitioned}
                                                        mediaRef={(ref) => {
                                                            screensMediasRef.current[i] = ref;
                                                        }}
                                                        renderContext={renderContext}
                                                        width={screenWidth}
                                                        height={screenHeight}
                                                        scale={screenScale}
                                                    />
                                                ) : null}
                                            </animated.div>
                                        );
                                    })}
                                </div>
                                {!withoutNavigationArrow &&
                                !withNeighborScreens &&
                                !navigationDisabled &&
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
                                {withNavigationHint &&
                                !withNeighborScreens &&
                                !navigationDisabled &&
                                screenIndex === 0 &&
                                !hasInteracted ? (
                                    <ArrowHint className={styles.arrowHint} />
                                ) : null}
                            </div>
                        ) : null}
                        <div
                            className={classNames([
                                styles.shareIncentiveContainer,
                                {
                                    [styles.shareIncentiveVisible]:
                                        hasShareIncentive && shareIncentiveVisible,
                                },
                            ])}
                            style={{
                                top: isEditor ? 10 : menuDotsContainerHeight - 10,
                            }}
                        >
                            <ShareIncentive
                                className={styles.shareIncentive}
                                {...currentShareIncentive}
                            />
                        </div>
                        <WebView
                            className={styles.webView}
                            style={{
                                maxWidth: Math.max(screenContainerWidth, 600),
                            }}
                        />
                    </div>
                </ViewerProvider>
            </ScreenSizeProvider>
        </StoryProvider>
    );
};

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
