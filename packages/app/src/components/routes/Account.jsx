/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import { useRoutes } from '../../contexts/RoutesContext';
import AccountPage from '../pages/account/Account';

const propTypes = {};

const defaultProps = {};

const AccountRoutes = () => {
    const routes = useRoutes();
    return (
        <Route path={[routes.account]} exact>
            <Switch>
                <Route path={routes.account} exact component={AccountPage} />
            </Switch>
        </Route>
    );
};

AccountRoutes.propTypes = propTypes;
AccountRoutes.defaultProps = defaultProps;

export default AccountRoutes;
