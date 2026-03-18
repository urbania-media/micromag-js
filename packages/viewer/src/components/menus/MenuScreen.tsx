/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label, jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading, arrow-body-style */
// stylelint-disable stylelint-family-no-missing-generic-family-keyword
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';

import type { MenuItem, ScreenSize } from '@micromag/core';
import { ScreenPreview } from '@micromag/core/components';
import { useIsVisible } from '@micromag/core/hooks';

import StackIcon from '../icons/Stack';

import styles from '../../styles/menus/menu-screen.module.css';

interface ViewerMenuScreenProps {
    className?: string;
    item?: MenuItem;
    index?: number;
    onClick?: (...args: unknown[]) => void;
    screenSize?: ScreenSize;
    alwaysRender?: boolean;
    focusable?: boolean;
}

function ViewerMenuScreen({
    className = null,
    item = null,
    index = 0,
    onClick = null,
    screenSize = null,
    alwaysRender = false,
    focusable = true,
}: ViewerMenuScreenProps) {
    const intl = useIntl();
    const { current = false, screen, count = 1 } = item || {};
    const { width: screenWidth, height: screenHeight } = screenSize || {};
    const { ref: refVisible, visible = false } = useIsVisible({
        rootMargin: '200px',
        persist: false,
    });
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
        <div
            className={classNames([
                styles.container,
                className,
                {
                    [styles.isCurrent]: current,
                },
            ])}
            style={{
                paddingBottom: `${(screenHeight / screenWidth) * 100}%`,
            }}
            ref={refVisible}
        >
            <button
                type="button"
                className={styles.button}
                onClick={(e = null) => {
                    if (e !== null) {
                        e.stopPropagation();
                    }
                    if (onClick !== null) {
                        onClick(item);
                    }
                }}
                aria-label={screenAriaLabel}
                tabIndex={focusable ? '0' : '-1'}
            />
            <div className={styles.inner}>
                {count > 1 ? (
                    <div className={styles.subScreenBadge}>
                        <span className={styles.subScreenCount}>{count}</span>
                        <StackIcon className={styles.subScreenIcon} />
                    </div>
                ) : null}
                {screenWidth > 0 && screenHeight > 0 && (visible || alwaysRender) ? (
                    <ScreenPreview
                        className={styles.screen}
                        screenWidth={screenWidth}
                        screenHeight={screenHeight}
                        screen={screen}
                        focusable={focusable}
                        active={focusable}
                        withSize
                    />
                ) : null}
            </div>
        </div>
    );
}

export default ViewerMenuScreen;
