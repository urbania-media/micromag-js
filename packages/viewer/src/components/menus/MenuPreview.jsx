/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label, jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading, arrow-body-style */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useViewerContext } from '@micromag/core/contexts';
import { useDimensionObserver } from '@micromag/core/hooks';
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
    paddingTop: PropTypes.number,
    // @todo to reimplement:
    // shouldLoad: PropTypes.bool,
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
    paddingTop: null,
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
    paddingTop,
    // toggleFullscreen,
    // fullscreenActive,
    // fullscreenEnabled,
    className,
}) => {
    const { ref: containerRef, width: contentWidth = 0 } = useDimensionObserver();
    const thumbsPerLine = Math.max(Math.floor(contentWidth / maxThumbsWidth), 3); // @note cool, should be in recipes

    // @todo reimplement the brand logo
    // const { background = null, logo: brandLogo = null } = viewerTheme || {};
    const { background = null } = viewerTheme || {};
    const { image = null } = background || {};
    const { url: brandImageUrl = null } = image || {};
    const brandImageStyle =
        brandImageUrl !== null
            ? {
                  backgroundImage: `url(${brandImageUrl})`,
              }
            : null;
    // const { url: brandLogoUrl = null } = brandLogo || {};

    // @todo optimize all of this the proper way
    // const finalItems = useMemo(
    //     () => (!focusable ? items.map((s, i) => (i > 6 ? { screenId: s.screenId } : s)) : items),
    //     [items, focusable],
    // );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ ...brandImageStyle, width: menuWidth }}
            aria-hidden={focusable ? null : 'true'}
        >
            <div className={styles.content} ref={containerRef}>
                <Scroll className={styles.scroll}>
                    <nav
                        className={styles.nav}
                        style={{paddingTop}}
                    >
                        <ul className={styles.items}>
                            {items.map((item, index) => {
                                const { screenId, screen = null } = item || {};
                                const itemStyles = {
                                    width: `${100 / thumbsPerLine}%`,
                                };

                                return (
                                    <li
                                        key={`item-${screenId}`}
                                        className={styles.item}
                                        style={itemStyles}
                                    >
                                        <div className={styles.screen}>
                                            {screen === null ? (
                                                <svg
                                                    className={styles.loading}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="10"
                                                    height="16"
                                                    viewBox="0 0 10 16"
                                                    style={{ animationDelay: `${index * -50}ms` }}
                                                >
                                                    <rect width="10" height="16" />
                                                </svg>
                                            ) : (
                                                <MenuScreen
                                                    item={item}
                                                    index={index}
                                                    screenSize={screenSize}
                                                    onClick={onClickScreen}
                                                    focusable={focusable}
                                                />
                                            )}
                                        </div>
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
