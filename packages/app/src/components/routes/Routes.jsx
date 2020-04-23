import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

import { useRoutes } from '../../contexts/RoutesContext';
import HomePage from '../pages/Home';
import AuthRoutes from './Auth';
import RegisterRoutes from './Register';
import OrganisationRoutes from './Organisation';

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
                <OrganisationRoutes />
            </Route>
        </Switch>
    );
};

Routes.propTypes = propTypes;
Routes.defaultProps = defaultProps;

export default Routes;
