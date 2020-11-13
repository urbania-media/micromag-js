/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useOrganisations } from '@micromag/data';
import { Navbar, Breadcrumb } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useAuth as useAuthContext } from '../../contexts/AuthContext';
import { useOrganisation as useOrganisationContext } from '../../contexts/OrganisationContext';

import MainGuestMenu from '../menus/MainGuest';
import MainMenu from '../menus/Main';

import logo from '../../assets/logo-beta.svg';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const MainNavbar = ({ className }) => {
    const { loggedIn } = useAuthContext();
    const url = useUrlGenerator();
    const organisation = useOrganisationContext() || null;
    const { organisations } = useOrganisations();

    return (
        <Navbar
            brand={<img src={logo} height="30" alt="Micromag" />}
            brandLink={organisations !== null ? url('organisations') : url('home')}
            breadcrumbs={
                organisation !== null ? (
                    <Breadcrumb
                        items={[
                            {
                                id: 'current',
                                url: url('home'),
                                label: organisation.name,
                            },
                        ]}
                    />
                ) : null
            }
            theme="primary"
            className={className}
        >
            {loggedIn ? (
                <MainMenu
                    className="navbar-nav ml-auto"
                    itemClassName="nav-item"
                    linkClassName="nav-link"
                    dropdownAlign="right"
                />
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
