/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label */
// stylelint-disable stylelint-family-no-missing-generic-family-keyword
import { faCompress, faExpand, faShare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, ScreenPreview } from '@micromag/core/components';
import { getStyleFromColor, getStyleFromText } from '@micromag/core/utils';
import Scroll from '@micromag/element-scroll';
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from '../../styles/menus/menu-preview.module.scss';
import ShareButton from '../partials/ShareButton';

const propTypes = {
    viewerTheme: MicromagPropTypes.viewerTheme,
    screenWidth: PropTypes.number,
    title: PropTypes.string,
    shareUrl: PropTypes.string,
    items: MicromagPropTypes.menuItems,
    current: PropTypes.number,
    focusable: PropTypes.bool,
    onClickItem: PropTypes.func,
    onClose: PropTypes.func,
    onShare: PropTypes.func,
    thumbsPerLine: PropTypes.number,
    toggleFullscreen: PropTypes.func,
    fullscreenActive: PropTypes.bool,
    fullscreenEnabled: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    viewerTheme: null,
    screenWidth: null,
    title: null,
    shareUrl: null,
    items: [],
    current: 0,
    focusable: true,
    onClickItem: null,
    onClose: null,
    onShare: null,
    thumbsPerLine: 4,
    toggleFullscreen: null,
    fullscreenActive: false,
    fullscreenEnabled: false,
    className: null,
};

function ViewerMenuPreview({
    viewerTheme,
    screenWidth,
    title,
    shareUrl,
    items,
    current,
    focusable,
    onClickItem,
    onClose,
    onShare,
    thumbsPerLine,
    toggleFullscreen,
    fullscreenActive,
    fullscreenEnabled,
    className,
}) {
    const intl = useIntl();
    const screenSizeRatio = `${(3 / 2 / thumbsPerLine) * 100}%`;
    const screenRatioHeight = (screenWidth * 3) / 2;

    const hasSize = screenWidth > 0;
    const hasItems = items !== null && items.length > 0;

    const [thumbSize, setThumbSize] = useState(null);
    const firstScreenContainerRef = useRef(null);

    useEffect(() => {
        if (hasItems && hasSize && firstScreenContainerRef.current !== null) {
            const { offsetWidth, offsetHeight } = firstScreenContainerRef.current;
            setThumbSize({ width: offsetWidth, height: offsetHeight });
        }
    }, [screenWidth, hasItems, hasSize]);

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

    return hasSize ? (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ ...backgroundColorStyle, ...brandImageStyle, width: screenWidth }}
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
            <div className={styles.content}>
                <Scroll
                    className={styles.scroll}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                >
                    <nav className={styles.nav}>
                        <ul className={styles.items}>
                            {items.map((item, index) => {
                                const screenIndexLabel = intl.formatMessage(
                                    {
                                        defaultMessage: 'Screen {index}',
                                        description: 'Button label',
                                    },
                                    { index: index + 1 },
                                );
                                const isCurrentScreenLabel =
                                    current === index
                                        ? ` ${intl.formatMessage({
                                              defaultMessage: '(current screen)',
                                              description: 'Button label',
                                          })}`
                                        : '';
                                const screenAriaLabel = screenIndexLabel + isCurrentScreenLabel;

                                return (
                                    <li
                                        className={classNames([
                                            styles.item,
                                            {
                                                [styles.active]: current === index,
                                            },
                                        ])}
                                        key={`item-${index}`}
                                        style={{
                                            paddingBottom: screenSizeRatio,
                                            width: `${100 / thumbsPerLine}%`,
                                        }}
                                    >
                                        <div className={styles.itemContent}>
                                            <div
                                                className={styles.screenContainer}
                                                ref={index === 0 ? firstScreenContainerRef : null}
                                            >
                                                <div
                                                    className={styles.screenContent}
                                                    style={
                                                        thumbSize !== null
                                                            ? {
                                                                  width: screenWidth,
                                                                  height: screenRatioHeight,
                                                                  transform: `scale(${
                                                                      thumbSize.width / screenWidth
                                                                  }`,
                                                              }
                                                            : null
                                                    }
                                                    aria-hidden="true"
                                                >
                                                    <ScreenPreview
                                                        width={screenWidth}
                                                        height={screenRatioHeight}
                                                        screen={item}
                                                        focusable={false}
                                                    />
                                                </div>
                                                {current === index ? (
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
                                                onClickItem(index);
                                            }}
                                            aria-label={screenAriaLabel}
                                            onKeyUp={(e) => {
                                                if (e.key === 'Enter') {
                                                    onClickItem(index);
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
    ) : null;
}

ViewerMenuPreview.propTypes = propTypes;
ViewerMenuPreview.defaultProps = defaultProps;

export default ViewerMenuPreview;
