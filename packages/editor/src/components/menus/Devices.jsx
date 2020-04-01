/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Tabs } from '@micromag/core/components';

import DeviceButton from '../buttons/Device';

import styles from '../../styles/menus/devices.module.scss';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    className: PropTypes.string,
    onClickItem: PropTypes.func,
};

const defaultProps = {
    items: [],
    className: null,
    onClickItem: null,
};

const DevicesMenu = ({ items, className, onClickItem }) => (
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
                    onClick={e => (onClickItem !== null ? onClickItem(e, item, index) : null)}
                />
            );
        }}
    />
);

DevicesMenu.propTypes = propTypes;
DevicesMenu.defaultProps = defaultProps;

export default DevicesMenu;
