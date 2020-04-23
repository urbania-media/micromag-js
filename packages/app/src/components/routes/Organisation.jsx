/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

import { useRoutes } from '../../contexts/RoutesContext';
import OrganisationPage from '../pages/organisation/Organisation';

const propTypes = {};

const defaultProps = {};

const OrganisationRoutes = () => {
    const routes = useRoutes();
    return (
        <Route path={[routes.organisation]} exact>
            <Switch>
                <Route path={routes.organisation} exact component={OrganisationPage} />
            </Switch>
        </Route>
    );
};

OrganisationRoutes.propTypes = propTypes;
OrganisationRoutes.defaultProps = defaultProps;

export default OrganisationRoutes;
