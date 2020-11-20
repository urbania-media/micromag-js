/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

// import * as MicromagPropTypes from '../PropTypes';

const ThemeContext = React.createContext({
    fonts: [],
});

export const useTheme = () => useContext(ThemeContext) || {};

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {
};

export const ThemeProvider = ({ children }) => {
    const value = useMemo(
        () => ({
            fonts: [],
        }),
        [],
    );
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = propTypes;
ThemeProvider.defaultProps = defaultProps;

export default ThemeContext;
