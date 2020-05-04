/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as MicromagPropTypes from '../PropTypes';

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
    size: MicromagPropTypes.screenSize,
};

const defaultProps = {
    size: {},
};

// Note: this is done to avoid excessive renders on the screens that use the context

export const ScreenSizeProvider = ({ size, children }) => {
    const [currentSize, setSize] = useState(size);
    const { width: prevWidth, height: prevHeight } = currentSize;
    const { width: nextWidth, height: nextHeight } = size;
    useEffect(() => {
        if (prevWidth !== nextWidth || prevHeight !== nextHeight) {
            setSize(size);
        }
    }, [setSize, nextWidth, nextHeight, prevWidth, prevHeight, size]);
    return <ScreenSizeContext.Provider value={currentSize}>{children}</ScreenSizeContext.Provider>;
};

ScreenSizeProvider.propTypes = propTypes;
ScreenSizeProvider.defaultProps = defaultProps;

export default ScreenSizeContext;
