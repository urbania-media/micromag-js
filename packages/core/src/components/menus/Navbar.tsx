/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useState, useCallback } from 'react';
import styles from '../../styles/menus/navbar.module.css';
import Button from '../buttons/Button';
import Link from '../partials/Link';

interface NavbarProps {
    brand?: React.ReactNode;
    brandLink?: string;
    breadcrumbs?: React.ReactNode;
    theme?: 'light' | 'dark' | 'primary' | null;
    size?: 'sm' | 'md' | 'lg';
    compact?: boolean;
    noWrap?: boolean;
    withoutCollapse?: boolean;
    withoutCollapseToggle?: boolean;
    children?: React.ReactNode;
    className?: string;
    brandClassName?: string;
    breadCrumbsClassName?: string;
    collapseClassName?: string;
}

const Navbar = ({
    brand = null,
    brandLink = null,
    breadcrumbs = null,
    theme = null,
    size = 'md',
    compact = false,
    noWrap = false,
    withoutCollapse = false,
    withoutCollapseToggle = false,
    children = null,
    className = null,
    brandClassName = null,
    breadCrumbsClassName = null,
    collapseClassName = null,
}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const onClickMenu = useCallback(
        () => setMenuVisible(!menuVisible),
        [setMenuVisible, menuVisible],
    );
    return (
        <nav
            className={classNames([
                'navbar',
                {
                    [`bg-${theme}`]: theme !== null,
                    [`navbar-${theme === 'light' ? 'light' : 'dark'}`]: theme !== null,
                    [`text-${theme === 'light' ? 'dark' : 'light'}`]: theme !== null,
                    [`navbar-expand-${size}`]: !withoutCollapse,
                    'navbar-expand': withoutCollapse,
                    'py-2': compact,
                    'px-2': compact,
                    'flex-nowrap': noWrap,
                    [className]: className !== null,
                },
            ])}
        >
            <div
                className={classNames([
                    'container-fluid',
                    {
                        'px-0': compact,
                    },
                ])}
            >
                {brand !== null && brandLink !== null ? (
                    <Link
                        className={classNames([
                            'navbar-brand',
                            {
                                'py-0': compact,
                                [brandClassName]: brandClassName !== null,
                            },
                        ])}
                        href={brandLink}
                    >
                        {brand}
                    </Link>
                ) : null}
                {brand !== null && brandLink === null ? (
                    <span
                        className={classNames([
                            'navbar-brand',
                            {
                                'py-0': compact,
                                [brandClassName]: brandClassName !== null,
                            },
                        ])}
                    >
                        {brand}
                    </span>
                ) : null}
                {breadcrumbs !== null ? (
                    <span
                        className={classNames([
                            'navbar-breadcrumbs',
                            {
                                'py-0': compact,
                                [breadCrumbsClassName]: breadCrumbsClassName !== null,
                            },
                        ])}
                    >
                        {breadcrumbs}
                    </span>
                ) : null}
                {!withoutCollapse && !withoutCollapseToggle ? (
                    <Button
                        className="navbar-toggler"
                        onClick={onClickMenu}
                        withoutTheme
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </Button>
                ) : null}
                {!withoutCollapse ? (
                    <div
                        className={classNames([
                            'navbar-collapse',
                            'collapse',
                            styles.collapse,
                            {
                                [collapseClassName]: collapseClassName !== null,
                                show: menuVisible,
                            },
                        ])}
                    >
                        {children}
                    </div>
                ) : (
                    children
                )}
            </div>
        </nav>
    );
};

export default Navbar;
