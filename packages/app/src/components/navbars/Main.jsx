/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useAuth } from '../../contexts/AuthContext';
import MainGuestMenu from '../menus/MainGuest';
import AccountMenu from '../menus/Account';
import StoriesMenu from '../menus/Stories';
import OrganisationMenu from '../menus/Organisation';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const MainNavbar = ({ className }) => {
    const { loggedIn } = useAuth();
    const url = useUrlGenerator();
    return (
        <Navbar brand="Micromag" brandLink={url('home')}  theme="primary" className={className}>
            {loggedIn ? (
                <>
                    <OrganisationMenu
                        className="navbar-nav"
                        itemClassName="nav-item"
                        linkClassName="nav-link"
                    />
                    <StoriesMenu
                        className="navbar-nav"
                        itemClassName="nav-item"
                        linkClassName="nav-link"
                    />
                    <AccountMenu
                        className="navbar-nav ml-auto"
                        itemClassName="nav-item"
                        linkClassName="nav-link"
                        dropdownAlign="right"
                    />
                </>
            ) : (
                <MainGuestMenu
                    className="navbar-nav ml-auto"
                    itemClassName="nav-item"
                    linkClassName="nav-link"
                />
            )}
        </Navbar>
    );
};

MainNavbar.propTypes = propTypes;
MainNavbar.defaultProps = defaultProps;

export default MainNavbar;
