/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext(null);

export const useApp = () => {
    const app = useContext(AppContext);
    return app;
};

export const useNav = () => {
    const { nav } = useApp();
    return nav;
};

export const useSetNav = () => {
    const { setNav } = useApp();
    return setNav;
};

export const usePage = (name) => {
    const pages = useContext(AppContext);
    return pages[name];
};

const propTypes = {
    children: PropTypes.node.isRequired,
    memoryRouter: PropTypes.bool,
    nav: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            label: PropTypes.string,
        }),
    ),
};

const defaultProps = {
    memoryRouter: false,
    nav: [],
};

export const AppProvider = ({ children, memoryRouter, nav: initialNav }) => {
    const [nav, setNav] = useState(initialNav);

    return (
        <AppContext.Provider value={{ memoryRouter, nav, setNav }}>{children}</AppContext.Provider>
    );
};

AppProvider.propTypes = propTypes;
AppProvider.defaultProps = defaultProps;

export default AppContext;
