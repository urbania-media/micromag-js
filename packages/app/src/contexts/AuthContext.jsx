/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import * as AppPropTypes from '../lib/PropTypes';
import { useApi } from './ApiContext';

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
};

const defaultProps = {
    user: null,
};

export const AuthProvider = ({ user: initialUser, children }) => {
    const api = useApi();
    const [user, setUser] = useState(initialUser);
    const login = useCallback(
        (email, password) =>
            api.auth.login(email, password).then(newUser => {
                setUser(newUser);
                return newUser;
            }),
        [setUser],
    );
    const logout = useCallback(() => setUser(null), [setUser]);
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
