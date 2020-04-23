/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

import { useRoutes } from '../../contexts/RoutesContext';
import AccountPage from '../pages/account/Account';

const propTypes = {};

const defaultProps = {};

const AccountRoutes = () => {
    const routes = useRoutes();
    return (
        <Switch>
            <Route path={routes.account} exact component={AccountPage} />
        </Switch>
    );
};

AccountRoutes.propTypes = propTypes;
AccountRoutes.defaultProps = defaultProps;

export default AccountRoutes;
