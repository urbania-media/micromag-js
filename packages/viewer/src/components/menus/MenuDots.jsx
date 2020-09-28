/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../../styles/menus/menu-dots.module.scss';

const propTypes = {
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    items: MicromagPropTypes.menuItems,
    current: PropTypes.number,
    onClickItem: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    direction: 'horizontal',
    items: [],
    current: 0,
    onClickItem: null,
    className: null,
};

const ViewerMenuDots = ({ direction, items, current, onClickItem, className }) => (
    <nav
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.vertical]: direction === 'vertical',
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
                        onClick={() => (onClickItem !== null ? onClickItem(index) : null)}
                    >
                        <span className={styles.dot} />
                    </button>
                </li>
            ))}
        </ul>
    </nav>
);

ViewerMenuDots.propTypes = propTypes;
ViewerMenuDots.defaultProps = defaultProps;

export default ViewerMenuDots;
