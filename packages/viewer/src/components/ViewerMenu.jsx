/* eslint-disable react/jsx-props-no-spreading */
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';
import { useDimensionObserver, useTrackEvent } from '@micromag/core/hooks';

import MenuDots from './menus/MenuDots';
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
    onRequestOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    onClickItem: PropTypes.func,
    onClickMenu: PropTypes.func,
    onClickShare: PropTypes.func,
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
    onRequestOpen: null,
    onRequestClose: null,
    onClickItem: null,
    onClickMenu: null,
    onClickShare: null,
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
    onRequestOpen,
    onRequestClose,
    onClickItem: customOnClickItem,
    onClickMenu: customOnClickMenu,
    onClickShare: customOnClickShare,
    onClickCloseViewer,
    refDots,
}) => {
    const intl = useIntl();
    const { components: screens = [], title = null, metadata = null } = story;
    const { description = null } = metadata || {};
    const currentScreen = screens !== null ? screens[currentScreenIndex] || null : null;
    const { id: screenId = null, type: screenType = null } = currentScreen || {};
    const [showShare, setShowShare] = useState(false);

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

    const [{ y: menuY }, setMenuSpring] = useSpring(() => ({
        y: 0,
        config: { tension: 400, friction: 35 },
    }));
    const refOpened = useRef(opened);
    if (refOpened.current !== opened) {
        refOpened.current = opened;
    }

    useEffect(() => {
        setMenuSpring.start({ y: opened ? 1 : 0 });
    }, [opened]);

    const { ref: menuPreviewContainerRef, height: menuPreviewContainerHeight = 0 } =
        useDimensionObserver();

    const menuPreviewStyles = {
        transform: menuY.to((y) => `translateY(${y * 100}%)`),
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
                setMenuSpring.start({ y: yProgress, immediate: true });
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
        setShowShare(false);
        trackScreenEvent('viewer_menu', 'click_close', 'Close icon');
    }, [onRequestClose, setShowShare, trackScreenEvent]);

    const onClickShare = useCallback(() => {
        if (customOnClickShare !== null) {
            customOnClickShare();
        }
        setShowShare(true);
        trackScreenEvent('viewer_menu', 'click_share');
    }, [customOnClickShare, setShowShare, trackScreenEvent]);

    const onStoryShared = useCallback(
        (type) => {
            setShowShare(false);
            trackScreenEvent('viewer_menu', 'shared_story', type);
        },
        [setShowShare, trackScreenEvent],
    );

    const { menuTheme = null } = viewerTheme || {};

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
                {...menuDragBind()}
            >
                <nav className={styles.menuTopContainer}>
                    {!withoutShareMenu ? (
                        <div className={classNames([styles.menuItem, styles.menuShare])}>
                            <Button
                                className={styles.menuButton}
                                labelClassName={styles.menuLabel}
                                onClick={onClickShare}
                                label={intl.formatMessage({
                                    defaultMessage: 'Share',
                                    description: 'Button label',
                                })}
                                icon={
                                    <svg
                                        className={styles.menuIcon}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="16"
                                        viewBox="0 0 10 16"
                                        fill="currentColor"
                                        {...menuTheme}
                                    >
                                        <polygon points="8.5 14.5 1.5 14.5 1.5 8 0 8 0 16 10 16 10 8 8.5 8 8.5 14.5" />
                                        <polygon points="9.62 4.62 5 0 0.38 4.62 1.44 5.68 4.25 2.87 4.25 11.26 5.75 11.26 5.75 2.87 8.56 5.68 9.62 4.62" />
                                    </svg>
                                }
                            />
                        </div>
                    ) : null}

                    {!withoutScreensMenu ? (
                        <div className={classNames([styles.menuItem, styles.menuScreens])}>
                            <Button
                                className={styles.menuButton}
                                labelClassName={styles.menuLabel}
                                label={intl.formatMessage({
                                    defaultMessage: 'Menu',
                                    description: 'Button label',
                                })}
                                iconPosition="right"
                                icon={
                                    <svg
                                        className={styles.menuIcon}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="16"
                                        viewBox="0 0 10 16"
                                        fill="currentColor"
                                        {...menuTheme}
                                    >
                                        <rect width="10" height="16" />
                                    </svg>
                                }
                                onClick={onClickMenu}
                            />
                        </div>
                    ) : null}
                </nav>

                <MenuDots
                    {...menuTheme}
                    direction="horizontal"
                    items={items}
                    onClickItem={onClickItem}
                    onClickMenu={onClickMenu}
                    closeable={closeable}
                    withItemClick={withDotItemClick}
                    withoutScreensMenu={withoutScreensMenu}
                    withoutShareMenu={withoutShareMenu}
                    onClose={onClickCloseViewer}
                    className={styles.dots}
                />
            </div>
            <animated.div
                className={styles.menuPreviewContainer}
                style={menuPreviewStyles}
                ref={menuPreviewContainerRef}
            >
                <animated.div
                    className={styles.menuPreviewInner}
                    // ref={menuPreviewInnerRef}
                >
                    <MenuPreview
                        viewerTheme={viewerTheme}
                        className={styles.menuPreview}
                        screenSize={screenSize}
                        title={title}
                        description={description}
                        menuWidth={menuWidth}
                        focusable={opened}
                        items={items}
                        currentScreenIndex={currentScreenIndex}
                        showShare={showShare}
                        shareUrl={shareUrl}
                        onShare={onStoryShared}
                        onClickItem={onClickItem}
                        onClose={onClickClose}
                        toggleFullscreen={toggleFullscreen}
                        fullscreenActive={fullscreenActive}
                        fullscreenEnabled={fullscreenEnabled}
                    />
                </animated.div>
            </animated.div>
        </>
    );
};

ViewerMenu.propTypes = propTypes;
ViewerMenu.defaultProps = defaultProps;

export default ViewerMenu;
