/* eslint-disable react/jsx-props-no-spreading, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as MicromagPropTypes from '../../PropTypes';
import Label from './Label';
import Link from './Link';

import styles from '../../styles/partials/card.module.scss';

const propTypes = {
    header: PropTypes.node,
    image: PropTypes.node,
    imageAlt: PropTypes.string,
    beforeBody: PropTypes.node,
    title: MicromagPropTypes.label,
    subtitle: MicromagPropTypes.label,
    children: PropTypes.node,
    afterBody: PropTypes.node,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            label: MicromagPropTypes.label,
            href: PropTypes.string,
        }),
    ),
    linksInSameBody: PropTypes.bool,
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
    header: null,
    image: null,
    imageAlt: null,
    beforeBody: null,
    title: null,
    subtitle: null,
    children: null,
    afterBody: null,
    links: null,
    linksInSameBody: false,
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
    header,
    image,
    imageAlt,
    beforeBody,
    title,
    subtitle,
    children,
    afterBody,
    links,
    linksInSameBody,
    footer,
    className,
    imageClassName,
    headerClassName,
    titleClassName,
    subtitleClassName,
    bodyClassName,
    footerClassName,
}) => {
    const linksElements = (links || []).map(
        ({ label, className: linkClassName = null, ...linkProps }, index) => (
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
        ),
    );
    return (
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
                    <Label>{header}</Label>
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
            {beforeBody}
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
                {links !== null && linksInSameBody ? <div className="d-flex">{linksElements}</div> : null}
            </div>
            {afterBody}
            {links !== null && !linksInSameBody ? (
                <div className="card-body">{linksElements}</div>
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
                    <Label>{footer}</Label>
                </div>
            ) : null}
        </div>
    );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
