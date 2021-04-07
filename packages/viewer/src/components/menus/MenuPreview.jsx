/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label */
// stylelint-disable stylelint-family-no-missing-generic-family-keyword
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDrag } from 'react-use-gesture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faTimes, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor, getStyleFromText } from '@micromag/core/utils';
import { useFullscreen } from '@micromag/core/hooks';
import { ScreenPreview, Button } from '@micromag/core/components';
import Scroll from '@micromag/element-scroll';

import ShareButton from '../partials/ShareButton';

import styles from '../../styles/menus/menu-preview.module.scss';

const propTypes = {
    theme: MicromagPropTypes.branding,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,
    title: PropTypes.string,
    shareUrl: PropTypes.string,
    items: MicromagPropTypes.menuItems,
    current: PropTypes.number,
    onClickItem: PropTypes.func,
    onClose: PropTypes.func,
    onShare: PropTypes.func,
    thumbsPerLine: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    theme: null,
    screenWidth: null,
    screenHeight: null,
    title: null,
    shareUrl: null,
    items: [],
    current: 0,
    onClickItem: null,
    onClose: null,
    onShare: null,
    thumbsPerLine: 4,
    className: null,
};

const ViewerMenuPreview = ({
    theme,
    screenWidth,
    screenHeight,
    title,
    shareUrl,
    items,
    current,
    onClickItem,
    onClose,
    onShare,
    thumbsPerLine,
    className,
}) => {
    const {
        toggle: toggleFullscreen,
        active: fullscreenActive,
        enabled: fullscreenEnabled,
    } = useFullscreen();

    const screenSizeRatio = `${(screenHeight / screenWidth / thumbsPerLine) * 100}%`;

    const hasSize = screenWidth > 0 && screenHeight > 0;
    const hasItems = items !== null && items.length > 0;

    const [thumbSize, setThumbSize] = useState(null);
    const firstScreenContainerRef = useRef(null);

    useEffect(() => {
        if (hasItems && hasSize && firstScreenContainerRef.current !== null) {
            const { offsetWidth, offsetHeight } = firstScreenContainerRef.current;
            setThumbSize({ width: offsetWidth, height: offsetHeight });
        }
    }, [screenWidth, screenHeight, hasItems, hasSize]);

    // Branding
    const {
        primaryColor: brandPrimaryColor = null,
        secondaryColor: brandSecondaryColor = null,
        backgroundColor: brandBackgroundColor = null,
        textStyle: brandTextStyle = null,
        logo: brandLogo = null,
    } = theme || {};

    const borderPrimaryColorStyle = getStyleFromColor(brandPrimaryColor, 'borderColor');
    const colorSecondaryColorStyle = getStyleFromColor(brandSecondaryColor, 'color');
    const backgroundColorStyle = getStyleFromColor(brandBackgroundColor, 'backgroundColor');

    const { url: brandLogoUrl = null } = brandLogo || {};

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
            style={{ ...backgroundColorStyle, width: screenWidth }}
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
                    >
                        <FontAwesomeIcon className={styles.icon} icon={faShare} />
                    </ShareButton>
                    {fullscreenEnabled ? (
                        <Button className={styles.button} onClick={toggleFullscreen}>
                            <FontAwesomeIcon className={styles.icon} icon={fullscreenActive ? faCompress: faExpand} />
                        </Button>
                    ) : null}
                    <Button className={styles.button} onClick={onClose}>
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
                            {items.map((item, index) => (
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
                                                              height: screenHeight,
                                                              transform: `scale(${
                                                                  thumbSize.width / screenWidth
                                                              }, ${
                                                                  thumbSize.height / screenHeight
                                                              })`,
                                                          }
                                                        : null
                                                }
                                            >
                                                <ScreenPreview
                                                    width={screenWidth}
                                                    height={screenHeight}
                                                    screen={item}
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
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Scroll>
            </div>
        </div>
    ) : null;
};

ViewerMenuPreview.propTypes = propTypes;
ViewerMenuPreview.defaultProps = defaultProps;

export default ViewerMenuPreview;
