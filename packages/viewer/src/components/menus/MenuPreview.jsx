/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label, jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading, arrow-body-style */
// stylelint-disable stylelint-family-no-missing-generic-family-keyword
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useDimensionObserver } from '@micromag/core/hooks';
import { getStyleFromColor } from '@micromag/core/utils';
import Scroll from '@micromag/element-scroll';

import MenuScreen from './MenuScreen';

import styles from '../../styles/menus/menu-preview.module.scss';

const propTypes = {
    viewerTheme: MicromagPropTypes.viewerTheme,
    screenSize: MicromagPropTypes.screenSize,
    menuWidth: PropTypes.number,
    items: MicromagPropTypes.menuItems,
    focusable: PropTypes.bool,
    onClickScreen: PropTypes.func,
    maxThumbsWidth: PropTypes.number,
    // shouldLoad: PropTypes.bool, // @todo still needed? to re-implement?
    // toggleFullscreen: PropTypes.func,
    // fullscreenActive: PropTypes.bool,
    // fullscreenEnabled: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    viewerTheme: null,
    screenSize: null,
    menuWidth: null,
    items: [],
    focusable: true,
    // shouldLoad: true,
    onClickScreen: null,
    maxThumbsWidth: 140,
    // toggleFullscreen: null,
    // fullscreenActive: false,
    // fullscreenEnabled: false,
    className: null,
};

const ViewerMenuPreview = ({
    viewerTheme,
    screenSize,
    menuWidth,
    items,
    focusable,
    onClickScreen,
    maxThumbsWidth,
    // toggleFullscreen,
    // fullscreenActive,
    // fullscreenEnabled,
    className,
}) => {
    const { ref: containerRef, width: contentWidth = 0 } = useDimensionObserver();
    const thumbsPerLine = Math.max(Math.floor(contentWidth / maxThumbsWidth), 3);

    const { background = null, logo: brandLogo = null } = viewerTheme || {};
    const { color: brandBackgroundColor = null, image = null } = background || {};
    const { url: brandImageUrl = null } = image || {};
    const backgroundColorStyle = getStyleFromColor(brandBackgroundColor, 'backgroundColor');
    const brandImageStyle =
        brandImageUrl !== null
            ? {
                  backgroundImage: `url(${brandImageUrl})`,
              }
            : null;
    // @todo reimplement the brand logo
    // const { url: brandLogoUrl = null } = brandLogo || {};

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
        >
            <div className={styles.content} ref={containerRef}>
                <Scroll className={styles.scroll}>
                    <nav className={styles.nav}>
                        <ul className={styles.items}>
                            {finalItems.map((item, index) => {
                                const { screenId } = item || {};
                                const itemStyles = {
                                    width: `${100 / thumbsPerLine}%`,
                                };

                                return (
                                    <li
                                        key={`item-${screenId}`}
                                        className={styles.item}
                                        style={itemStyles}
                                    >
                                        {/* @todo gotta figure out some loading thing, inside of MenuScreen tho */}
                                        {item === null ? (
                                            'loading'
                                        ) : (
                                            <MenuScreen
                                                className={styles.screenPreview}
                                                item={item}
                                                index={index}
                                                screenSize={screenSize}
                                                onClick={onClickScreen}
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
