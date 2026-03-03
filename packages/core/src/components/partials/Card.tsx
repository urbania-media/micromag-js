/* eslint-disable no-nested-ternary */

/* eslint-disable react/jsx-props-no-spreading, react/no-array-index-key */
import classNames from 'classnames';
import React from 'react';

import Label from './Label';
import Link from './Link';

interface CardProps {
    href?: string;
    header?: React.ReactNode;
    image?: React.ReactNode;
    imageAlt?: string;
    imageOverlay?: boolean;
    beforeBody?: React.ReactNode;
    title?: Label;
    subtitle?: Label;
    children?: React.ReactNode;
    afterBody?: React.ReactNode;
    links?: { label?: Label; href?: string }[];
    linksInSameBody?: boolean;
    footer?: React.ReactNode;
    theme?: null | 'dark' | 'primary' | 'light';
    className?: string;
    imageClassName?: string;
    headerClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    bodyClassName?: string;
    footerClassName?: string;
    onClick?: (...args: unknown[]) => void;
    onClickBody?: (...args: unknown[]) => void;
    onClickFooter?: (...args: unknown[]) => void;
}

function Card({
    href = null,
    header = null,
    image = null,
    imageAlt = null,
    imageOverlay = false,
    beforeBody = null,
    title = null,
    subtitle = null,
    children = null,
    afterBody = null,
    links = null,
    linksInSameBody = false,
    footer = null,
    theme = null,
    className = null,
    imageClassName = null,
    headerClassName = null,
    titleClassName = null,
    subtitleClassName = null,
    bodyClassName = null,
    footerClassName = null,
    onClick = null,
    onClickBody = null,
    onClickFooter = null,
}: CardProps) {
    const linksElements = (links || []).map(
        ({ label, className: linkClassName = null, ...linkProps }, index) => (
            <Link
                key={`link-${label}-${index}`}
                className={classNames([
                    'card-link',
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

    const bodyInner =
        title !== null ||
        subtitle !== null ||
        children !== null ||
        (links !== null && linksInSameBody) ? (
            <>
                {title !== null ? (
                    <h5
                        className={classNames([
                            'card-title',
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
                            {
                                [subtitleClassName]: subtitleClassName !== null,
                            },
                        ])}
                    >
                        <Label>{subtitle}</Label>
                    </h6>
                ) : null}
                {children}
                {links !== null && linksInSameBody ? (
                    <div className="d-flex">{linksElements}</div>
                ) : null}
            </>
        ) : null;

    const cardInner = (
        <>
            {header !== null ? (
                <div
                    className={classNames([
                        'card-header',
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
                        {
                            [imageClassName]: imageClassName !== null,
                        },
                    ])}
                />
            ) : (
                image
            )}
            {beforeBody}
            {bodyInner !== null ? (
                onClickBody !== null ? (
                    <button
                        type="button"
                        className={classNames({
                            'card-body': !imageOverlay,
                            'card-img-overlay': imageOverlay,
                            [bodyClassName]: bodyClassName !== null,
                        })}
                        onClick={onClickBody}
                    >
                        {bodyInner}
                    </button>
                ) : (
                    <div
                        className={classNames({
                            'card-body': !imageOverlay,
                            'card-img-overlay': imageOverlay,
                            [bodyClassName]: bodyClassName !== null,
                        })}
                    >
                        {bodyInner}
                    </div>
                )
            ) : null}
            {afterBody}
            {links !== null && linksElements !== null && !linksInSameBody ? (
                <div className="card-body">{linksElements}</div>
            ) : null}
            {footer !== null ? (
                onClickFooter !== null ? (
                    <button
                        type="button"
                        className={classNames([
                            'card-footer',
                            {
                                [footerClassName]: footerClassName !== null,
                            },
                        ])}
                        onClick={onClickFooter}
                    >
                        <Label>{footer}</Label>
                    </button>
                ) : (
                    <div
                        className={classNames([
                            'card-footer',
                            {
                                [footerClassName]: footerClassName !== null,
                            },
                        ])}
                    >
                        <Label>{footer}</Label>
                    </div>
                )
            ) : null}
        </>
    );
    const cardClassName = classNames([
        'card',
        {
            [`bg-${theme}`]: !imageOverlay && theme !== 'dark',
            'bg-dark': imageOverlay || theme === 'dark',
            'text-dark': theme === 'light',
            'text-light': imageOverlay || theme === 'dark' || theme === 'primary',
            [className]: className !== null,
        },
    ]);

    if (href !== null) {
        return (
            <Link href={href} className={cardClassName}>
                {cardInner}
            </Link>
        );
    }

    if (onClick !== null) {
        return (
            <button
                type="button"
                className={classNames(['p-0', 'text-start', cardClassName])}
                onClick={onClick}
            >
                {cardInner}
            </button>
        );
    }

    return <div className={cardClassName}>{cardInner}</div>;
}

export default Card;
