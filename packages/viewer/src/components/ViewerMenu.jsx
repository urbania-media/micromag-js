/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useTrackEvent, useVerticalDrag } from '@micromag/core/hooks';
// import { useViewerInteraction } from '@micromag/core/contexts';
import { CloseButton, SlidingButtons } from '@micromag/core/components';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

import MenuButton from './buttons/MenuButton';
import ShareButton from './buttons/ShareButton';
import MenuContainer from './menus/MenuContainer';
import MenuDots from './menus/MenuDots';
import MenuShare from './menus/MenuShare';
import MenuPreview from './menus/MenuPreview';

import styles from '../styles/viewer.module.scss';

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
    opened: false,
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
    opened,
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

    const {
        bind: bindMenuDrag,
        dragging: isDraggingMenu,
        progress: menuProgress,
    } = useVerticalDrag({
        value: menuOpened ? 1 : 0,
        maxDistance: window.innerHeight * 0.75,
        disabled: menuOpened,
        onSwipeUp: onCloseMenu,
        onSwipeDown: onOpenMenu,
    });

    const {
        bind: bindShareDrag,
        dragging: isDraggingShare,
        progress: shareProgress,
    } = useVerticalDrag({
        value: shareOpened ? 1 : 0,
        maxDistance: window.innerHeight * 0.75,
        disabled: shareOpened,
        onSwipeUp: onCloseShare,
        onSwipeDown: onOpenShare,
    });

    const keyboardShortcuts = useMemo(
        () => ({
            m: () => !menuOpened ? onOpenMenu() : onCloseMenu(),
            escape: () => onCloseMenu(),
        }),
        [menuOpened, onOpenMenu, onCloseMenu],
    );
    useKeyboardShortcuts(keyboardShortcuts);

    return (
        <>
            <div
                className={classNames([
                    styles.menuNavContainer,
                    {
                        [styles.withShadow]: withShadow,
                        [styles.isMenuOpened]: opened,
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
                                current={shareProgress}
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
                                current={menuProgress}
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
                />
            </div>

            <MenuContainer
                className={styles.menuContainerScreens}
                transitionProgress={menuProgress}
                immediate={isDraggingMenu}>
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

            <MenuContainer className={styles.menuContainerShare} transitionProgress={shareProgress}
                immediate={isDraggingMenu}
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
        </>
    );
};

ViewerMenu.propTypes = propTypes;
ViewerMenu.defaultProps = defaultProps;

export default ViewerMenu;
