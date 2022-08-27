/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label, jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading, arrow-body-style */
// stylelint-disable stylelint-family-no-missing-generic-family-keyword
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useDimensionObserver } from '@micromag/core/hooks';
import { getStyleFromColor } from '@micromag/core/utils';
import Scroll from '@micromag/element-scroll';
import ShareOptions from '@micromag/element-share-options';

import MicromagPreview from '../partials/MicromagPreview';
import MenuScreen from './MenuScreen';

import styles from '../../styles/menus/menu-preview.module.scss';

const propTypes = {
    viewerTheme: MicromagPropTypes.viewerTheme,
    screenSize: MicromagPropTypes.screenSize,
    menuWidth: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    items: MicromagPropTypes.menuItems,
    focusable: PropTypes.bool,
    shouldLoad: PropTypes.bool,
    currentScreenIndex: PropTypes.number,
    shareUrl: PropTypes.string,
    onShare: PropTypes.func,
    onClickItem: PropTypes.func,
    onClose: PropTypes.func,
    maxThumbsWidth: PropTypes.number,
    toggleFullscreen: PropTypes.func,
    showShare: PropTypes.bool,
    fullscreenActive: PropTypes.bool,
    fullscreenEnabled: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    viewerTheme: null,
    screenSize: null,
    menuWidth: null,
    title: null,
    description: null,
    items: [],
    focusable: true,
    currentScreenIndex: 0,
    shouldLoad: true,
    showShare: false,
    shareUrl: null,
    onShare: null,
    onClickItem: null,
    onClose: null,
    maxThumbsWidth: 140,
    toggleFullscreen: null,
    fullscreenActive: false,
    fullscreenEnabled: false,
    className: null,
};

const ViewerMenuPreview = ({
    viewerTheme,
    screenSize,
    menuWidth,
    title,
    description,
    items,
    focusable,
    currentScreenIndex,
    showShare,
    shareUrl,
    onShare,
    onClickItem,
    onClose,
    maxThumbsWidth,
    toggleFullscreen,
    fullscreenActive,
    fullscreenEnabled,
    className,
}) => {
    const intl = useIntl();
    // const { ref: firstScreenContainerRef, width: thumbWidth = 0 } = useDimensionObserver();
    const { ref: containerRef, width: contentWidth = 0 } = useDimensionObserver();
    const thumbsPerLine = Math.max(Math.floor(contentWidth / maxThumbsWidth), 3);

    // Viewer theme
    // @todo room for improvement here probably
    const { colors = null, background = null, logo: brandLogo = null } = viewerTheme || {};
    const { primary: brandPrimaryColor = null, secondary: brandSecondaryColor = null } =
        colors || {};
    const { color: brandBackgroundColor = null, image = null } = background || {};
    const { url: brandImageUrl = null } = image || {};

    // const borderPrimaryColorStyle = getStyleFromColor(brandPrimaryColor, 'borderColor');
    // const colorSecondaryColorStyle = getStyleFromColor(brandSecondaryColor, 'color');
    const backgroundColorStyle = getStyleFromColor(brandBackgroundColor, 'backgroundColor');
    // const { url: brandLogoUrl = null } = brandLogo || {};
    const brandImageStyle =
        brandImageUrl !== null
            ? {
                  backgroundImage: `url(${brandImageUrl})`,
              }
            : null;

    // @todo could probably use some work to avoid the visual jump from 3 screens to all of them
    const finalItems = useMemo(
        () => (!focusable ? items.map((s, i) => (i > 3 ? { screenId: s.screenId } : s)) : items),
        [items, focusable],
    );
    // @todo bookmarks
    // const bookmarks = finalItems.reduce((acc, it) => {
    //     const { screen = null } = it || {};
    //     const { bookmark = null } = screen || {};
    //     return bookmark !== null ? [...acc, bookmark] : acc; // merge with array or return original array
    // }, []);

    const coverScreen = useMemo(() => {
        const { screen = null } = finalItems[0] || {};
        return screen;
    }, [finalItems]);
    const currentScreen = useMemo(() => {
        const found = items.find((item) => {
            const { current = false } = item || {};
            return current;
        });
        const { screen = null } = found || {};

        return screen;
    }, [items, currentScreenIndex, focusable]);

    const [shareCurrentScreen, setShareCurrentScreen] = useState(false);
    const onShareModeChange = useCallback(() => {
        setShareCurrentScreen((value) => !value);
    }, [setShareCurrentScreen]);

    const [finalShareUrl, setFinalShareUrl] = useState(shareUrl);
    useEffect(() => {
        setFinalShareUrl(
            shareCurrentScreen && currentScreenIndex !== 0
                ? `${shareUrl}/${currentScreenIndex}`
                : shareUrl,
        );
    }, [shareCurrentScreen, currentScreenIndex, setFinalShareUrl]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.showShare]: showShare,
                },
            ])}
            style={{ ...backgroundColorStyle, ...brandImageStyle, width: menuWidth }}
            aria-hidden={focusable ? null : 'true'}
        >
            {/* <div className={styles.header}>
                {brandLogoUrl !== null ? (
                    <div
                        className={styles.organisation}
                        style={{ backgroundImage: `url(${brandLogoUrl})` }}
                    />
                ) : null}
                <div className={styles.buttons} style={colorSecondaryColorStyle}>
                    {!showShare && fullscreenEnabled ? (
                        <Button
                            className={styles.button}
                            onClick={toggleFullscreen}
                            label={intl.formatMessage({
                                defaultMessage: 'Fullscreen',
                                description: 'Button label',
                            })}
                            focusable={focusable}
                            icon={
                                fullscreenActive ? (
                                    <svg
                                        className={styles.icon}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="16"
                                        viewBox="0 0 10 16"
                                        fill="currentColor"
                                    >
                                        <polygon points="2.5 13.5 2.5 16 4 16 4 12 0 12 0 13.5 2.5 13.5" />
                                        <polygon points="7.5 13.5 10 13.5 10 12 6 12 6 16 7.5 16 7.5 13.5" />
                                        <polygon points="2.5 2.5 0 2.5 0 4 4 4 4 0 2.5 0 2.5 2.5" />
                                        <polygon points="7.5 2.5 7.5 0 6 0 6 4 10 4 10 2.5 7.5 2.5" />
                                    </svg>
                                ) : (
                                    <svg
                                        className={styles.icon}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="16"
                                        viewBox="0 0 10 16"
                                        fill="currentColor"
                                    >
                                        <polygon points="1.5 14.5 1.5 12 0 12 0 16 4 16 4 14.5 1.5 14.5" />
                                        <polygon points="8.5 14.5 6 14.5 6 16 10 16 10 12 8.5 12 8.5 14.5" />
                                        <polygon points="1.5 1.5 4 1.5 4 0 0 0 0 4 1.5 4 1.5 1.5" />
                                        <polygon points="8.5 1.5 8.5 4 10 4 10 0 6 0 6 1.5 8.5 1.5" />
                                    </svg>
                                )
                            }
                        />
                    ) : null}
                    <Button
                        className={classNames([styles.button, styles.closeButton])}
                        onClick={onClose}
                        focusable={focusable}
                        label={intl.formatMessage({
                            defaultMessage: 'Close',
                            description: 'Button label',
                        })}
                        iconPosition={showShare ? 'left' : 'right'}
                        icon={
                            <svg
                                className={styles.icon}
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="16"
                                viewBox="0 0 10 16"
                                fill="currentColor"
                            >
                                <polygon points="9.95 4.11 8.89 3.05 5 6.94 1.11 3.05 0.05 4.11 3.94 8 0.05 11.89 1.11 12.95 5 9.06 8.89 12.95 9.95 11.89 6.06 8 9.95 4.11" />
                            </svg>
                        }
                    />
                </div>
            </div> */}
            <div className={styles.content} ref={containerRef}>
                <Scroll className={styles.scroll}>
                    {showShare ? (
                        <>
                            <div className={styles.shareHeader}>
                                <MicromagPreview
                                    className={styles.sharePreview}
                                    screen={
                                        showShare && shareCurrentScreen
                                            ? currentScreen
                                            : coverScreen
                                    }
                                    title={title}
                                    url={finalShareUrl}
                                    description={description}
                                />
                                {currentScreenIndex !== 0 ? (
                                    <div className={styles.shareMode}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="currentScreen"
                                                value="currentScreen"
                                                onChange={onShareModeChange}
                                                checked={shareCurrentScreen}
                                            />
                                            <FormattedMessage
                                                defaultMessage="Start from the current screen"
                                                description="Share mode"
                                            />
                                        </label>
                                    </div>
                                ) : null}
                            </div>
                            <ShareOptions
                                className={styles.shareOptions}
                                itemClassName={styles.shareOptionsItem}
                                buttonClassName={styles.shareOptionsButton}
                                title={title}
                                url={finalShareUrl}
                                focusable={focusable}
                                onShare={onShare}
                                shareCurrentScreen={shareCurrentScreen}
                            />
                        </>
                    ) : null}

                    <nav className={styles.nav}>
                        <ul className={styles.items}>
                            {finalItems.map((item, index) => {
                                const { screenId, current = false } = item || {};

                                return (
                                    <li
                                        className={classNames([
                                            styles.item,
                                            {
                                                [styles.active]: current,
                                            },
                                        ])}
                                        key={`item-${screenId}`}
                                        style={{
                                            width: `${100 / thumbsPerLine}%`,
                                        }}
                                    >
                                        {item === null ? (
                                            'loading'
                                        ) : (
                                            <MenuScreen
                                                className={styles.screenPreview}
                                                item={item}
                                                index={index}
                                                screenSize={screenSize}
                                                onClick={onClickItem}
                                                focusable={focusable}
                                            />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </Scroll>
            </div>
        </div>
    );
};

ViewerMenuPreview.propTypes = propTypes;
ViewerMenuPreview.defaultProps = defaultProps;

export default ViewerMenuPreview;
