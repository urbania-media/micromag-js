/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import * as MicromagPropTypes from '../../PropTypes';
import Label from '../partials/Label';

import styles from '../../styles/menus/breadcrumb.module.scss';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    className: null,
};

const Breadcrumb = ({ items, className }) => (
    <nav
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <ol className={classNames(['breadcrumb', styles.items])}>
            {items.map(({ url, label, active = false, onClick = null }, index) => (
                <li
                    className={classNames([
                        'breadcrumb-item',
                        styles.item,
                        {
                            active,
                            [styles.active]: active,
                        },
                    ])}
                    key={`item-${index}`}
                >
                    {active ? (
                        <Label>label</Label>
                    ) : (
                        <Link to={url} className={styles.link} onClick={onClick}>
                            <Label>{label}</Label>
                        </Link>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default Breadcrumb;
