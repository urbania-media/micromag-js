/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router';
import { useRoutes, useUrlGenerator } from '@micromag/core/contexts';

import { useOrganisation } from '../../contexts/OrganisationContext';
import OrganisationSettingsPage from '../pages/organisation/Settings';
import OrganisationMembersPage from '../pages/organisation/Members';
import OrganisationSwitchPage from '../pages/organisation/Switch';

const propTypes = {};

const defaultProps = {};

const OrganisationRoutes = () => {
    const routes = useRoutes();
    const url = useUrlGenerator();
    const organisation = useOrganisation();
    return (
        <Switch>
            {organisation === null ? (
                <Redirect
                    from={[routes['organisation.settings'], routes['organisation.members']]}
                    to={routes.home}
                />
            ) : null}
            <Route
                path={routes['organisation.settings']}
                exact
                component={OrganisationSettingsPage}
            />
            <Route
                path={routes['organisation.members']}
                exact
                component={OrganisationMembersPage}
            />
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
        </Switch>
    );
};

OrganisationRoutes.propTypes = propTypes;
OrganisationRoutes.defaultProps = defaultProps;

export default OrganisationRoutes;
