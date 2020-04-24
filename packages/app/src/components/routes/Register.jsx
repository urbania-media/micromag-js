/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { useRoutes } from '@micromag/core/contexts';

import RegisterPage from '../pages/register/Register';

const propTypes = {};

const defaultProps = {};

const RegisterRoutes = () => {
    const routes = useRoutes();
    return (
        <Switch>
            <Route path={routes.register} exact component={RegisterPage} />
        </Switch>
    );
};

RegisterRoutes.propTypes = propTypes;
RegisterRoutes.defaultProps = defaultProps;

export default RegisterRoutes;
