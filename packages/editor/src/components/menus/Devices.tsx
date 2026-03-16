/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { MenuItem } from '@micromag/core';
import { Tabs } from '@micromag/core/components';

import DeviceButton from '../buttons/Device';

import styles from '../../styles/menus/devices.module.css';

const emptyArray: never[] = [];

interface DevicesMenuProps {
    items?: MenuItem[];
    className?: string;
    onClickItem?: (...args: unknown[]) => void;
}

function DevicesMenu({ items = emptyArray, className = null, onClickItem = null }: DevicesMenuProps) {
    return (
        <Tabs
            items={items}
            theme="outline-secondary"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            renderItemButton={(item, index, props) => {
                const { id, ...itemProps } = item;
                return (
                    <DeviceButton
                        device={id}
                        {...props}
                        {...itemProps}
                        className={styles.button}
                        onClick={(e) => (onClickItem !== null ? onClickItem(e, item, index) : null)}
                    />
                );
            }}
        />
    );
}

export default DevicesMenu;
