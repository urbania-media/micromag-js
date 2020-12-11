/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useOrganisations } from '@micromag/data';
import { Navbar } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useAuth as useAuthContext } from '../../contexts/AuthContext';

import MainGuestMenu from '../menus/MainGuest';
import MainMenu from '../menus/Main';
import Breadcrumbs from '../partials/Breadcrumbs';

import logo from '../../assets/logo-beta.svg';

const propTypes = {
    nav: MicromagPropTypes.breadcrumbs,
    className: PropTypes.string,
};

const defaultProps = {
    nav: null,
    className: null,
};

const MainNavbar = ({ nav, className }) => {
    const { loggedIn } = useAuthContext();
    const url = useUrlGenerator();
    const { organisations } = useOrganisations();

    return (
        <Navbar
            brand={
                <img
                    className={classNames([
                        { 'd-none': nav !== null, 'd-none d-lg-inline-block': nav !== null },
                    ])}
                    src={logo}
                    height="30"
                    alt="Micromag"
                />
            }
            brandLink={organisations !== null ? url('organisations') : url('home')}
            breadcrumbs={nav !== null ? <Breadcrumbs items={nav} /> : null}
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
