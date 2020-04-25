/* eslint-disable react/jsx-props-no-spreading, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as MicromagPropTypes from '../../PropTypes';
import Label from './Label';
import Link from './Link';

import styles from '../../styles/partials/card.module.scss';

const propTypes = {
    image: PropTypes.node,
    imageAlt: PropTypes.string,
    title: MicromagPropTypes.label,
    subtitle: MicromagPropTypes.label,
    children: PropTypes.node,
    header: PropTypes.node,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            label: MicromagPropTypes.label,
            href: PropTypes.string,
        }),
    ),
    footer: PropTypes.node,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    titleClassName: PropTypes.string,
    subtitleClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    footerClassName: PropTypes.string,
};

const defaultProps = {
    image: null,
    imageAlt: null,
    title: null,
    subtitle: null,
    children: null,
    header: null,
    links: null,
    footer: null,
    className: null,
    imageClassName: null,
    headerClassName: null,
    titleClassName: null,
    subtitleClassName: null,
    bodyClassName: null,
    footerClassName: null,
};

const Card = ({
    image,
    imageAlt,
    title,
    subtitle,
    children,
    header,
    links,
    footer,
    className,
    imageClassName,
    headerClassName,
    titleClassName,
    subtitleClassName,
    bodyClassName,
    footerClassName,
}) => (
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
        {typeof image === 'string' ? (
            <img
                src={image}
                alt={imageAlt}
                className={classNames([
                    'card-img-top',
                    styles.image,
                    {
                        [imageClassName]: imageClassName !== null,
                    },
                ])}
            />
        ) : (
            image
        )}
        <div
            className={classNames([
                'card-body',
                styles.body,
                {
                    [bodyClassName]: bodyClassName !== null,
                },
            ])}
        >
            {title !== null ? (
                <h5
                    className={classNames([
                        'card-title',
                        styles.title,
                        {
                            [titleClassName]: titleClassName !== null,
                        },
                    ])}
                >
                    <Label>{title}</Label>
                </h5>
            ) : null}
            {subtitle !== null ? (
                <h6
                    className={classNames([
                        'card-subtitle',
                        styles.subtitle,
                        {
                            [subtitleClassName]: subtitleClassName !== null,
                        },
                    ])}
                >
                    <Label>{subtitle}</Label>
                </h6>
            ) : null}
            {children}
        </div>
        {links !== null ? (
            <div className="card-body">
                {links.map(({ label, className: linkClassName = null, ...linkProps }, index) => (
                    <Link
                        key={`link-${label}-${index}`}
                        className={classNames([
                            'card-link',
                            styles.link,
                            {
                                [linkClassName]: linkClassName !== null,
                            },
                        ])}
                        {...linkProps}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        ) : null}
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
