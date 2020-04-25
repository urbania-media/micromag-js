import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { useRoutes } from '@micromag/core/contexts';

import { useLoggedIn } from '../contexts/AuthContext';
import HomePage from './pages/Home';
import HomeGuestPage from './pages/HomeGuest';
import AuthRoutes from './routes/Auth';
import AccountRoutes from './routes/Account';
import RegisterRoutes from './routes/Register';
import OrganisationRoutes from './routes/Organisation';
import StoriesRoutes from './routes/Stories';

const propTypes = {};

const defaultProps = {};

const Routes = () => {
    const routes = useRoutes();
    const loggedIn = useLoggedIn();
    return (
        <Switch>
            <Route path={routes.home} exact component={loggedIn ? HomePage : HomeGuestPage} />
            <RegisterRoutes path={routes.register} />
            <AccountRoutes path={routes.account} />
            <StoriesRoutes path={routes.stories} />
            <OrganisationRoutes path={routes.organisation} />
            <Route path="*">
                <AuthRoutes />
            </Route>
        </Switch>
    );
};

Routes.propTypes = propTypes;
Routes.defaultProps = defaultProps;

export default Routes;
