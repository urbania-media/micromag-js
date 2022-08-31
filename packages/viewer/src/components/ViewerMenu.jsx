/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useTrackEvent, useDragProgress } from '@micromag/core/hooks';

import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

import CloseButton from './buttons/CloseButton';
import SlidingButtons from './buttons/SlidingButtons';
import MenuButton from './buttons/MenuButton';
import ShareButton from './buttons/ShareButton';
import MenuContainer from './menus/MenuContainer';
import MenuDots from './menus/MenuDots';
import MenuPreview from './menus/MenuPreview';
import MenuShare from './menus/MenuShare';

import styles from '../styles/viewer.module.scss';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    currentScreenIndex: PropTypes.number,
    toggleFullscreen: PropTypes.func,
    fullscreenActive: PropTypes.bool,
    fullscreenEnabled: PropTypes.bool,
    closeable: PropTypes.bool,
    withShadow: PropTypes.bool,
    trackingEnabled: PropTypes.bool,
    shareBasePath: PropTypes.string,
    theme: MicromagPropTypes.viewerTheme,
    screenSize: MicromagPropTypes.screenSize,
    menuWidth: PropTypes.number,
    withDotItemClick: PropTypes.bool,
    withoutScreensMenu: PropTypes.bool,
    withoutShareMenu: PropTypes.bool,
    onClickScreen: PropTypes.func,
    onClickMenu: PropTypes.func,
    onClickCloseViewer: PropTypes.func,
    refDots: PropTypes.shape({
        current: PropTypes.any, // eslint-disable-line
    }),
};

const defaultProps = {
    currentScreenIndex: 0,
    toggleFullscreen: null,
    fullscreenActive: false,
    fullscreenEnabled: false,
    closeable: false,
    withShadow: false,
    trackingEnabled: false,
    shareBasePath: null,
    theme: null,
    screenSize: null,
    menuWidth: null,
    withDotItemClick: false,
    withoutScreensMenu: false,
    withoutShareMenu: false,
    onClickScreen: null,
    onClickMenu: null,
    onClickCloseViewer: null,
    refDots: null,
};

const ViewerMenu = ({
    story,
    currentScreenIndex,
    toggleFullscreen,
    fullscreenActive,
    fullscreenEnabled,
    closeable,
    withShadow,
    shareBasePath,
    trackingEnabled,
    theme: viewerTheme,
    screenSize,
    menuWidth,
    withDotItemClick,
    withoutScreensMenu,
    withoutShareMenu,
    onClickScreen: customOnClickScreen,
    onClickMenu: customOnClickMenu,
    onClickCloseViewer,
    refDots,
}) => {
    const { components: screens = [], title = null, metadata = null } = story;
    const { description = null } = metadata || {};
    const currentScreen = screens !== null ? screens[currentScreenIndex] || null : null;
    const { id: screenId = null, type: screenType = null } = currentScreen || {};
    const { menuTheme = null } = viewerTheme || {};

    const [menuOpened, setMenuOpened] = useState(false);
    const [shareOpened, setShareOpened] = useState(false);

    const items = useMemo(
        () =>
            screens
                .map((it) => {
                    const children = screens.filter((s) => s.parentId === it.id);
                    const currentChild = children.find((c) => c.id === screenId) || null;
                    const subIndex = children.findIndex((c) => c.id === screenId) + 1;
                    return {
                        screen: it,
                        screenId: it.id,
                        current: screenId === it.id || currentChild !== null,
                        visible: (it?.parentId || null) === null,
                        count: children.length + 1 || 1,
                        subIndex: subIndex || 0,
                    };
                })
                .filter(({ visible = true }) => visible),
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
        // @todo validate this
        // const base =
        //     typeof window !== 'undefined' ? window.location.origin.replace(/\/+$/, '') : '';
        // const path = shareBasePath !== null ? `${base}${shareBasePath}` : base;
        const base = typeof window !== 'undefined' ? window.location.host : '';
        const path = shareBasePath !== null ? `${base}${shareBasePath}` : base;
        return path;
    }, [shareBasePath]);

    // @todo sorta not super good here
    const onOpenMenu = useCallback(() => {
        setMenuOpened(true);
        setShareOpened(false);
        trackScreenEvent('viewer_menu', 'open_screens_menu');
    }, [setMenuOpened, setShareOpened, trackScreenEvent]);

    const onCloseMenu = useCallback(() => {
        setMenuOpened(false);
        setShareOpened(false);
        trackScreenEvent('viewer_menu', 'close_screens_menu');
    }, [setMenuOpened, setShareOpened, trackScreenEvent]);

    const onOpenShare = useCallback(() => {
        setShareOpened(true);
        setMenuOpened(false);
        trackScreenEvent('viewer_menu', 'open_share_menu');
    }, [setShareOpened, setMenuOpened, trackScreenEvent]);

    const onCloseShare = useCallback(() => {
        setShareOpened(false);
        setMenuOpened(false);
        trackScreenEvent('viewer_menu', 'close_share_menu');
    }, [setShareOpened, setMenuOpened, trackScreenEvent]);

    const onClickScreen = useCallback(
        (screen) => {
            setMenuOpened(false);
            if (customOnClickScreen !== null) {
                customOnClickScreen(screen);
            }
            const index = items.findIndex(({ id }) => id === screenId);
            trackScreenEvent('viewer_menu', 'click_screen_change', `Screen ${index + 1}`);
        },
        [customOnClickScreen, setMenuOpened, items, screenId, trackScreenEvent],
    );

    const onShare = useCallback(
        (type) => {
            // @todo display something to say thanks for sharing?
            trackScreenEvent('viewer_menu', 'shared_story', type);
        },
        [trackScreenEvent],
    );

    const computeShareProgress = useCallback(
        ({ active, direction: [, dy], movement: [, my], velocity: [, vy] }) => {
            const progress = Math.max(0, my) / (window.innerHeight * 0.8);
            const reachedThreshold = (vy > 0.3 || Math.abs(progress) > 0.3) && dy !== -1;
            if (!active) {
                if (reachedThreshold) onOpenShare();
                return reachedThreshold ? 1 : 0;
            }
            return progress;
        },
        [menuOpened, onOpenShare],
    );

    const {
        bind: bindShareDrag,
        dragging: isDraggingShare,
        progress: shareOpenedProgress,
    } = useDragProgress({
        progress: shareOpened ? 1 : 0,
        computeProgress: computeShareProgress,
        springParams: {
            config: { tension: 300, friction: 30 },
        },
    });

    const computeMenuProgress = useCallback(
        ({ active, direction: [, dy], movement: [, my], velocity: [, vy] }) => {
            const progress = Math.max(0, my) / (window.innerHeight * 0.8);
            const reachedThreshold = (vy > 0.3 || Math.abs(progress) > 0.3) && dy !== -1;
            if (!active) {
                if (reachedThreshold) onOpenMenu();
                return reachedThreshold ? 1 : 0;
            }
            return progress;
        },
        [menuOpened, onOpenMenu],
    );

    const {
        bind: bindMenuDrag,
        dragging: isDraggingMenu,
        progress: menuOpenedProgress,
    } = useDragProgress({
        progress: menuOpened ? 1 : 0,
        computeProgress: computeMenuProgress,
        springParams: { config: { tension: 300, friction: 30 } },
    });

    const keyboardShortcuts = useMemo(
        () => ({
            m: () => (!menuOpened ? onOpenMenu() : onCloseMenu()),
            escape: () => onCloseMenu(),
        }),
        [menuOpened, onOpenMenu, onCloseMenu],
    );
    useKeyboardShortcuts(keyboardShortcuts);

    // should be zero if either screens menu or share menu is opened
    const dotsOpacity = Math.min(1, Math.max(0, 1 - (menuOpenedProgress + shareOpenedProgress)));

    return (
        <>
            <div
                className={classNames([
                    styles.menuNavContainer,
                    {
                        [styles.withShadow]: withShadow,
                        [styles.isOpened]: menuOpened || shareOpened,
                    },
                ])}
                ref={refDots}
                style={{ width: menuWidth }}
            >
                <nav className={styles.menuTopContainer}>
                    {!withoutShareMenu ? (
                        <div
                            className={classNames([styles.menuItem, styles.menuShare])}
                            {...bindShareDrag()}
                        >
                            <SlidingButtons
                                className={styles.slidingButton}
                                current={shareOpenedProgress}
                                immediate={isDraggingShare}
                                buttons={[ShareButton, CloseButton]}
                                buttonsProps={[
                                    {
                                        key: 'share',
                                        className: styles.menuButton,
                                        onClick: onOpenShare,
                                        theme: menuTheme,
                                    },
                                    {
                                        key: 'close-share',
                                        className: styles.menuButton,
                                        onClick: onCloseShare,
                                        theme: menuTheme,
                                        iconPosition: 'left',
                                    },
                                ]}
                            />
                        </div>
                    ) : null}

                    {!withoutScreensMenu ? (
                        <div
                            className={classNames([styles.menuItem, styles.menuScreens])}
                            {...bindMenuDrag()}
                        >
                            <SlidingButtons
                                className={styles.slidingButton}
                                current={menuOpenedProgress}
                                immediate={isDraggingMenu}
                                buttons={[MenuButton, CloseButton]}
                                buttonsProps={[
                                    {
                                        key: 'menu',
                                        className: styles.menuButton,
                                        onClick: onOpenMenu,
                                        theme: menuTheme,
                                    },
                                    {
                                        key: 'close-menu',
                                        className: styles.menuButton,
                                        onClick: onCloseMenu,
                                        theme: menuTheme,
                                        iconPosition: 'right',
                                    },
                                ]}
                            />
                        </div>
                    ) : null}
                </nav>

                <MenuDots
                    {...menuTheme}
                    direction="horizontal"
                    items={items}
                    onClickDot={onClickScreen}
                    onClickMenu={onOpenMenu}
                    closeable={closeable}
                    withItemClick={withDotItemClick}
                    withoutScreensMenu={withoutScreensMenu}
                    withoutShareMenu={withoutShareMenu}
                    onClose={onClickCloseViewer}
                    className={styles.dots}
                    style={{
                        opacity: dotsOpacity,
                    }}
                />
            </div>

            <MenuContainer
                className={styles.menuContainerShare}
                transitionProgress={shareOpenedProgress}
            >
                <MenuShare
                    viewerTheme={viewerTheme}
                    className={styles.menuShare}
                    title={title}
                    description={description}
                    menuWidth={menuWidth}
                    focusable={shareOpened}
                    items={items}
                    currentScreenIndex={currentScreenIndex}
                    shareUrl={shareUrl}
                    onShare={onShare}
                    onClose={onCloseShare}
                />
            </MenuContainer>

            <MenuContainer
                className={styles.menuContainerScreens}
                transitionProgress={menuOpenedProgress}
            >
                <MenuPreview
                    viewerTheme={viewerTheme}
                    className={styles.menuPreview}
                    screenSize={screenSize}
                    menuWidth={menuWidth}
                    focusable={menuOpened}
                    items={items}
                    currentScreenIndex={currentScreenIndex}
                    shareUrl={shareUrl}
                    onShare={onShare}
                    onClickScreen={onClickScreen}
                    onClose={onCloseMenu}
                    toggleFullscreen={toggleFullscreen}
                    fullscreenActive={fullscreenActive}
                    fullscreenEnabled={fullscreenEnabled}
                />
            </MenuContainer>
        </>
    );
};

ViewerMenu.propTypes = propTypes;
ViewerMenu.defaultProps = defaultProps;

export default ViewerMenu;
