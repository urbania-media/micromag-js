/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../../styles/menus/viewer.module.scss';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    onClickItem: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    onClickItem: null,
    className: null,
};

const ViewerMenu = ({ items, onClickItem, className }) => (
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
                            [styles.active]: item.active,
                        },
                    ])}
                    key={`item-${index}`}
                >
                    <button
                        type="button"
                        className={styles.button}
                        onClick={e => (onClickItem !== null ? onClickItem(e, item, index) : null)}
                    >
                        <span className={styles.dot} />
                    </button>
                </li>
            ))}
        </ul>
    </nav>
);

ViewerMenu.propTypes = propTypes;
ViewerMenu.defaultProps = defaultProps;

export default ViewerMenu;
