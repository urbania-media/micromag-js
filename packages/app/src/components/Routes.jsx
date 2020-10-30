import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router';
import { stringify as stringifyQuery } from 'query-string';
import { useRoutes, useUrlGenerator } from '@micromag/core/contexts';

import { useLoggedIn, useUser } from '../contexts/AuthContext';
import { useOrganisation } from '../contexts/OrganisationContext';

import HomePage from './pages/Home';
import HomeOrganisationPage from './pages/HomeOrganisation';
import HomeGuestPage from './pages/HomeGuest';

import RegisterPage from './pages/register/Register';
import CompleteProfilePage from './pages/register/CompleteProfile';
import InvitePage from './pages/register/Invite';

import AccountPage from './pages/account/Account';
import AccountProfilePage from './pages/account/Profile';

import LoginPage from './pages/auth/Login';
import ForgotPasswordPage from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPassword';
import CheckEmailPage from './pages/auth/CheckEmail';

import OrganisationCreatePage from './pages/organisation/Create';
import OrganisationSettingsPage from './pages/organisation/Settings';
import OrganisationBillingPage from './pages/organisation/Billing';
import OrganisationTeamPage from './pages/organisation/Team';
import OrganisationThemesPage from './pages/organisation/Themes';
import OrganisationMediasPage from './pages/organisation/Medias';
import OrganisationSwitchPage from './pages/organisation/Switch';

import StoriesPage from './pages/stories/Stories';
import StoryCreatePage from './pages/stories/Create';
import StoryPage from './pages/stories/Story';
import StoryEditorPage from './pages/stories/Editor';
import StoryPreviewPage from './pages/stories/Preview';
import StoryPublishPage from './pages/stories/Publish';
import StorySettingsPage from './pages/stories/Settings';

const propTypes = {};

const defaultProps = {};

const Routes = () => {
    const routes = useRoutes();
    const url = useUrlGenerator();
    const loggedIn = useLoggedIn();
    const user = useUser();
    const hasCompleteProfile = !!user && !!user.name;
    const organisation = useOrganisation();
    const HomePageByType = organisation !== null ? HomeOrganisationPage : HomePage;
    const Home = loggedIn ? HomePageByType : HomeGuestPage;

    return (
        <Switch>
            {/*
                Home routes
            */}

            {!hasCompleteProfile && loggedIn ? (
                <Route path={routes.home} exact component={CompleteProfilePage} />
            ) : (
                <Route path={routes.home} exact component={Home} />
            )}

            {/*
                Register routes
            */}
            <Route path={routes.register} exact component={RegisterPage} />
            <Route path={routes['register.complete']} exact component={CompleteProfilePage} />
            <Route path={routes['register.invite']} exact component={InvitePage} />

            {/*
                Auth routes
            */}

            {hasCompleteProfile && loggedIn ? (
                <Redirect
                    from={[
                        routes['auth.login'],
                        routes['auth.forgot_password'],
                        routes['auth.reset_password'],
                        routes['auth.check_email'],
                    ]}
                    to={url('account')}
                />
            ) : null}
            <Route path={routes['auth.login']} exact component={LoginPage} />
            <Route path={routes['auth.forgot_password']} exact component={ForgotPasswordPage} />
            <Route path={routes['auth.check_email']} exact component={CheckEmailPage} />
            <Route path={routes['auth.reset_password']} exact component={ResetPasswordPage} />

            {/*
                Account routes
            */}
            {!loggedIn ? (
                <Redirect
                    from={routes.account}
                    to={`${url('auth.login')}?${stringifyQuery({
                        next: url('account'),
                    })}`}
                />
            ) : null}
            <Route path={routes.account} exact component={AccountPage} />
            <Route path={routes['account.profile']} exact component={AccountProfilePage} />

            {/*
                Organisation routes
            */}
            {organisation === null ? (
                <Redirect
                    from={[
                        routes['organisation.settings'],
                        routes['organisation.billing'],
                        routes['organisation.team'],
                        routes['organisation.themes'],
                        routes['organisation.medias'],
                    ]}
                    to={routes.home}
                />
            ) : null}
            <Route path={routes['organisation.create']} exact component={OrganisationCreatePage} />
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
            <Route path={routes['organisation.themes']} exact component={OrganisationThemesPage} />
            <Route path={routes['organisation.medias']} exact component={OrganisationMediasPage} />
            <Route
                path={routes['organisation.switch']}
                exact
                render={({
                    match: {
                        params: { organisation: organisationSlug },
                    },
                }) =>
                    organisation === null || organisation.slug !== organisationSlug ? (
                        <OrganisationSwitchPage slug={organisationSlug} />
                    ) : (
                        <Redirect to={url('home')} />
                    )
                }
            />

            {/*
                Stories routes
            */}
            <Route path={routes.stories} exact component={StoriesPage} />
            <Route path={routes['stories.create']} exact component={StoryCreatePage} />
            <Route path={routes['stories.show']} exact component={StoryPage} />
            <Route path={routes['stories.editor']} component={StoryEditorPage} />
            <Route path={routes['stories.preview']} component={StoryPreviewPage} />
            <Route path={routes['stories.publish']} component={StoryPublishPage} />
            <Route path={routes['stories.settings']} component={StorySettingsPage} />
        </Switch>
    );
};

Routes.propTypes = propTypes;
Routes.defaultProps = defaultProps;

export default Routes;
