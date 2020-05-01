/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import * as MicromagPropTypes from '../../PropTypes';
import Label from '../partials/Label';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    theme: PropTypes.oneOf([null, 'light']),
    withoutBar: PropTypes.bool,
    noWrap: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    theme: null,
    withoutBar: false,
    noWrap: false,
    className: null,
};

const Breadcrumb = ({ items, theme, withoutBar, noWrap, className }) => (
    <nav className={className}>
        <ol
            className={classNames([
                'breadcrumb',
                'mb-0',
                {
                    'p-0': withoutBar,
                    'bg-transparent': withoutBar,
                    'rounded-0': withoutBar,
                    'flex-nowrap': noWrap,
                },
            ])}
        >
            {items.map(({ url, label, active = false, onClick = null }, index) => (
                <li
                    className={classNames([
                        'breadcrumb-item',
                        {
                            active,
                            [`text-${theme}`]: active && theme !== null,
                        },
                    ])}
                    key={`item-${index}`}
                >
                    {active ? (
                        <Label>{label}</Label>
                    ) : (
                        <Link
                            to={url}
                            onClick={onClick}
                            className={classNames({
                                [`text-${theme}`]: theme !== null,
                            })}
                        >
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
