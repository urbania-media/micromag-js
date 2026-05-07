import classNames from 'classnames';
import { ForwardedRef, ReactNode, useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';

import type { ScreenSize, Story, ViewerTheme } from '@micromag/core';
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

import styles from '../styles/viewer.module.css';

interface ViewerMenuProps {
    story: Story;
    menuItems?: (string | ReactNode)[];
    currentScreenIndex?: number;
    toggleFullscreen?: ((...args: unknown[]) => void) | null;
    fullscreenActive?: boolean;
    fullscreenEnabled?: boolean;
    menuDotsButtons?: ReactNode | null;
    closeable?: boolean;
    withShadow?: boolean;
    trackingEnabled?: boolean;
    shareBasePath?: string | null;
    shareOptions?: string[] | null;
    theme?: ViewerTheme | null;
    screenSize?: ScreenSize | null;
    menuWidth?: number | null;
    previewHeader?: ReactNode | null;
    previewFooter?: ReactNode | null;
    afterShareMenuButton?: ReactNode | null;
    beforeScreensMenuButton?: ReactNode | null;
    withMicromagBranding?: boolean;
    withDotItemClick?: boolean;
    withoutScreensMenu?: boolean;
    withoutShareMenu?: boolean;
    onClickScreen?: ((...args: unknown[]) => void) | null;
    onClickCloseViewer?: ((...args: unknown[]) => void) | null;
    onChange?: ((...args: unknown[]) => void) | null;
    refDots?: ForwardedRef<HTMLDivElement> | null;
}

const defaultMenuItems = ['share', 'main'];

function ViewerMenu({
    story,
    menuItems = defaultMenuItems,
    currentScreenIndex = 0,
    toggleFullscreen = null,
    fullscreenActive = false,
    fullscreenEnabled = false,
    menuDotsButtons = null,
    closeable = false,
    withShadow = false,
    shareBasePath = null,
    shareOptions = null,
    trackingEnabled = false,
    theme: viewerTheme = null,
    screenSize = null,
    menuWidth = null,
    previewHeader = null,
    previewFooter = null,
    afterShareMenuButton = null,
    beforeScreensMenuButton = null,
    withMicromagBranding = false,
    withDotItemClick = false,
    withoutScreensMenu = false,
    withoutShareMenu = false,
    onClickScreen: customOnClickScreen = null,
    onChange = null,

    // onClickMenu: customOnClickMenu,
    onClickCloseViewer = null,

    refDots = null,
}: ViewerMenuProps) {
    const { components: screens = [], title = null, metadata = null } = story;
    const { description = null } = metadata || {};
    const currentScreen = screens !== null ? screens[currentScreenIndex] || null : null;
    const { id: screenId = null, type: screenType = null } = currentScreen || {};
    const { menuTheme = null } = viewerTheme || {};
    const { height: viewerHeight } = useViewerSize();

    const [menuOpened, setMenuOpened] = useState(false);
    const [shareOpened, setShareOpened] = useState(false);

    const { ref: navContainerRef, height: navContainerHeight = 0 } = useDimensionObserver();

    const items = screens
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
        .filter(({ visible = true }) => visible);
    const trackEvent = useTrackEvent();
    const trackScreenEvent = (cat, action, label = null) => {
        if (trackingEnabled) {
            trackEvent(cat, action, label, {
                screenId,
                screenIndex: currentScreenIndex,
                screenType,
            });
        }
    };

    const base =
        typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
    const isFull = shareBasePath !== null && shareBasePath.indexOf('http') !== -1;
    const partialPath = shareBasePath !== null ? `${base}${shareBasePath}` : base;
    const shareUrl =
        shareBasePath !== null && isFull ? shareBasePath.replace(/\/$/, '') : partialPath;

    const onOpenMenu = () => {
        setMenuOpened(true);
        setShareOpened(false);
        trackScreenEvent('viewer_menu', 'open_screens_menu');
    };

    const onCloseMenu = () => {
        setMenuOpened(false);
        setShareOpened(false);
        trackScreenEvent('viewer_menu', 'close_screens_menu');
    };

    const onOpenShare = () => {
        setShareOpened(true);
        setMenuOpened(false);
        trackScreenEvent('viewer_menu', 'open_share_menu');
    };

    const onCloseShare = () => {
        setShareOpened(false);
        setMenuOpened(false);
        trackScreenEvent('viewer_menu', 'close_share_menu');
    };

    const onClickScreen = (screen) => {
        setMenuOpened(false);
        if (customOnClickScreen !== null) {
            customOnClickScreen(screen);
        }
        const index = items.findIndex(({ id }) => id === screenId);
        trackScreenEvent('viewer_menu', 'click_screen_change', `Screen ${index + 1}`);
    };

    useEffect(() => {
        if (onChange !== null) {
            onChange({ menuOpen: menuOpened, shareOpen: shareOpened });
        }
    }, [onChange, menuOpened, shareOpened]);

    const onShare = (type) => {
        // @todo display something to say thanks for sharing?
        trackScreenEvent('viewer_menu', 'shared_story', type);
    };

    const computeShareProgress = ({
        active,
        direction: [, dy],
        movement: [, my],
        velocity: [, vy],
    }) => {
        const progress = Math.max(0, my) / (viewerHeight * 0.8);
        const reachedThreshold = (vy > 0.3 || Math.abs(progress) > 0.3) && dy !== -1;
        if (!active) {
            if (reachedThreshold) onOpenShare();
            return reachedThreshold ? 1 : 0;
        }
        return progress;
    };

    const computeShareProgressClose = ({
        active,
        direction: [, dy],
        movement: [, my],
        velocity: [, vy],
    }) => {
        const progress = Math.max(0, my) / (viewerHeight * 0.8);
        const reachedThreshold = (vy > 0.3 || Math.abs(progress) > 0.3) && dy !== -1;
        if (!active) {
            if (reachedThreshold) onCloseShare();
            return reachedThreshold ? 0 : 1;
        }
        return 1 - progress;
    };

    const springParams = {
        config: { tension: 300, friction: 30 },
    };
    const {
        bind: bindShareDrag,
        dragging: draggingShare,
        progress: shareOpenedProgress,
    } = useDragProgress({
        progress: shareOpened ? 1 : 0,
        computeProgress: shareOpened ? computeShareProgressClose : computeShareProgress,
        springParams,
        dragOptions: {
            axis: 'y',
            pointer: {
                keys: false,
            },
        },
    });

    const computeMenuProgress = ({
        active,
        direction: [, dy],
        movement: [, my],
        velocity: [, vy],
    }) => {
        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
        const progress = windowHeight > 0 ? Math.max(0, my) / (windowHeight * 0.8) : 0;
        const reachedThreshold = (vy > 0.3 || Math.abs(progress) > 0.3) && dy !== -1;
        if (!active) {
            if (reachedThreshold) onOpenMenu();
            return reachedThreshold ? 1 : 0;
        }
        return progress;
    };
    const computeMenuProgressClose = ({
        active,
        direction: [, dy],
        movement: [, my],
        velocity: [, vy],
    }) => {
        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
        const progress = windowHeight > 0 ? Math.max(0, my) / (windowHeight * 0.8) : 0;
        const reachedThreshold = (vy > 0.3 || Math.abs(progress) > 0.3) && dy !== -1;
        if (!active) {
            if (reachedThreshold) onCloseMenu();
            return reachedThreshold ? 0 : 1;
        }
        return 1 - progress;
    };

    const {
        bind: bindMenuDrag,
        dragging: draggingMenu,
        progress: menuOpenedProgress,
    } = useDragProgress({
        progress: menuOpened ? 1 : 0,
        computeProgress: menuOpened ? computeMenuProgressClose : computeMenuProgress,
        springParams,
        dragOptions: {
            axis: 'y',
            pointer: {
                keys: false,
            },
        },
    });

    useKeyboardShortcuts({
        m: () => (!menuOpened ? onOpenMenu() : onCloseMenu()),
        escape: () => onCloseMenu(),
    });

    // @TODO: Fix if needed
    // const menuOpenedProgressValue = menuOpenedProgress ? menuOpenedProgress.value || 0 : 0;
    // const shareOpenedProgressValue = shareOpenedProgress ? shareOpenedProgress.value || 0 : 0;
    // should be zero if either screens menu or share menu is opened
    // const dotsOpacity = useEffect(() => {
    //     Math.min(1, Math.max(0, 1 - (menuOpenedProgressValue + shareOpenedProgressValue)));
    // }, [menuOpenedProgressValue, shareOpenedProgressValue]);

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
                    {menuItems.map((item) => {
                        if (item === 'share') {
                            return !withoutShareMenu || afterShareMenuButton !== null ? (
                                <div key="share" className={styles.menuItem} {...bindShareDrag()}>
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
                            ) : null;
                        }
                        if (item === 'main') {
                            return !withoutScreensMenu || beforeScreensMenuButton !== null ? (
                                <div key="main" className={styles.menuItem} {...bindMenuDrag()}>
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
                            ) : null;
                        }
                        return item || null;
                    })}
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
                            shareOptions={shareOptions}
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
                {menuOpened || draggingMenu ? (
                    <FocusLock group="screens" disabled={!menuOpened} returnFocus>
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
                            withMicromagBranding={withMicromagBranding}
                        />
                    </FocusLock>
                ) : null}
            </MenuContainer>
        </>
    );
}

export default ViewerMenu;
