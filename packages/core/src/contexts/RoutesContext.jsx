/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { generatePath, useHistory } from 'react-router';

const RoutesContext = React.createContext(null);

export const useRoutes = () => useContext(RoutesContext);

export const useUrlGenerator = () => {
    const routes = useRoutes();
    const urlGenerator = useCallback((key, data) => generatePath(routes[key], data), [
        generatePath,
        routes,
    ]);
    return urlGenerator;
};

export const useHistoryPush = () => {
    const url = useUrlGenerator();
    const history = useHistory();
    const push = useCallback((route, data, ...args) => history.push(url(route, data), ...args), [
        history,
        url,
    ]);
    return push;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    routes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {};

export const RoutesProvider = ({ routes, children }) => (
    <RoutesContext.Provider value={routes}>{children}</RoutesContext.Provider>
);

RoutesProvider.propTypes = propTypes;
RoutesProvider.defaultProps = defaultProps;

export default RoutesContext;
