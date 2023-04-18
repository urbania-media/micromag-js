/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label, jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading, arrow-body-style */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useDimensionObserver } from '@micromag/core/hooks';
import { getStyleFromText } from '@micromag/core/utils';
import Badge from '@micromag/element-badge';
import Scroll from '@micromag/element-scroll';

import MenuScreen from './MenuScreen';

import styles from '../../styles/menus/menu-preview.module.scss';

const propTypes = {
    viewerTheme: MicromagPropTypes.viewerTheme,
    screenSize: MicromagPropTypes.screenSize,
    title: PropTypes.string,
    menuWidth: PropTypes.number,
    items: MicromagPropTypes.menuItems,
    focusable: PropTypes.bool,
    onClickScreen: PropTypes.func,
    maxThumbsWidth: PropTypes.number,
    paddingTop: PropTypes.number,
    scrollDisabled: PropTypes.bool,
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
    title: null,
    menuWidth: null,
    items: [],
    focusable: true,
    // shouldLoad: true,
    onClickScreen: null,
    maxThumbsWidth: 140,
    paddingTop: null,
    scrollDisabled: false,
    // toggleFullscreen: null,
    // fullscreenActive: false,
    // fullscreenEnabled: false,
    className: null,
};

const ViewerMenuPreview = ({
    viewerTheme,
    screenSize,
    title,
    menuWidth,
    items,
    focusable,
    onClickScreen,
    maxThumbsWidth,
    paddingTop,
    scrollDisabled,
    // toggleFullscreen,
    // fullscreenActive,
    // fullscreenEnabled,
    className,
}) => {
    const { ref: containerRef, width: contentWidth = 0 } = useDimensionObserver();
    const thumbsPerLine = Math.max(Math.floor(contentWidth / maxThumbsWidth), 3); // @note cool, should be in recipes

    // @todo reimplement the brand logo
    // const { background = null, logo: brandLogo = null } = viewerTheme || {};
    const { background = null, textStyles = null } = viewerTheme || {};
    const { image = null } = background || {};
    const { url: brandImageUrl = null } = image || {};
    const brandImageStyle =
        brandImageUrl !== null
            ? {
                  backgroundImage: `url(${brandImageUrl})`,
              }
            : null;

    const { title: titleStyles = null } = textStyles || {};
    const finalTitleStyles = titleStyles !== null ? getStyleFromText(titleStyles) : null;

    // const { url: brandLogoUrl = null } = brandLogo || {};
    const [screensMounted, setScreensMounted] = useState([]);

    const withTitle = title !== null;

    // @todo optimize all of this the proper way
    // const finalItems = useMemo(
    //     () => (!focusable ? items.map((s, i) => (i > 6 ? { screenId: s.screenId } : s)) : items),
    //     [items, focusable],
    // );

    useEffect(() => {
        if (items.length === screensMounted.length) {
            return () => {};
        }

        const timeout = setTimeout(() => {
            setScreensMounted([...screensMounted, true]);
        }, 40);

        return () => {
            clearTimeout(timeout);
        };
    }, [items, screensMounted, setScreensMounted]);

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
                <Scroll className={styles.scroll} disabled={scrollDisabled}>
                    {title !== null ? (
                        <div
                            className={styles.titleContainer}
                            style={{ paddingTop: paddingTop + 10 }}
                        >
                            <Badge label={{ body: 'dfg' }} className={styles.badge} />
                            <h1 className={styles.title} style={{ ...finalTitleStyles }}>
                                {title}
                            </h1>
                        </div>
                    ) : null}
                    <nav
                        className={styles.nav}
                        // style={{ paddingTop }}
                        style={!withTitle ? { paddingTop } : null}
                    >
                        <ul className={styles.items}>
                            {items.map((item, index) => {
                                const { screenId } = item || {};
                                const itemStyles = {
                                    width: `${100 / thumbsPerLine}%`,
                                };
                                const { width: screenWidth, height: screenHeight } =
                                    screenSize || {};
                                const screenMounted = screensMounted[index] || false;

                                return (
                                    <li
                                        key={`item-${screenId}`}
                                        className={styles.item}
                                        style={itemStyles}
                                    >
                                        <div className={styles.inner}>
                                            <div
                                                className={classNames([
                                                    styles.frame,
                                                    {
                                                        [styles.isLoading]: !screenMounted,
                                                    },
                                                ])}
                                                style={{
                                                    paddingBottom: `${
                                                        (screenHeight / screenWidth) * 100
                                                    }%`,
                                                }}
                                            >
                                                {screenMounted ? (
                                                    <MenuScreen
                                                        className={styles.screen}
                                                        item={item}
                                                        index={index}
                                                        screenSize={screenSize}
                                                        onClick={onClickScreen}
                                                        focusable={focusable}
                                                    />
                                                ) : null}
                                            </div>
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
