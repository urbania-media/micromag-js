/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useAuth } from '../../contexts/AuthContext';
import MainGuestMenu from '../menus/MainGuest';
import MainMenu from '../menus/Main';
import StoriesMenu from '../menus/Stories';
import OrganisationMenu from '../menus/Organisation';

import styles from '../../styles/partials/navbar.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const Navbar = ({ className }) => {
    const { loggedIn, user } = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);
    const url = useUrlGenerator();
    const onClickMenu = useCallback(() => setMenuVisible(!menuVisible), [
        setMenuVisible,
        menuVisible,
    ]);
    return (
        <nav
            className={classNames([
                'navbar',
                'navbar-expand-lg',
                'navbar-light',
                'bg-light',
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Link className="navbar-brand" to={url('home')}>
                Micromag
            </Link>
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
            <div
                className={classNames([
                    'navbar-collapse',
                    'collapse',
                    {
                        show: menuVisible,
                    },
                ])}
            >
                {loggedIn ? (
                    <>
                        {user.organisations.length > 1 ? (
                            <OrganisationMenu
                                items={user.organisations}
                                className="navbar-nav"
                                itemClassName="nav-item"
                                linkClassName="nav-link"
                            />
                        ) : null}
                        <StoriesMenu
                            className="navbar-nav"
                            itemClassName="nav-item"
                            linkClassName="nav-link"
                        />
                        <MainMenu
                            className="navbar-nav ml-auto"
                            itemClassName="nav-item"
                            linkClassName="nav-link"
                        />
                    </>
                ) : (
                    <MainGuestMenu
                        className="navbar-nav ml-auto"
                        itemClassName="nav-item"
                        linkClassName="nav-link"
                    />
                )}
            </div>
        </nav>
    );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
