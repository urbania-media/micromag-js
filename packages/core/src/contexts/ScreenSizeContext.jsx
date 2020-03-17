/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import * as AppPropTypes from '../PropTypes';

const ScreenSizeContext = React.createContext({
    screen: null,
    screens: [],
    width: 0,
    height: 0,
});

export const useScreenSize = () => useContext(ScreenSizeContext);

export const useScreen = () => {
    const { screen = null } = useContext(ScreenSizeContext);
    return screen;
};

export const useScreens = () => {
    const { screens = [] } = useContext(ScreenSizeContext);
    return screens;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    size: AppPropTypes.screenSize,
};

const defaultProps = {
    size: {},
};

export const ScreenSizeProvider = ({ children, size }) => (
    <ScreenSizeContext.Provider value={size}>{children}</ScreenSizeContext.Provider>
);

ScreenSizeProvider.propTypes = propTypes;
ScreenSizeProvider.defaultProps = defaultProps;

export default ScreenSizeContext;
