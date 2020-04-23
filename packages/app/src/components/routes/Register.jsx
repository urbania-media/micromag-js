/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { Route } from 'react-router';

import { useRoutes } from '../../contexts/RoutesContext';
import RegisterPage from '../pages/register/Register';

const propTypes = {

};

const defaultProps = {
};

const RegisterRoutes = () => {
    const routes = useRoutes();
    return (
        <Route path={routes.register} exact>
            <Route
                path={routes.register}
                exact
                component={RegisterPage}
            />
        </Route>
    );
};

RegisterRoutes.propTypes = propTypes;
RegisterRoutes.defaultProps = defaultProps;

export default RegisterRoutes;
