/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label, react/jsx-props-no-spreading, arrow-body-style */
// stylelint-disable stylelint-family-no-missing-generic-family-keyword
import { faCompress, faExpand, faShare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, ScreenPreview } from '@micromag/core/components';
import { useResizeObserver } from '@micromag/core/hooks';
import { getStyleFromColor, getStyleFromText } from '@micromag/core/utils';
import Scroll from '@micromag/element-scroll';
import styles from '../../styles/menus/menu-preview.module.scss';
import ShareButton from '../partials/ShareButton';

const propTypes = {
    viewerTheme: MicromagPropTypes.viewerTheme,
    screenSize: MicromagPropTypes.screenSize,
    menuWidth: PropTypes.number,
    title: PropTypes.string,
    shareUrl: PropTypes.string,
    items: MicromagPropTypes.menuItems,
    focusable: PropTypes.bool,
    onClickItem: PropTypes.func,
    onClose: PropTypes.func,
    onShare: PropTypes.func,
    maxThumbsWidth: PropTypes.number,
    toggleFullscreen: PropTypes.func,
    fullscreenActive: PropTypes.bool,
    fullscreenEnabled: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    viewerTheme: null,
    screenSize: null,
    menuWidth: null,
    title: null,
    shareUrl: null,
    items: [],
    focusable: true,
    onClickItem: null,
    onClose: null,
    onShare: null,
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
    shareUrl,
    items,
    focusable,
    onClickItem,
    onClose,
    onShare,
    maxThumbsWidth,
    toggleFullscreen,
    fullscreenActive,
    fullscreenEnabled,
    className,
}) => {
    const intl = useIntl();
    const { width: screenWidth, height: screenHeight } = screenSize || {};
    const {
        ref: firstScreenContainerRef,
        entry: { contentRect: firstScreenContentRect },
    } = useResizeObserver();
    const {
        ref: containerRef,
        entry: { contentRect: containerRect },
    } = useResizeObserver();
    const { width: thumbWidth = 0 } = firstScreenContentRect || {};
    const { width: contentWidth = 0 } = containerRect || {};
    const thumbsPerLine = Math.max(Math.floor(contentWidth / maxThumbsWidth), 3);

    // Viewer theme
    const {
        colors = null,
        background = null,
        textStyles = null,
        logo: brandLogo = null,
    } = viewerTheme || {};
    const { title: brandTextStyle = null } = textStyles || {};
    const { primary: brandPrimaryColor = null, secondary: brandSecondaryColor = null } =
        colors || {};
    const { color: brandBackgroundColor = null, image = null } = background || {};
    const { url: brandImageUrl = null } = image || {};

    const borderPrimaryColorStyle = getStyleFromColor(brandPrimaryColor, 'borderColor');
    const colorSecondaryColorStyle = getStyleFromColor(brandSecondaryColor, 'color');
    const backgroundColorStyle = getStyleFromColor(brandBackgroundColor, 'backgroundColor');
    const { url: brandLogoUrl = null } = brandLogo || {};
    const brandImageStyle =
        brandImageUrl !== null
            ? {
                  backgroundImage: `url(${brandImageUrl})`,
              }
            : null;

    const titleStyle = brandTextStyle !== null ? getStyleFromText(brandTextStyle) : null;

    const [scrolledBottom, setScrolledBottom] = useState(false);
    const dragBind = useDrag(
        ({ direction: [, dy], last, tap }) => {
            if (!tap && last && scrolledBottom && dy < 0 && onClose !== null) {
                onClose();
            }
        },
        { filterTaps: true, eventOptions: { capture: true } },
    );

    const onScrolledBottom = useCallback(() => {
        setScrolledBottom(true);
    }, [setScrolledBottom]);

    const onScrolledNotBottom = useCallback(() => {
        setScrolledBottom(false);
    }, [setScrolledBottom]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ ...backgroundColorStyle, ...brandImageStyle, width: menuWidth }}
            aria-hidden={focusable ? null : 'true'}
            {...dragBind()}
        >
            <div className={styles.header}>
                {brandLogoUrl !== null ? (
                    <div
                        className={styles.organisation}
                        style={{ backgroundImage: `url(${brandLogoUrl})` }}
                    />
                ) : null}
                <div className={styles.title} style={titleStyle}>
                    {title}
                </div>
                <div className={styles.buttons} style={colorSecondaryColorStyle}>
                    <ShareButton
                        className={styles.shareButton}
                        buttonClassName={styles.button}
                        onShare={onShare}
                        url={shareUrl}
                        title={title}
                        focusable={focusable}
                    >
                        <FontAwesomeIcon className={styles.icon} icon={faShare} />
                    </ShareButton>
                    {fullscreenEnabled ? (
                        <Button
                            className={styles.button}
                            onClick={toggleFullscreen}
                            title={intl.formatMessage({
                                defaultMessage: 'Fullscreen',
                                description: 'Button label',
                            })}
                            aria-label={intl.formatMessage({
                                defaultMessage: 'Fullscreen',
                                description: 'Button label',
                            })}
                            focusable={focusable}
                        >
                            <FontAwesomeIcon
                                className={styles.icon}
                                icon={fullscreenActive ? faCompress : faExpand}
                            />
                        </Button>
                    ) : null}
                    <Button
                        className={styles.button}
                        onClick={onClose}
                        title={intl.formatMessage({
                            defaultMessage: 'Close',
                            description: 'Button label',
                        })}
                        aria-label={intl.formatMessage({
                            defaultMessage: 'Close',
                            description: 'Button label',
                        })}
                        focusable={focusable}
                    >
                        <FontAwesomeIcon className={styles.icon} icon={faTimes} />
                    </Button>
                </div>
            </div>
            <div className={styles.content} ref={containerRef}>
                <Scroll
                    className={styles.scroll}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                >
                    <nav className={styles.nav}>
                        <ul className={styles.items}>
                            {items.map((item, index) => {
                                const { current = false, screen, count = 1 } = item;

                                const screenAriaLabel = `${intl.formatMessage(
                                    {
                                        defaultMessage: 'Screen {index}',
                                        description: 'Button label',
                                    },
                                    { index: index + 1 },
                                )}${
                                    current
                                        ? ` ${intl.formatMessage({
                                              defaultMessage: '(current screen)',
                                              description: 'Button label',
                                          })}`
                                        : ''
                                }`;
                                return (
                                    <li
                                        className={classNames([
                                            styles.item,
                                            {
                                                [styles.active]: current,
                                            },
                                        ])}
                                        key={`item-${index}`}
                                        style={{
                                            width: `${100 / thumbsPerLine}%`,
                                        }}
                                    >
                                        <div className={styles.itemContent}>
                                            <div
                                                className={styles.screenContainer}
                                                ref={index === 0 ? firstScreenContainerRef : null}
                                            >
                                                {screenWidth > 0 && screenHeight > 0 ? (
                                                    <ScreenPreview
                                                        screenWidth={screenWidth}
                                                        screenHeight={screenHeight}
                                                        width={thumbWidth}
                                                        screen={screen}
                                                        focusable={false}
                                                        active={focusable}
                                                        withSize
                                                        // withStack
                                                        // stackCount={count}
                                                    />
                                                ) : null}
                                                {current ? (
                                                    <div
                                                        className={styles.activeScreenBorder}
                                                        style={borderPrimaryColorStyle}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className={styles.screenButton}
                                            onClick={() => {
                                                if (onClickItem !== null) {
                                                    onClickItem(item);
                                                }
                                            }}
                                            aria-label={screenAriaLabel}
                                            onKeyUp={(e) => {
                                                if (e.key === 'Enter' && onClickItem !== null) {
                                                    onClickItem(item);
                                                }
                                            }}
                                            tabIndex={focusable ? '0' : '-1'}
                                        />
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
