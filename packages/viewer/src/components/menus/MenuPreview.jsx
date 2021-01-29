/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label */
// stylelint-disable stylelint-family-no-missing-generic-family-keyword
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromText } from '@micromag/core/utils';
import { ScreenPreview, Button } from '@micromag/core/components';
import Scroll from '@micromag/element-scroll';

import ShareButton from '../partials/ShareButton';

import styles from '../../styles/menus/menu-preview.module.scss';

const propTypes = {
    branding: MicromagPropTypes.branding,
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
    branding: null,
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
    branding,
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
    const screenSizeRatio = `${(screenHeight / screenWidth / thumbsPerLine) * 100}%`;

    const hasSize = screenWidth > 0 && screenHeight > 0;

    const [thumbSize, setThumbSize] = useState(null);
    const firstScreenContainerRef = useRef(null);

    useEffect(() => {
        if (firstScreenContainerRef.current !== null) {
            const { offsetWidth, offsetHeight } = firstScreenContainerRef.current;
            setThumbSize({ width: offsetWidth, height: offsetHeight });
        }
    }, [screenWidth, screenHeight]);

    // Branding
    const {
        primaryColor: brandPrimaryColor = null,
        backgroundColor: brandBackgroundColor = null,
        textStyle: brandTextStyle = null,
        logo: brandLogo = null,
    } = branding || {};
    const { url: brandLogoUrl } = brandLogo || {};
    const titleStyle = brandTextStyle !== null ? getStyleFromText(brandTextStyle) : null;

    return hasSize ? (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{
                width: screenWidth,
                color: brandPrimaryColor,
                backgroundColor: brandBackgroundColor,
            }}
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
                <ShareButton
                    className={classNames([styles.button, styles.shareButton])}
                    onShare={onShare}
                    url={shareUrl}
                    title={title}
                >
                    <FontAwesomeIcon className={styles.icon} icon={faShare} />
                </ShareButton>
                <Button className={styles.button} onClick={onClose}>
                    <FontAwesomeIcon className={styles.icon} icon={faTimes} />
                </Button>
            </div>
            <div className={styles.content}>
                <Scroll className={styles.scroll}>
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
                                                <div className={styles.activeScreenBorder} />
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
