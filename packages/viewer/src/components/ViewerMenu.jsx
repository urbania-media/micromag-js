/* eslint-disable react/jsx-props-no-spreading */
import { config, useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useResizeObserver, useTrackEvent } from '@micromag/core/hooks';
import styles from '../styles/viewer.module.scss';
import MenuDots from './menus/MenuDots';
import MenuPreview from './menus/MenuPreview';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    currentScreenIndex: PropTypes.number,
    opened: PropTypes.bool,
    toggleFullscreen: PropTypes.func,
    fullscreenActive: PropTypes.bool,
    fullscreenEnabled: PropTypes.bool,
    closeable: PropTypes.bool,
    withShadow: PropTypes.bool,
    trackingEnabled: PropTypes.bool,
    shareBasePath: PropTypes.string,
    theme: MicromagPropTypes.viewerTheme,
    screenWidth: PropTypes.number,
    withDotItemClick: PropTypes.bool,
    onRequestOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    onClickItem: PropTypes.func,
    onClickMenu: PropTypes.func,
    onClickCloseViewer: PropTypes.func,
    refDots: PropTypes.shape({
        current: PropTypes.any, // eslint-disable-line
    }),
};

const defaultProps = {
    currentScreenIndex: 0,
    opened: false,
    toggleFullscreen: null,
    fullscreenActive: false,
    fullscreenEnabled: false,
    closeable: false,
    withShadow: false,
    trackingEnabled: false,
    shareBasePath: null,
    theme: null,
    screenWidth: null,
    withDotItemClick: false,
    onRequestOpen: null,
    onRequestClose: null,
    onClickItem: null,
    onClickMenu: null,
    onClickCloseViewer: null,
    refDots: null,
};

const ViewerMenu = ({
    story,
    currentScreenIndex,
    opened,
    toggleFullscreen,
    fullscreenActive,
    fullscreenEnabled,
    closeable,
    withShadow,
    shareBasePath,
    trackingEnabled,
    theme: viewerTheme,
    screenWidth,
    withDotItemClick,
    onRequestOpen,
    onRequestClose,
    onClickItem: customOnClickItem,
    onClickMenu: customOnClickMenu,
    onClickCloseViewer,
    refDots,
}) => {
    const { components: screens = [], title = null } = story;
    const currentScreen = screens !== null ? screens[currentScreenIndex] || null : null;
    const { id: screenId = null, type: screenType = null } = currentScreen || {};
    const items = useMemo(
        () =>
            screens
                .filter(({ parentId = null }) => parentId === null)
                .map((it) => ({
                    screen: it,
                    screenId: it.id,
                    current: screenId === it.id,
                })),
        [screens, screenId],
    );
    const trackEvent = useTrackEvent();
    const trackScreenEvent = useCallback(
        (cat, action, label) => {
            if (trackingEnabled) {
                trackEvent(cat, action, label, {
                    screenId,
                    screenIndex: currentScreenIndex,
                    screenType,
                });
            }
        },
        [trackEvent, screenId, currentScreenIndex, screenType],
    );

    const shareUrl = useMemo(() => {
        const origin =
            typeof window !== 'undefined' ? window.location.origin.replace(/\/+$/, '') : '';
        const path = shareBasePath !== null ? `${origin}${shareBasePath}` : origin;
        return path;
    }, [shareBasePath]);

    const [{ y: menuY }, setMenuSpring] = useSpring(() => ({
        y: 0,
        config: { ...config.stiff, clamp: true },
    }));
    const refOpened = useRef(opened);
    if (refOpened.current !== opened) {
        refOpened.current = opened;
    }

    useEffect(() => {
        setMenuSpring.start({ y: opened ? 1 : 0 });
    }, [opened]);

    const {
        ref: menuPreviewContainerRef,
        entry: { contentRect: menuPreviewContainerRect },
    } = useResizeObserver();

    const { height: menuPreviewContainerHeight = 0 } = menuPreviewContainerRect || {};

    const menuPreviewStyle = {
        transform: menuY.to((y) => `translateY(${y * menuPreviewContainerHeight}px)`),
    };

    const menuDragBind = useDrag(
        ({ movement: [, my], first, last, direction: [, dy], cancel, canceled, tap }) => {
            if (canceled || tap) {
                return;
            }

            const isMenuOpened = refOpened.current;

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
                refOpened.current = menuNowOpened;
                setMenuSpring.start({ y: menuNowOpened ? 1 : 0 });
                if (menuNowOpened && onRequestOpen !== null) {
                    onRequestOpen();
                } else if (!menuNowOpened && onRequestClose !== null) {
                    onRequestClose();
                }
            } else {
                setMenuSpring.start({ y: yProgress });
            }
        },
        { axis: 'y', filterTaps: true },
    );

    // handle preview menu item click
    const onClickMenu = useCallback(
        (index) => {
            if (customOnClickMenu !== null) {
                customOnClickMenu(index);
            }
            trackScreenEvent('viewer_menu', 'click_open', 'Menu icon');
        },
        [customOnClickMenu, trackScreenEvent],
    );

    const onClickItem = useCallback(
        (item) => {
            if (customOnClickItem !== null) {
                customOnClickItem(item);
            }
            const index = items.findIndex(({ id }) => id === screenId);
            trackScreenEvent('viewer_menu', 'click_screen_change', `Screen ${index + 1}`);
        },
        [customOnClickItem, items, screenId, trackScreenEvent],
    );

    const onClickClose = useCallback(() => {
        if (onRequestClose !== null) {
            onRequestClose();
        }
        trackScreenEvent('viewer_menu', 'click_close', 'Close icon');
    }, [onRequestClose, trackScreenEvent]);

    // Handle preview menu share click

    const onClickShare = useCallback(
        (type) => trackScreenEvent('viewer_menu', 'click_share', type),
        [trackScreenEvent],
    );

    const { menuTheme = null } = viewerTheme || {};

    return (
        <>
            <div
                className={styles.menuDotsContainer}
                ref={refDots}
                style={{ width: screenWidth }}
                {...menuDragBind()}
            >
                <MenuDots
                    {...menuTheme}
                    direction="horizontal"
                    withShadow={withShadow}
                    items={items}
                    onClickItem={onClickItem}
                    onClickMenu={onClickMenu}
                    closeable={closeable}
                    withItemClick={withDotItemClick}
                    onClose={onClickCloseViewer}
                    className={styles.menuDots}
                />
            </div>
            <animated.div
                className={styles.menuPreviewContainer}
                style={menuPreviewStyle}
                ref={menuPreviewContainerRef}
            >
                <MenuPreview
                    viewerTheme={viewerTheme}
                    title={title}
                    shareUrl={shareUrl}
                    className={styles.menuPreview}
                    screenWidth={screenWidth}
                    focusable={opened}
                    items={items}
                    onClickItem={onClickItem}
                    onClose={onClickClose}
                    onShare={onClickShare}
                    toggleFullscreen={toggleFullscreen}
                    fullscreenActive={fullscreenActive}
                    fullscreenEnabled={fullscreenEnabled}
                />
            </animated.div>
        </>
    );
};

ViewerMenu.propTypes = propTypes;
ViewerMenu.defaultProps = defaultProps;

export default ViewerMenu;
