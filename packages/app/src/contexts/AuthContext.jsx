/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuthLogin, useAuthLogout, useAuthCheck } from '@micromag/data';

import * as AppPropTypes from '../lib/PropTypes';

const AuthContext = React.createContext(null);

export const useAuth = () => useContext(AuthContext);
export const useUser = () => {
    const { user } = useAuth();
    return user;
};
export const useLoggedIn = () => {
    const { loggedIn } = useAuth();
    return loggedIn;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    user: AppPropTypes.user,
    checkOnMount: PropTypes.bool,
};

const defaultProps = {
    user: null,
    checkOnMount: false,
};

export const AuthProvider = ({ user: initialUser, checkOnMount, children }) => {
    const [user, setUser] = useState(initialUser);
    const { login: authLogin } = useAuthLogin();
    const { logout: authLogout } = useAuthLogout();
    const { check: authCheck } = useAuthCheck();
    const login = useCallback(
        (email, password) =>
            authLogin(email, password).then(newUser => {
                setUser(newUser);
                return newUser;
            }),
        [authLogin, setUser],
    );
    const logout = useCallback(() => authLogout().then(() => setUser(null)), [authLogout, setUser]);
    useEffect(() => {
        if (checkOnMount) {
            authCheck().then((newUser = null) => {
                if (newUser !== null) {
                    setUser(newUser);
                }
            });
        }
    }, [authCheck]);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loggedIn: user !== null,
                logout,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = propTypes;
AuthProvider.defaultProps = defaultProps;

export default AuthContext;
