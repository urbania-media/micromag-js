/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label, jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading, arrow-body-style */
// stylelint-disable stylelint-family-no-missing-generic-family-keyword
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { MenuItem, ViewerTheme } from '@micromag/core';
import Scroll from '@micromag/element-scroll';
import ShareOptions from '@micromag/element-share-options';

import MicromagPreview from '../partials/MicromagPreview';

import styles from '../../styles/menus/menu-share.module.css';

interface ViewerMenuShareProps {
    viewerTheme?: ViewerTheme;
    menuWidth?: number;
    title?: string;
    description?: string;
    items?: MenuItem[];
    shareOptions?: string[];
    focusable?: boolean;
    paddingTop?: number;
    currentScreenIndex?: number;
    shareUrl?: string;
    onShare?: (...args: unknown[]) => void;
    className?: string;
}

function ViewerMenuShare({
    viewerTheme = null,
    menuWidth = null,
    title = null,
    description = null,
    items = [],
    shareOptions = null,
    focusable = true,
    paddingTop = null,
    currentScreenIndex = 0,
    shareUrl = null,
    onShare = null,
    className = null,
}) {
    // Viewer theme
    const { background = null } = viewerTheme || {};
    const { image = null } = background || {};
    const { url: brandImageUrl = null } = image || {};
    const brandImageStyle =
        brandImageUrl !== null
            ? {
                  backgroundImage: `url(${brandImageUrl})`,
              }
            : null;

    const coverScreen = useMemo(() => {
        const { screen = null } = items[0] || {};
        return screen;
    }, [items]);

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

    const finalShareUrl = useMemo(
        () =>
            shareCurrentScreen && currentScreenIndex !== 0
                ? `${shareUrl}/${currentScreenIndex + 1}`
                : shareUrl,
        [shareUrl, shareCurrentScreen, currentScreenIndex],
    );

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
            <div className={styles.content}>
                <Scroll className={styles.scroll}>
                    <div className={styles.inner} style={{ paddingTop }}>
                        <div className={styles.header}>
                            <MicromagPreview
                                className={styles.preview}
                                screen={shareCurrentScreen ? currentScreen : coverScreen}
                                title={title}
                                url={finalShareUrl}
                                description={description}
                            />

                            {currentScreenIndex !== 0 ? (
                                <div className={styles.mode}>
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
                            className={styles.options}
                            itemClassName={styles.optionItem}
                            buttonClassName={styles.optionButton}
                            title={title}
                            options={shareOptions}
                            url={finalShareUrl}
                            focusable={focusable}
                            onShare={onShare}
                            theme={viewerTheme}
                            shareCurrentScreen={shareCurrentScreen}
                        />
                    </div>
                </Scroll>
            </div>
        </div>
    );
}

export default ViewerMenuShare;
