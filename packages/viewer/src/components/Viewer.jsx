/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useDrag } from 'react-use-gesture';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSizeFromElement } from '@micromag/core/hooks';
import { ScreenSizeProvider } from '@micromag/core/contexts';
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
    className,
}) => {
    const { components = [] } = story || {};

    const contentRef = useRef(null);
    const scrollIndexChanged = useRef(false);

    // Get screen size
    const { ref: containerRef, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });
    const { width: screenWidth = null, height: screenHeight = null } = screenSize || {};

    const landscape = screenWidth > screenHeight;

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

    // Handle menu
    const [menuOpened, setMenuOpened] = useState(false);

    // Handle dot menu item click
    const onClickDotsMenuItem = useCallback(() => {
        setMenuOpened(!menuOpened);
    }, [menuOpened, setMenuOpened]);

    // handle preview menu item click
    const onClickPreviewMenuItem = useCallback(
        (index) => {
            changeIndex(index);
            setMenuOpened(false);
        },
        [setMenuOpened, changeIndex, landscape],
    );

    const onClickPreviewMenuClose = useCallback(() => {
        setMenuOpened(false);
    }, [setMenuOpened]);

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
            if (landscape) {
                scrollIndexChanged.current = true;
            }
            changeIndex(scrollIndex);
        }
    }, [landscape, currentIndex, screenHeight, components]);

    // handle tap
    const onTap = useCallback(
        (e) => {

            const checkClickable = (el, maxDistance = 5, distance = 1) => {

                const {tagName = null, parentNode = null} = el || {};

                if (tagName === 'BODY') {
                    return false;
                }

                // if (tagName === 'BUTTON' && disabled) {
                //     return false;
                // }

                if (tagName === 'BUTTON' || tagName === 'A') {
                    return true;
                }

                if (distance < maxDistance) {
                    return checkClickable(parentNode, maxDistance, distance + 1);
                }

                return false;
            }

            if (checkClickable(e.target)) {
                return;
            }

            const it = components[currentIndex] || null;
            const interactionEnabled = screensInteractionEnabled[currentIndex];

            if (it === null || !interactionEnabled) {
                return;
            }

            let nextIndex = currentIndex;


            const contentEl = contentRef.current;
            const { left: contentX = 0 } = contentEl.getBoundingClientRect();
            const tapX = e.clientX;
            const hasTappedRight = tapX - contentX > screenWidth * (1 - tapNextScreenWidthPercent);

            if (hasTappedRight) {
                nextIndex = Math.min(components.length - 1, currentIndex + 1);
            } else {
                nextIndex = Math.max(0, currentIndex - 1);
            }
            changeIndex(nextIndex);
        },
        [onScreenChange, screenWidth, components, changeIndex, currentIndex, screensInteractionEnabled],
    );

    const bindDrag = useDrag((/* { down, swipe, movement: [, my], vxvy: [, vy] } */) => {
        // console.log(down, swipe, my, vy);
    });

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
                        [styles.hideMenu]: !currentScreenInteractionEnabled,
                        [className]: className,
                    },
                ])}
                ref={containerRef}
            >
                <div className={styles.menuDotsContainer} {...bindDrag()}>
                    <MenuDots
                        direction={landscape ? 'vertical' : 'horizontal'}
                        items={components}
                        current={currentIndex}
                        onClickItem={onClickDotsMenuItem}
                        className={styles.menuDots}
                    />
                </div>
                <MenuPreview
                    className={styles.menuPreview}
                    screenWidth={screenWidth}
                    screenHeight={screenHeight}
                    items={components}
                    current={currentIndex}
                    onClickItem={onClickPreviewMenuItem}
                    onClose={onClickPreviewMenuClose}
                />
                <div
                    ref={contentRef}
                    className={styles.content}
                    onScroll={landscape ? onContentScrolled : null}
                    {...(!landscape ? { onClick: onTap } : null )}
                >
                    {components.map((scr, i) => {
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
                            <div key={key} style={{ transform: `translate3d(${screenWidth * (i - currentIndex)}px, 0, 0)` }} className={screenClass}>
                                {viewerScreen}
                            </div>
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
