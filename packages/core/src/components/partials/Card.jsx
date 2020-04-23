/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../styles/partials/card.module.scss';

const propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    footer: PropTypes.node,
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    footerClassName: PropTypes.string,
};

const defaultProps = {
    children: null,
    header: null,
    footer: null,
    className: null,
    headerClassName: null,
    bodyClassName: null,
    footerClassName: null,
};

const Card = ({ children, header, footer, className, headerClassName, bodyClassName, footerClassName }) => (
    <div
        className={classNames([
            'card',
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        {header !== null ? (
            <div
                className={classNames([
                    'card-header',
                    styles.header,
                    {
                        [headerClassName]: headerClassName !== null,
                    },
                ])}
            >
                {header}
            </div>
        ) : null}
        <div
            className={classNames([
                'card-body',
                styles.body,
                {
                    [bodyClassName]: bodyClassName !== null,
                },
            ])}
        >
            {children}
        </div>
        {footer !== null ? (
            <div
                className={classNames([
                    'card-footer',
                    styles.footer,
                    {
                        [footerClassName]: footerClassName !== null,
                    },
                ])}
            >
                {footer}
            </div>
        ) : null}
    </div>
);

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
