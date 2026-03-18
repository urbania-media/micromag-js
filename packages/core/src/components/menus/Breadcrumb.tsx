import classNames from 'classnames';
import React from 'react';
import { Link } from 'wouter';

import Button from '../buttons/Button';
import Label from '../partials/Label';

import styles from '../../styles/menus/breadcrumb.module.css';

const emptyArray: never[] = [];

interface BreadcrumbProps {
    items?: MenuItem[];
    theme?: BootstrapTheme | null;
    separator?: null | 'arrow';
    withoutBar?: boolean;
    noWrap?: boolean;
    className?: string | null;
}

function Breadcrumb({
    items = emptyArray,
    theme = null,
    separator = null,
    withoutBar = false,
    noWrap = false,
    className = null,
}: BreadcrumbProps) {
    return (
        <nav className={className}>
            <ol
                className={classNames([
                    styles.container,
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
                                [styles.arrow]: separator === 'arrow',
                                [`text-${theme}`]: active && theme !== null,
                            },
                        ])}
                        key={`item-${index}`}
                    >
                        {active ? <Label>{label}</Label> : null}
                        {!active && url ? (
                            <Link
                                href={url}
                                onClick={onClick}
                                className={classNames([
                                    'font-weight-bold',
                                    'text-decoration-none',
                                    {
                                        [`text-${theme}`]: theme !== null,
                                    },
                                ])}
                            >
                                <Label>{label}</Label>
                            </Link>
                        ) : null}
                        {!active && onClick ? (
                            <Button
                                onClick={onClick}
                                className={classNames([
                                    'font-weight-bold',
                                    'text-decoration-none',
                                    {
                                        [`text-${theme}`]: theme !== null,
                                    },
                                ])}
                            >
                                <Label>{label}</Label>
                            </Button>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
