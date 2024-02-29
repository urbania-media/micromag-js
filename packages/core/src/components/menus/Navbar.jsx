/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import styles from '../../styles/menus/navbar.module.scss';
import Button from '../buttons/Button';
import Link from '../partials/Link';

const propTypes = {
    brand: PropTypes.node,
    brandLink: PropTypes.string,
    breadcrumbs: PropTypes.node,
    theme: PropTypes.oneOf(['light', 'dark', 'primary', null]),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    compact: PropTypes.bool,
    noWrap: PropTypes.bool,
    withoutCollapse: PropTypes.bool,
    withoutCollapseToggle: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    brandClassName: PropTypes.string,
    breadCrumbsClassName: PropTypes.string,
    collapseClassName: PropTypes.string,
};

const defaultProps = {
    brand: null,
    brandLink: null,
    breadcrumbs: null,
    theme: null,
    size: 'md',
    compact: false,
    noWrap: false,
    withoutCollapse: false,
    withoutCollapseToggle: false,
    children: null,
    className: null,
    brandClassName: null,
    breadCrumbsClassName: null,
    collapseClassName: null,
};

const Navbar = ({
    brand,
    brandLink,
    breadcrumbs,
    theme,
    size,
    compact,
    noWrap,
    withoutCollapse,
    withoutCollapseToggle,
    children,
    className,
    brandClassName,
    breadCrumbsClassName,
    collapseClassName,
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

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
