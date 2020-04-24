/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router';
import { useRoutes, useUrlGenerator } from '@micromag/core/contexts';

import { useAuth } from '../../contexts/AuthContext';
import AccountPage from '../pages/account/Account';

const propTypes = {};

const defaultProps = {};

const AccountRoutes = () => {
    const { loggedIn } = useAuth();
    const routes = useRoutes();
    const url = useUrlGenerator();
    return (
        <Switch>
            {!loggedIn ? <Redirect from={routes.account} to={url('home')} /> : null}
            <Route path={routes.account} exact component={AccountPage} />
        </Switch>
    );
};

AccountRoutes.propTypes = propTypes;
AccountRoutes.defaultProps = defaultProps;

export default AccountRoutes;
