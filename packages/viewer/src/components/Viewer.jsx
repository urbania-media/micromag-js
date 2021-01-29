/* eslint-disable jsx-a11y/click-events-have-key-events */
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
    branding: MicromagPropTypes.branding,
    width: PropTypes.number,
    height: PropTypes.number,
    screen: PropTypes.string,
    deviceScreens: MicromagPropTypes.deviceScreens,
    fullscreen: PropTypes.bool,
    renderContext: MicromagPropTypes.renderContext,
    onScreenChange: PropTypes.func,
    tapNextScreenWidthPercent: PropTypes.number,
    neighborScreensActive: PropTypes.number,
    storyIsParsed: PropTypes.bool,
    landscapeScreenMargin: PropTypes.number,
    withMetadata: PropTypes.bool,
    withoutMenu: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    branding: null,
    width: null,
    height: null,
    screen: null,
    deviceScreens: getDeviceScreens(),
    fullscreen: false,
    renderContext: 'view',
    onScreenChange: null,
    tapNextScreenWidthPercent: 0.5,
    neighborScreensActive: 2,
    storyIsParsed: false,
    landscapeScreenMargin: 50,
    withMetadata: false,
    withoutMenu: false,
    className: null,
};

const Viewer = ({
    story,
    branding,
    width,
    height,
    screen: screenId,
    deviceScreens,
    fullscreen,
    renderContext,
    onScreenChange,
    tapNextScreenWidthPercent,
    neighborScreensActive,
    storyIsParsed,
    landscapeScreenMargin,
    withMetadata,
    withoutMenu,
    className,
}) => {
    const parsedStory = useParsedStory(story, { disabled: storyIsParsed }) || {};
    const { components: screens = [], title = 'Story title', metadata = null } = parsedStory;

    const { description = 'Description', shareUrl = '/', shareImage = '/', favIcon = '/' } =
        metadata || {};

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
    const { width: screenWidth = null, height: screenHeight = null, landscape = false } =
        screenSize || {};

    // Get menu size
    const {
        ref: menuDotsContainerRef,
        entry: { contentRect: menuDotsContainerRect },
    } = useResizeObserver();

    const { height: menuDotsContainerHeight = 0 } = menuDotsContainerRect || {};

    // Index
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

    // Handle interaction
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

    // Handle screen change
    useEffect(() => {}, [screenIndex, screenHeight]);

    // handle tap
    const onTap = useCallback(
        (e, index) => {
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

            if (!isView || checkClickable(e.target)) {
                return;
            }

            const tappedCurrent = screenIndex === index;

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
                nextIndex = Math.max(0, screenIndex - 1);
            } else {
                nextIndex = Math.min(screens.length - 1, screenIndex + 1);
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

    const trackingEnabled = isView;
    const validIndex = screens.length > 0 && screenIndex < screens.length;
    const currentScreen = validIndex ? screens[screenIndex] : null;
    const { type: screenType = null } = currentScreen || {};

    useEffect(() => {
        if (trackingEnabled && currentScreen !== null) {
            trackScreenView(currentScreen, screenIndex);
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
                setMenuOpened((opened) => !opened);
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
        [changeIndex, setMenuOpened, landscape, trackingEnabled, trackEvent, screenId, screenType],
    );

    // handle preview menu item click

    const onClickPreviewMenuItem = useCallback(
        (index) => {
            changeIndex(index);
            setMenuOpened(false);

            if (trackingEnabled) {
                trackEvent('viewer_menu', 'click_screen_change', `Screen ${index + 1}`, {
                    screenId,
                    screenType,
                    screenIndex: index,
                });
            }
        },
        [setMenuOpened, changeIndex, trackingEnabled, trackEvent, screenId, screenType],
    );

    // Handle preview menu close click

    const onClickPreviewMenuClose = useCallback(() => {
        setMenuOpened(false);
        if (trackingEnabled) {
            trackEvent('viewer_menu', 'click_close', 'Close icon', {
                screenId,
                screenIndex,
                screenType,
            });
        }
    }, [setMenuOpened, trackingEnabled, trackEvent, screenId, screenIndex, screenType]);

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

    const menuVisible = screensCount === 0 || currentScreenInteractionEnabled;

    return (
        <ScreenSizeProvider size={screenSize}>
            <ViewerProvider
                menuVisible={menuVisible}
                menuPosition="top"
                menuSize={menuDotsContainerHeight}
                menuOpened={menuOpened}
            >
                <Helmet>
                    {withMetadata ? (
                        <>
                            <title>{title}</title>
                            <meta name="description" content={description} />
                            <meta property="og:image" content={shareImage} />
                            <link rel="icon" type="image/png" href={favIcon} />
                        </>
                    ) : null}
                    <style type="text/css">{`body { overscroll-behavior: contain; }`}</style>
                </Helmet>
                <div
                    className={classNames([
                        styles.container,
                        screenSize.screens.map((screenName) => `story-screen-${screenName}`),
                        {
                            [styles.fullscreen]: fullscreen,
                            [styles.landscape]: landscape,
                            [styles.hideMenu]: !menuVisible,
                            [styles.menuOpened]: menuOpened,
                            [className]: className,
                        },
                    ])}
                    ref={containerRef}
                    {...(!landscape && currentScreenInteractionEnabled ? bindDrag() : null)}
                >
                    {!withoutMenu && (hasSize || withoutScreensTransforms) ? (
                        <>
                            <div
                                className={styles.menuDotsContainer}
                                ref={menuDotsContainerRef}
                                style={{ width: screenWidth }}
                            >
                                <MenuDots
                                    direction="horizontal"
                                    landscape={landscape}
                                    items={screens}
                                    current={screenIndex}
                                    onClickItem={onClickDotsMenuItem}
                                    className={styles.menuDots}
                                />
                            </div>
                            <MenuPreview
                                branding={branding}
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
                            />
                        </>
                    ) : null}
                    {hasSize || withoutScreensTransforms ? (
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
                                                onTap(e, i);
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
