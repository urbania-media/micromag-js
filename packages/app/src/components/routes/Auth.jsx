/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router';
import { useRoutes, useUrlGenerator } from '@micromag/core/contexts';

import { useAuth } from '../../contexts/AuthContext';
import LoginPage from '../pages/auth/Login';
import ForgotPasswordPage from '../pages/auth/ForgotPassword';
import ResetPasswordPage from '../pages/auth/ResetPassword';

const propTypes = {};

const defaultProps = {};

const AuthRoutes = () => {
    const { loggedIn } = useAuth();
    const url = useUrlGenerator();
    const routes = useRoutes();
    return (
        <Switch>
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
        </Switch>
    );
};

AuthRoutes.propTypes = propTypes;
AuthRoutes.defaultProps = defaultProps;

export default AuthRoutes;
