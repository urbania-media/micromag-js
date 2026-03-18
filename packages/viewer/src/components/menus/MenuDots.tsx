/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';

import type { MenuItem } from '@micromag/core';
import { CloseIcon } from '@micromag/core/components';

import MenuDot from './MenuDot';

import styles from '../../styles/menus/menu-dots.module.css';

const emptyArray: never[] = [];

interface ViewerMenuDotsProps {
    direction?: 'horizontal' | 'vertical';
    items?: MenuItem[];
    onClickDot?: (...args: unknown[]) => void;
    onClickScreensMenu?: (...args: unknown[]) => void;
    colors?: { primary?: string; secondary?: string };
    buttons?: React.ReactNode;
    closeable?: boolean;
    withItemClick?: boolean;
    withoutScreensMenu?: boolean;
    onClose?: (...args: unknown[]) => void;
    className?: string;
}

function ViewerMenuDots({
    direction = 'horizontal',
    items = emptyArray,
    onClickDot = null,
    onClickScreensMenu = null,
    colors = null,
    closeable = false,
    buttons = null,
    withItemClick = false,
    withoutScreensMenu = false,
    onClose = null,
    className = null,
    ...props
}: ViewerMenuDotsProps) {
    const { primary = 'rgba(255, 255, 255, 1)' } = colors || {};
    const intl = useIntl();
    const currentIndex = items.findIndex(({ current = false }) => current);
    const { style } = props || {};

    return (
        <nav
            className={classNames([
                styles.container,
                {
                    [styles.withButtons]: closeable || buttons !== null,
                    [styles.vertical]: direction === 'vertical',
                },
                className,
            ])}
            aria-label={intl.formatMessage(
                {
                    defaultMessage: 'You are on screen {current} of {total}.',
                    description: 'Nav ARIA label',
                },
                {
                    current: currentIndex + 1,
                    total: items.length,
                },
            )}
            style={style}
        >
            {items.map((item, index) => {
                const { current = false, count = 1, subIndex = 0 } = item || {};
                return (
                    <MenuDot
                        current={current}
                        active={index <= currentIndex}
                        colors={colors}
                        count={count}
                        subIndex={subIndex}
                        className={styles.dot}
                        onClick={() => {
                            if ((withItemClick || withoutScreensMenu) && onClickDot !== null) {
                                onClickDot(item);
                            } else if (!withItemClick && onClickScreensMenu !== null) {
                                onClickScreensMenu();
                            }
                        }}
                        vertical={direction === 'vertical'}
                    />
                );
            })}
            {closeable ? (
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onClose}
                    title={intl.formatMessage({
                        defaultMessage: 'Close',
                        description: 'Button label',
                    })}
                    aria-label={intl.formatMessage({
                        defaultMessage: 'Close',
                        description: 'Button label',
                    })}
                    style={{ color: primary }}
                >
                    <CloseIcon />
                </button>
            ) : null}
            {buttons !== null ? <div className={styles.buttons}>{buttons}</div> : null}
        </nav>
    );
}

export default ViewerMenuDots;
