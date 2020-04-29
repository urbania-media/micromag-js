/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApi } from '@micromag/data';

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
    const api = useApi();
    const [user, setUser] = useState(initialUser);
    const login = useCallback(
        (email, password) =>
            api.auth.login(email, password).then(newUser => {
                setUser(newUser);
                return newUser;
            }),
        [api, setUser],
    );
    const logout = useCallback(() => api.auth.logout().then(() => setUser(null)), [api, setUser]);
    useEffect(() => {
        if (checkOnMount) {
            api.auth.check().then((newUser = null) => {
                if (newUser !== null) {
                    setUser(newUser);
                }
            });
        }
    }, []);
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
