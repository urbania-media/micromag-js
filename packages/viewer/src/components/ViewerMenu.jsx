/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FocusLock from 'react-focus-lock';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useViewerSize } from '@micromag/core/contexts';
import { useDimensionObserver, useDragProgress, useTrackEvent } from '@micromag/core/hooks';

import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

import CloseMenuButton from './buttons/CloseMenuButton';
import MenuButton from './buttons/MenuButton';
import ShareButton from './buttons/ShareButton';
import ToggleButton from './buttons/ToggleButton';
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
    menuDotsButtons: PropTypes.node,
    closeable: PropTypes.bool,
    withShadow: PropTypes.bool,
    trackingEnabled: PropTypes.bool,
    shareBasePath: PropTypes.string,
    theme: MicromagPropTypes.viewerTheme,
    screenSize: MicromagPropTypes.screenSize,
    menuWidth: PropTypes.number,
    previewHeader: PropTypes.node,
    previewFooter: PropTypes.node,
    afterShareMenuButton: PropTypes.node,
    beforeScreensMenuButton: PropTypes.node,
    withDotItemClick: PropTypes.bool,
    withoutScreensMenu: PropTypes.bool,
    withoutShareMenu: PropTypes.bool,
    onClickScreen: PropTypes.func,
    // onClickMenu: PropTypes.func,
    onClickCloseViewer: PropTypes.func,
    onChange: PropTypes.func,
    refDots: PropTypes.shape({
        current: PropTypes.any, // eslint-disable-line
    }),
};

const defaultProps = {
    currentScreenIndex: 0,
    toggleFullscreen: null,
    fullscreenActive: false,
    fullscreenEnabled: false,
    menuDotsButtons: null,
    closeable: false,
    withShadow: false,
    trackingEnabled: false,
    shareBasePath: null,
    theme: null,
    screenSize: null,
    menuWidth: null,
    previewHeader: null,
    previewFooter: null,
    afterShareMenuButton: null,
    beforeScreensMenuButton: null,
    withDotItemClick: false,
    withoutScreensMenu: false,
    withoutShareMenu: false,
    onClickScreen: null,
    onChange: null,
    // onClickMenu: null,
    onClickCloseViewer: null,
    refDots: null,
};

const ViewerMenu = ({
    story,
    currentScreenIndex,
    toggleFullscreen,
    fullscreenActive,
    fullscreenEnabled,
    menuDotsButtons,
    closeable,
    withShadow,
    shareBasePath,
    trackingEnabled,
    theme: viewerTheme,
    screenSize,
    menuWidth,
    previewHeader,
    previewFooter,
    afterShareMenuButton,
    beforeScreensMenuButton,
    withDotItemClick,
    withoutScreensMenu,
    withoutShareMenu,
    onClickScreen: customOnClickScreen,
    onChange,
    // onClickMenu: customOnClickMenu,
    onClickCloseViewer,
    refDots,
}) => {
    const { components: screens = [], title = null, metadata = null } = story;
    const { description = null } = metadata || {};
    const currentScreen = screens !== null ? screens[currentScreenIndex] || null : null;
    const { id: screenId = null, type: screenType = null } = currentScreen || {};
    const { menuTheme = null } = viewerTheme || {};
    const { height: viewerHeight } = useViewerSize();

    const [menuOpened, setMenuOpened] = useState(false);
    const [shareOpened, setShareOpened] = useState(false);
    const [menuMounted, setMenuMounted] = useState(false);

    const { ref: navContainerRef, height: navContainerHeight = 0 } = useDimensionObserver();

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
        const base =
            typeof window !== 'undefined'
                ? `${window.location.protocol}//${window.location.host}`
                : '';
        const path = shareBasePath !== null ? `${base}${shareBasePath}` : base;
        return path;
    }, [shareBasePath]);

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

    useEffect(() => {
        if (onChange !== null) {
            onChange({ menuOpen: menuOpened, shareOpen: shareOpened });
        }
    }, [onChange, menuOpened, shareOpened]);

    const onShare = useCallback(
        (type) => {
            // @todo display something to say thanks for sharing?
            trackScreenEvent('viewer_menu', 'shared_story', type);
        },
        [trackScreenEvent],
    );

    const computeShareProgress = useCallback(
        ({ active, direction: [, dy], movement: [, my], velocity: [, vy] }) => {
            const progress = Math.max(0, my) / (viewerHeight * 0.8);
            const reachedThreshold = (vy > 0.3 || Math.abs(progress) > 0.3) && dy !== -1;
            if (!active) {
                if (reachedThreshold) onOpenShare();
                return reachedThreshold ? 1 : 0;
            }
            return progress;
        },
        [onOpenShare, viewerHeight],
    );

    const computeShareProgressClose = useCallback(
        ({ active, direction: [, dy], movement: [, my], velocity: [, vy] }) => {
            const progress = Math.max(0, my) / (viewerHeight * 0.8);
            const reachedThreshold = (vy > 0.3 || Math.abs(progress) > 0.3) && dy !== -1;
            if (!active) {
                if (reachedThreshold) onCloseShare();
                return reachedThreshold ? 0 : 1;
            }
            return 1 - progress;
        },
        [onCloseShare, viewerHeight],
    );

    const springParams = useMemo(
        () => ({
            config: { tension: 300, friction: 30 },
        }),
        [],
    );
    const {
        bind: bindShareDrag,
        dragging: draggingShare,
        progress: shareOpenedProgress,
    } = useDragProgress({
        progress: shareOpened ? 1 : 0,
        computeProgress: shareOpened ? computeShareProgressClose : computeShareProgress,
        springParams,
        drapOptions: {
            axis: 'y',
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
        [onOpenMenu],
    );
    const computeMenuProgressClose = useCallback(
        ({ active, direction: [, dy], movement: [, my], velocity: [, vy] }) => {
            const progress = Math.max(0, my) / (window.innerHeight * 0.8);
            const reachedThreshold = (vy > 0.3 || Math.abs(progress) > 0.3) && dy !== -1;
            if (!active) {
                if (reachedThreshold) onCloseMenu();
                return reachedThreshold ? 0 : 1;
            }
            return 1 - progress;
        },
        [onCloseMenu],
    );

    const {
        bind: bindMenuDrag,
        dragging: draggingMenu,
        progress: menuOpenedProgress,
    } = useDragProgress({
        progress: menuOpened ? 1 : 0,
        computeProgress: menuOpened ? computeMenuProgressClose : computeMenuProgress,
        springParams,
        drapOptions: {
            axis: 'y',
        },
    });

    const keyboardShortcuts = useMemo(
        () => ({
            m: () => (!menuOpened ? onOpenMenu() : onCloseMenu()),
            escape: () => onCloseMenu(),
        }),
        [menuOpened, onOpenMenu, onCloseMenu],
    );
    useKeyboardShortcuts(keyboardShortcuts);

    // @TODO: Fix if needed
    // const menuOpenedProgressValue = menuOpenedProgress ? menuOpenedProgress.value || 0 : 0;
    // const shareOpenedProgressValue = shareOpenedProgress ? shareOpenedProgress.value || 0 : 0;
    // should be zero if either screens menu or share menu is opened
    // const dotsOpacity = useEffect(() => {
    //     Math.min(1, Math.max(0, 1 - (menuOpenedProgressValue + shareOpenedProgressValue)));
    // }, [menuOpenedProgressValue, shareOpenedProgressValue]);

    useEffect(() => {
        if ((menuOpened || draggingMenu) && !menuMounted) {
            setMenuMounted(true);
        } else if (!menuOpened && !draggingMenu && menuMounted) {
            setMenuMounted(false);
        }
    }, [menuOpened, draggingMenu, menuMounted, setMenuMounted]);

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
                <nav className={styles.menuTopContainer} ref={navContainerRef}>
                    {!withoutShareMenu || afterShareMenuButton !== null ? (
                        <div className={styles.menuItem} {...bindShareDrag()}>
                            {!withoutShareMenu ? (
                                <ToggleButton
                                    className={styles.slidingButton}
                                    button={
                                        <ShareButton
                                            className={styles.menuButton}
                                            onClick={onOpenShare}
                                            theme={menuTheme}
                                            iconPosition="left"
                                            focusable={!shareOpened}
                                        />
                                    }
                                    toggledButton={
                                        <FocusLock
                                            group="share"
                                            disabled={!shareOpened}
                                            returnFocus
                                        >
                                            <CloseMenuButton
                                                className={styles.menuButton}
                                                onClick={onCloseShare}
                                                theme={menuTheme}
                                                iconPosition="left"
                                                focusable={shareOpened}
                                                single
                                            />
                                        </FocusLock>
                                    }
                                    progressSpring={shareOpenedProgress}
                                />
                            ) : null}
                            {afterShareMenuButton}
                        </div>
                    ) : null}
                    {!withoutScreensMenu || beforeScreensMenuButton !== null ? (
                        <div className={styles.menuItem} {...bindMenuDrag()}>
                            {beforeScreensMenuButton}
                            {!withoutScreensMenu ? (
                                <ToggleButton
                                    className={styles.slidingButton}
                                    button={
                                        <MenuButton
                                            className={styles.menuButton}
                                            iconClassName={styles.menuButtonIcon}
                                            onClick={onOpenMenu}
                                            theme={menuTheme}
                                            focusable={!menuOpened}
                                        />
                                    }
                                    toggledButton={
                                        <FocusLock
                                            group="screens"
                                            disabled={!menuOpened}
                                            returnFocus
                                        >
                                            <CloseMenuButton
                                                className={styles.menuButton}
                                                onClick={onCloseMenu}
                                                theme={menuTheme}
                                                iconPosition="right"
                                                focusable={menuOpened}
                                            />
                                        </FocusLock>
                                    }
                                    progressSpring={menuOpenedProgress}
                                    toggledButtonClassName={styles.screensMenuButtonToggled}
                                />
                            ) : null}
                        </div>
                    ) : null}
                </nav>
                <MenuDots
                    {...menuTheme}
                    direction="horizontal"
                    items={items}
                    onClickDot={onClickScreen}
                    onClickScreensMenu={onOpenMenu}
                    buttons={menuDotsButtons}
                    closeable={closeable}
                    withItemClick={withDotItemClick}
                    withoutScreensMenu={withoutScreensMenu}
                    withoutShareMenu={withoutShareMenu}
                    onClose={onClickCloseViewer}
                    className={styles.dots}
                />
            </div>
            <MenuContainer
                className={styles.menuContainer}
                progressSpring={shareOpenedProgress}
                theme={viewerTheme}
            >
                {draggingShare || shareOpened ? (
                    <FocusLock group="share" disabled={!shareOpened} returnFocus>
                        <MenuShare
                            viewerTheme={viewerTheme}
                            className={styles.menuShare}
                            title={title}
                            description={description}
                            menuWidth={menuWidth}
                            paddingTop={navContainerHeight}
                            focusable={shareOpened}
                            items={items}
                            currentScreenIndex={currentScreenIndex}
                            shareUrl={shareUrl}
                            onShare={onShare}
                            onClose={onCloseShare}
                        />
                    </FocusLock>
                ) : null}
            </MenuContainer>
            <MenuContainer
                className={styles.menuContainer}
                progressSpring={menuOpenedProgress}
                theme={viewerTheme}
            >
                {menuMounted ? (
                    <FocusLock group="screens" disabled={!menuOpened}>
                        <MenuPreview
                            viewerTheme={viewerTheme}
                            header={previewHeader}
                            footer={previewFooter}
                            title={title}
                            className={styles.menuPreview}
                            screenSize={screenSize}
                            menuWidth={menuWidth}
                            paddingTop={navContainerHeight}
                            items={items}
                            currentScreenIndex={currentScreenIndex}
                            shareUrl={shareUrl}
                            onShare={onShare}
                            onClickScreen={onClickScreen}
                            onClose={onCloseMenu}
                            scrollDisabled={draggingMenu}
                            toggleFullscreen={toggleFullscreen}
                            fullscreenActive={fullscreenActive}
                            fullscreenEnabled={fullscreenEnabled}
                        />
                    </FocusLock>
                ) : null}
            </MenuContainer>
        </>
    );
};

ViewerMenu.propTypes = propTypes;
ViewerMenu.defaultProps = defaultProps;

export default React.memo(ViewerMenu);
