/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPreview } from '@micromag/core/components';

import styles from '../../styles/menus/menu-preview.module.scss';


const propTypes = {
    items: MicromagPropTypes.menuItems,
    current: PropTypes.number,
    onClickItem: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    current: 0,
    onClickItem: null,
    className: null,
};

const ViewerMenuPreview = ({ items, current, onClickItem, className }) => (
    <nav
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
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
                >
                    <button
                        type="button"
                        className={styles.button}
                        onClick={e => (onClickItem !== null ? onClickItem(e, item, index) : null)}
                    >
                        <ScreenPreview screen={item} />
                    </button>
                </li>
            ))}
        </ul>
    </nav>
);

ViewerMenuPreview.propTypes = propTypes;
ViewerMenuPreview.defaultProps = defaultProps;

export default ViewerMenuPreview;