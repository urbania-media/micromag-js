/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

import { useRoutes } from '../contexts/RoutesContext';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

const propTypes = {

};

const defaultProps = {
};

const Routes = () => {
    const routes = useRoutes();
    return (
        <Switch>
            <Route
                path={routes.home}
                exact
                component={HomePage}
            />
            <Route
                path={routes.login}
                exact
                component={LoginPage}
            />
        </Switch>
    );
};

Routes.propTypes = propTypes;
Routes.defaultProps = defaultProps;

export default Routes;
