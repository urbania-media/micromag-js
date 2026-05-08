import classNames from 'classnames';
import React from 'react';

import type { MenuItem, ScreenSize, ViewerTheme } from '@micromag/core';
import { useDimensionObserver } from '@micromag/core/hooks';
import { getStyleFromText } from '@micromag/core/utils';
import Scroll from '@micromag/element-scroll';

import MicromagBranding from '../partials/MicromagBranding';
import MenuScreen from './MenuScreen';

import styles from '../../styles/menus/menu-preview.module.css';

const emptyArray: never[] = [];

interface ViewerMenuPreviewProps {
    viewerTheme?: ViewerTheme;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    screenSize?: ScreenSize;
    title?: string;
    menuWidth?: number;
    items?: MenuItem[];
    focusable?: boolean;
    onClickScreen?: (...args: unknown[]) => void;
    maxThumbsWidth?: number;
    paddingTop?: number;
    scrollDisabled?: boolean;
    withMicromagBranding?: boolean;
    className?: string;
}

function ViewerMenuPreview({
    viewerTheme = null,
    header = null,
    footer = null,
    screenSize = null,
    title = null,
    menuWidth = null,
    items = emptyArray,
    focusable = true,
    onClickScreen = null,
    maxThumbsWidth = 140,
    paddingTop = null,
    scrollDisabled = false,
    withMicromagBranding = false,
    // toggleFullscreen,
    // fullscreenActive,
    // fullscreenEnabled,
    className = null,
}: ViewerMenuPreviewProps) {
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
    // eslint-disable-next-line no-unused-vars
    const { textAlign = null, ...otherTitleStyles } = titleStyles || {};
    const finalTitleStyles = titleStyles !== null ? getStyleFromText(otherTitleStyles) : null;
    // const { url: brandLogoUrl = null } = brandLogo || {};

    const hasTitle = title !== null;

    // @todo optimize all of this the proper way
    // const finalItems = useMemo(
    //     () => (!focusable ? items.map((s, i) => (i > 6 ? { screenId: s.screenId } : s)) : items),
    //     [items, focusable],
    // );

    const menuPaddingTop = paddingTop + 10;

    return (
        <div
            className={classNames([styles.container, className])}
            style={{ ...brandImageStyle, width: menuWidth }}
            aria-hidden={focusable ? null : 'true'}
        >
            <div className={styles.content} ref={containerRef}>
                <Scroll
                    className={styles.scroll}
                    scrolleeClassName={styles.scrollee}
                    disabled={scrollDisabled}
                >
                    {hasTitle && header === null ? (
                        <div
                            className={styles.titleContainer}
                            style={{ paddingTop: menuPaddingTop }}
                        >
                            <h1 className={styles.title} style={{ ...finalTitleStyles }}>
                                {title}
                            </h1>
                        </div>
                    ) : (
                        <div
                            className={styles.headerContainer}
                            style={{ paddingTop: menuPaddingTop }}
                        >
                            {header}
                        </div>
                    )}
                    <nav className={styles.nav} style={!hasTitle ? { paddingTop } : null}>
                        <ul className={styles.items}>
                            {items.map((item, index) => {
                                const { screenId } = item || {};
                                const itemStyles = {
                                    width: `${100 / thumbsPerLine}%`,
                                };
                                const { width: screenWidth, height: screenHeight } =
                                    screenSize || {};

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
                                                        [styles.isLoading]: false,
                                                    },
                                                ])}
                                                style={{
                                                    paddingBottom: `${
                                                        (screenHeight / screenWidth) * 100
                                                    }%`,
                                                }}
                                            >
                                                <MenuScreen
                                                    className={styles.screen}
                                                    item={item}
                                                    index={index}
                                                    screenSize={screenSize}
                                                    onClick={onClickScreen}
                                                    focusable={focusable}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    {footer}
                    {withMicromagBranding ? (
                        <>
                            <div className={styles.micromagBrandingSeparator} />
                            <MicromagBranding className={styles.micromagBrandingContainer} />
                        </>
                    ) : null}
                </Scroll>
            </div>
        </div>
    );
}

export default ViewerMenuPreview;
