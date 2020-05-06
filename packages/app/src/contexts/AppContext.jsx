/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext(null);

export const useApp = () => {
    const app = useContext(AppContext);
    return app;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    memoryRouter: PropTypes.bool,
};

const defaultProps = {
    memoryRouter: false,
};

export const AppProvider = ({ children, memoryRouter }) => {
    return (
        <AppContext.Provider value={{ memoryRouter }}>
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = propTypes;
AppProvider.defaultProps = defaultProps;

export default AppContext;
