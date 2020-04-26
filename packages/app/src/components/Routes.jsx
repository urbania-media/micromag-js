import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router';
import { stringify as stringifyQuery } from 'query-string';
import { useRoutes, useUrlGenerator } from '@micromag/core/contexts';

import { useLoggedIn } from '../contexts/AuthContext';
import { useOrganisation } from '../contexts/OrganisationContext';

import HomePage from './pages/Home';
import HomeGuestPage from './pages/HomeGuest';

import RegisterPage from './pages/register/Register';

import AccountPage from './pages/account/Account';

import LoginPage from './pages/auth/Login';
import ForgotPasswordPage from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPassword';

import OrganisationSettingsPage from './pages/organisation/Settings';
import OrganisationTeamPage from './pages/organisation/Team';
import OrganisationBillingPage from './pages/organisation/Billing';
import OrganisationSwitchPage from './pages/organisation/Switch';

import StoriesPage from './pages/stories/Stories';
import CreatePage from './pages/stories/Create';
import EditorPage from './pages/stories/Editor';

const propTypes = {};

const defaultProps = {};

const Routes = () => {
    const routes = useRoutes();
    const url = useUrlGenerator();
    const loggedIn = useLoggedIn();
    const organisation = useOrganisation();
    return (
        <Switch>
            <Route path={routes.home} exact component={loggedIn ? HomePage : HomeGuestPage} />

            {/* Register routes */}
            <Route path={routes.register} exact component={RegisterPage} />

            {/* Auth routes */}
            {loggedIn ? (
                <Redirect
                    from={[
                        routes['auth.login'],
                        routes['auth.forgot_password'],
                        routes['auth.reset_password'],
                    ]}
                    to={url('account')}
                />
            ) : null}
            <Route path={routes['auth.login']} exact component={LoginPage} />
            <Route path={routes['auth.forgot_password']} exact component={ForgotPasswordPage} />
            <Route path={routes['auth.reset_password']} exact component={ResetPasswordPage} />

            {/* Account routes */}
            {!loggedIn ? (
                <Redirect
                    from={routes.account}
                    to={`${url('auth.login')}?${stringifyQuery({
                        next: url('account'),
                    })}`}
                />
            ) : null}
            <Route path={routes.account} exact component={AccountPage} />

            {/* Organisation routes */}
            {organisation === null ? (
                <Redirect
                    from={[
                        routes['organisation.settings'],
                        routes['organisation.team'],
                        routes['organisation.billing'],
                    ]}
                    to={routes.home}
                />
            ) : null}
            <Route
                path={routes['organisation.settings']}
                exact
                component={OrganisationSettingsPage}
            />
            <Route
                path={routes['organisation.billing']}
                exact
                component={OrganisationBillingPage}
            />
            <Route path={routes['organisation.team']} exact component={OrganisationTeamPage} />
            <Route
                path={routes['organisation.switch']}
                exact
                render={({
                    match: {
                        params: { organisation: organisationSlug },
                    },
                }) => {
                    return organisation === null || organisation.slug !== organisationSlug ? (
                        <OrganisationSwitchPage slug={organisationSlug} />
                    ) : (
                        <Redirect to={url('home')} />
                    );
                }}
            />

            {/* Stories routes */}
            <Route path={routes.stories} exact component={StoriesPage} />
            <Route path={routes['stories.create']} exact component={CreatePage} />
            <Route path={routes['stories.editor']} component={EditorPage} />
        </Switch>
    );
};

Routes.propTypes = propTypes;
Routes.defaultProps = defaultProps;

export default Routes;
