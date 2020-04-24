import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { useRoutes } from '@micromag/core/contexts';

import HomePage from './pages/Home';
import AuthRoutes from './routes/Auth';
import AccountRoutes from './routes/Account';
import RegisterRoutes from './routes/Register';
import OrganisationRoutes from './routes/Organisation';

const propTypes = {};

const defaultProps = {};

const Routes = () => {
    const routes = useRoutes();
    return (
        <Switch>
            <Route path={routes.home} exact component={HomePage} />
            <Route path="*">
                <RegisterRoutes />
                <AuthRoutes />
                <AccountRoutes />
                <OrganisationRoutes />
            </Route>
        </Switch>
    );
};

Routes.propTypes = propTypes;
Routes.defaultProps = defaultProps;

export default Routes;
