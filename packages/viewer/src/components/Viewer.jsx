/* eslint-disable jsx-a11y/control-has-associated-label */

/* eslint-disable jsx-a11y/no-static-element-interactions, no-param-reassign, jsx-a11y/click-events-have-key-events, react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import EventEmitter from 'wolfy87-eventemitter';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { FontFaces, Meta } from '@micromag/core/components';
import { ScreenSizeProvider, ViewerProvider, usePlaybackContext } from '@micromag/core/contexts';
import {
    useFullscreen,
    useLoadedFonts,
    useParsedStory,
    useResizeObserver,
    useScreenSizeFromElement,
    useTrackScreenView,
} from '@micromag/core/hooks';
import { getDeviceScreens } from '@micromag/core/utils';

import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import useScreenInteraction from '../hooks/useScreenInteraction';

import ViewerMenu from './ViewerMenu';
import ViewerScreen from './ViewerScreen';
import HandTap from './partials/HandTap';
import PlaybackControls from './partials/PlaybackControls';

import styles from '../styles/viewer.module.scss';

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
    neighborScreensActive: PropTypes.number,
    neighborScreensMounted: PropTypes.number,
    storyIsParsed: PropTypes.bool,
    landscapeScreenMargin: PropTypes.number,
    withMetadata: PropTypes.bool,
    withoutMenu: PropTypes.bool,
    withoutScreensMenu: PropTypes.bool,
    withoutMenuShadow: PropTypes.bool,
    withoutFullscreen: PropTypes.bool,
    withLandscapeSiblingsScreens: PropTypes.bool,
    withNavigationHint: PropTypes.bool,
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
    neighborScreensActive: 1,
    neighborScreensMounted: 1,
    storyIsParsed: false,
    landscapeScreenMargin: 20,
    withMetadata: false,
    withoutMenu: false,
    withoutScreensMenu: false,
    withoutMenuShadow: false,
    withoutFullscreen: false,
    withLandscapeSiblingsScreens: false,
    withNavigationHint: false,
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
    onScreenChange,
    tapNextScreenWidthPercent,
    neighborScreensActive,
    neighborScreensMounted,
    storyIsParsed,
    landscapeScreenMargin,
    withMetadata,
    withoutMenu,
    withoutScreensMenu,
    withoutMenuShadow,
    withoutFullscreen, // eslint-disable-line no-unused-vars
    withLandscapeSiblingsScreens,
    withNavigationHint,
    menuIsScreenWidth,
    closeable,
    onClose: onCloseViewer,
    onInteraction,
    onEnd,
    onViewModeChange,
    currentScreenMedia,
    screensMedias,
    screenSizeOptions,
    className,
}) => {
    const intl = useIntl();
    const parsedStory = useParsedStory(story, { disabled: storyIsParsed }) || {};
    const { components: screens = [], title = null, metadata = null, fonts = null } = parsedStory;

    const eventsManager = useMemo(() => new EventEmitter(), [parsedStory]);

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

    const { controlsVisible: playbackControlsVisible = false } = usePlaybackContext();

    const trackScreenView = useTrackScreenView();

    const contentRef = useRef(null);

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
            onViewModeChange({ landscape });
        }
    }, [ready, landscape, onViewModeChange]);

    const screensMediasRef = useRef([]);

    // Screen index
    const screenIndex = useMemo(
        () =>
            Math.max(
                0,
                screens.findIndex((it) => `${it.id}` === `${screenId}`),
            ),
        [screenId, screens],
    );

    if (currentScreenMedia !== null) {
        currentScreenMedia.current = screensMediasRef.current[screenIndex];
    }

    if (screensMedias !== null) {
        screensMedias.current = screensMediasRef.current;
    }

    const changeIndex = useCallback(
        (index) => {
            if (index === screenIndex) {
                return;
            }
            if (currentScreenMedia !== null) {
                currentScreenMedia.current = screensMediasRef.current[index];
            }
            if (onScreenChange !== null) {
                onScreenChange(screens[index], index);
            }
        },
        [screenIndex, screens, onScreenChange],
    );

    // Track screen view
    const trackingEnabled = isView;
    const currentScreen = screens[screenIndex] || null;
    useEffect(() => {
        if (trackingEnabled && currentScreen !== null) {
            trackScreenView(currentScreen, screenIndex);
        }
    }, [currentScreen, trackScreenView, trackingEnabled]);

    // Handle interaction enable
    const currentScreenRef = useRef(null);

    const gotoPreviousScreen = useCallback(() => {
        changeIndex(Math.max(0, screenIndex - 1));
        currentScreenRef.current.focus();
    }, [changeIndex]);

    const gotoNextScreen = useCallback(() => {
        changeIndex(Math.min(screens.length - 1, screenIndex + 1));
        currentScreenRef.current.focus();
    }, [changeIndex]);

    const screensCount = screens.length;

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
        onClick: onScreenClick,
        currentScreenInteractionEnabled,
        enableInteraction,
        disableInteraction,
    } = useScreenInteraction({
        screens,
        screenIndex,
        screenWidth: screenContainerWidth,
        isView,
        clickOnSiblings: landscape && withLandscapeSiblingsScreens,
        nextScreenWidthPercent: tapNextScreenWidthPercent,
        eventsManager,
        onClick: onInteractionPrivate,
        onEnd,
        onChangeScreen: changeIndex,
    });

    const onClickContent = useCallback(
        (e) => {
            if (withLandscapeSiblingsScreens || e.target !== contentRef.current) {
                return;
            }

            const { left: contentX = 0, width: contentWidth = 0 } =
                e.currentTarget.getBoundingClientRect();
            const tapX = e.clientX;
            const hasTappedLeft = tapX - contentX < contentWidth * 0.5;
            const nextIndex = hasTappedLeft
                ? Math.max(0, screenIndex - 1)
                : Math.min(screensCount - 1, screenIndex + 1);
            if (eventsManager !== null) {
                eventsManager.emit('change_screen', nextIndex);
            }
            changeIndex(nextIndex);
        },
        [
            withLandscapeSiblingsScreens,
            screenIndex,
            tapNextScreenWidthPercent,
            changeIndex,
            eventsManager,
            screensCount,
        ],
    );

    // swipe menu open
    const menuVisible = screensCount === 0 || currentScreenInteractionEnabled;

    const [menuOpened, setMenuOpened] = useState(false);

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

    // Fullscreen
    const {
        toggle: toggleFullscreen,
        active: fullscreenActive,
        enabled: fullscreenEnabled,
    } = useFullscreen(containerRef.current || null);

    // Keyboard Events
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

    const { parameters: screenParameters } = currentScreen || {};
    const { metadata: screenMetadata } = screenParameters || {};
    const { title: screenTitle = null, description: screenDescription = null } =
        screenMetadata || {};
    const finalTitle = screenTitle !== null ? screenTitle : title;
    const finalMetadata = useMemo(
        () =>
            screenDescription !== null ? { ...metadata, description: screenDescription } : metadata,
        [metadata],
    );

    // Get element height
    const {
        ref: menuDotsContainerRef,
        entry: { contentRect: menuDotsContainerRect },
    } = useResizeObserver();
    const { height: menuDotsContainerHeight = 0 } = menuDotsContainerRect || {};

    const {
        ref: playbackControlsContainerRef,
        entry: { contentRect: playbackControlsContainerRect },
    } = useResizeObserver();
    const { height: playbackControlsContainerHeight = 0 } = playbackControlsContainerRect || {};

    const { startIndex: mountedScreenStartIndex, endIndex: mountedScreenEndIndex } = useMemo(
        () =>
            neighborScreensMounted !== null
                ? {
                      startIndex: Math.max(
                          screenIndex - (neighborScreensActive + neighborScreensMounted),
                          0,
                      ),
                      endIndex: Math.min(
                          screenIndex + (neighborScreensActive + neighborScreensMounted),
                          screensCount,
                      ),
                  }
                : {
                      startIndex: 0,
                      endIndex: screensCount - 1,
                  },
        [screenIndex, neighborScreensActive, neighborScreensMounted, screensCount],
    );
    const mountedScreens = useMemo(
        () =>
            neighborScreensMounted != null
                ? screens.slice(mountedScreenStartIndex, mountedScreenEndIndex)
                : screens,
        [
            screens,
            mountedScreenStartIndex,
            mountedScreenEndIndex,
            neighborScreensActive,
            neighborScreensMounted,
        ],
    );

    return (
        <ScreenSizeProvider size={screenSize}>
            <ViewerProvider
                events={eventsManager}
                menuVisible={menuVisible}
                menuOverScreen={menuOverScreen}
                topHeight={menuOverScreen ? menuDotsContainerHeight : 0}
                bottomHeight={playbackControlsVisible ? playbackControlsContainerHeight : 0}
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
                            onClickCloseViewer={onCloseViewer}
                            onRequestOpen={onMenuRequestOpen}
                            onRequestClose={onMenuRequestClose}
                            withDotItemClick={screenContainerWidth > 400}
                            withoutScreensMenu={withoutScreensMenu}
                            refDots={menuDotsContainerRef}
                        />
                    ) : null}
                    {ready || withoutScreensTransforms ? (
                        <div
                            ref={contentRef}
                            className={styles.content}
                            onClick={onClickContent}
                            // onPointerDown={detectPointerEvents.hasApi ? onClickContent : null}
                            // onMouseDown={detectPointerEvents.hasApi ? onClickContent : null}
                        >
                            {mountedScreens.map((scr, mountedIndex) => {
                                const i = mountedScreenStartIndex + mountedIndex;
                                const current = i === parseInt(screenIndex, 10);
                                const active =
                                    i >= screenIndex - neighborScreensActive &&
                                    i <= screenIndex + neighborScreensActive;
                                const viewerScreen = (
                                    <ViewerScreen
                                        screen={scr}
                                        screenState={current ? screenState : null}
                                        renderContext={renderContext}
                                        index={i}
                                        current={current}
                                        active={active}
                                        onPrevious={gotoPreviousScreen}
                                        onNext={gotoNextScreen}
                                        enableInteraction={enableInteraction}
                                        disableInteraction={disableInteraction}
                                        mediaRef={(ref) => {
                                            screensMediasRef.current[i] = ref;
                                        }}
                                    />
                                );
                                const key = `screen-viewer-${scr.id || ''}-${i + 1}`;
                                let screenTransform = null;
                                if (landscape) {
                                    screenTransform = withLandscapeSiblingsScreens
                                        ? `translateX(calc(${
                                              (screenContainerWidth + landscapeScreenMargin) *
                                              (i - screenIndex)
                                          }px - 50%)) scale(${current ? 1 : 0.9})`
                                        : null;
                                } else {
                                    screenTransform = `translateX(${current ? 0 : '100%'})`;
                                }
                                return (
                                    <React.Fragment key={key}>
                                        {current && screenIndex > 0 ? (
                                            <button
                                                type="button"
                                                className="sr-only"
                                                onClick={gotoPreviousScreen}
                                                tabIndex="-1"
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Go to previous screen"
                                                    description="Button label"
                                                />
                                            </button>
                                        ) : null}
                                        <div
                                            ref={current ? currentScreenRef : null}
                                            style={{
                                                // width: landscape ? screenWidth : null,
                                                // height: landscape ? screenHeight : null,
                                                width: screenContainerWidth,
                                                height: screenContainerHeight,
                                                transform: !withoutScreensTransforms
                                                    ? screenTransform
                                                    : null,
                                            }}
                                            className={classNames([
                                                styles.screen,
                                                {
                                                    [styles.current]: current,
                                                    [styles.visible]:
                                                        current || withLandscapeSiblingsScreens,
                                                },
                                            ])}
                                            tabIndex={active ? '0' : '-1'} /* eslint-disable-line */
                                            aria-hidden={current ? null : 'true'}
                                            aria-label={intl.formatMessage(
                                                {
                                                    defaultMessage: 'Screen {index}',
                                                    description: 'Button label',
                                                },
                                                { index: i + 1 },
                                            )}
                                            onKeyUp={(e) => {
                                                if (e.key === 'Enter') {
                                                    onScreenClick(e, i);
                                                }
                                            }}
                                            onClick={(e) => onScreenClick(e, i)}
                                            // @todo: this was to make the experience “snappier” when switching screens
                                            // onPointerDown={
                                            //     detectPointerEvents.hasApi
                                            //         ? (e) => onScreenClick(e, i)
                                            //         : null
                                            // }
                                            // onMouseDown={
                                            //     !detectPointerEvents.hasApi
                                            //         ? (e) => onScreenClick(e, i)
                                            //         : null
                                            // }
                                        >
                                            <div
                                                className={styles.scaler}
                                                style={{
                                                    width: screenWidth,
                                                    height: screenHeight,
                                                    transform:
                                                        screenScale !== null
                                                            ? `scale(${screenScale})`
                                                            : null,
                                                    transformOrigin:
                                                        screenScale !== null ? '0 0' : null,
                                                }}
                                            >
                                                {viewerScreen}
                                            </div>
                                            {withNavigationHint &&
                                            !withLandscapeSiblingsScreens &&
                                            current &&
                                            screenIndex === 0 ? (
                                                <HandTap className={styles.handTap} />
                                            ) : null}
                                        </div>
                                        {current && screenIndex < screens.length ? (
                                            <button
                                                type="button"
                                                className="sr-only"
                                                onClick={gotoNextScreen}
                                                tabIndex="-1"
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Go to next screen"
                                                    description="Button label"
                                                />
                                            </button>
                                        ) : null}
                                    </React.Fragment>
                                );
                            })}
                            {/* <button
                                    type="button"
                                    onClick={gotoPreviousScreen}
                                    className={classNames([styles.navButton, styles.previous])}
                                />
                                <button
                                    type="button"
                                    onClick={gotoNextScreen}
                                    className={classNames([styles.navButton, styles.next])}
                                /> */}
                        </div>
                    ) : null}
                    <div
                        className={classNames([
                            styles.playbackControls,
                            {
                                [styles.visible]: playbackControlsVisible,
                            },
                        ])}
                        ref={playbackControlsContainerRef}
                    >
                        <PlaybackControls
                            visible={playbackControlsVisible}
                            className={styles.controls}
                        />
                    </div>
                </div>
            </ViewerProvider>
        </ScreenSizeProvider>
    );
};

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
