import classNames from 'classnames';
import { ReactNode, useCallback, useState } from 'react';

import Button from '../buttons/Button';
import Link from '../partials/Link';

import styles from '../../styles/menus/navbar.module.css';

interface NavbarProps {
    brand?: ReactNode | null;
    brandLink?: string | null;
    breadcrumbs?: ReactNode | null;
    theme?: 'light' | 'dark' | 'primary' | null;
    size?: 'sm' | 'md' | 'lg';
    compact?: boolean;
    noWrap?: boolean;
    withoutCollapse?: boolean;
    withoutCollapseToggle?: boolean;
    children?: ReactNode | null;
    className?: string | null;
    brandClassName?: string | null;
    breadCrumbsClassName?: string | null;
    collapseClassName?: string | null;
}

function Navbar({
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
}: NavbarProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const onClickMenu = useCallback(
        () => setMenuVisible(!menuVisible),
        [setMenuVisible, menuVisible],
    );
    return (
        <nav
            className={classNames([
                'navbar',
                theme !== null ? `bg-${theme}` : 'bg-body',
                theme !== null ? `text-${theme === 'dark' ? 'light' : 'dark'}` : null,
                !withoutCollapse ? `navbar-expand-${size}` : null,
                {
                    'navbar-expand': withoutCollapse,
                    'py-2': compact,
                    'px-2': compact,
                    'flex-nowrap': noWrap,
                },
                className,
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
                            brandClassName,
                            {
                                'py-0': compact,
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
                            brandClassName,
                            {
                                'py-0': compact,
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
                            breadCrumbsClassName,
                            {
                                'py-0': compact,
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
                            collapseClassName,
                            {
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
}

export default Navbar;
