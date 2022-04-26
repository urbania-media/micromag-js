/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import { PropTypes as MicromagPropTypes } from '../lib';

export const ScreenSizeContext = React.createContext({
    screen: null,
    screens: [],
    width: 0,
    height: 0,
    resolution: 1,
    landscape: false,
});

export const useScreenSize = () => useContext(ScreenSizeContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    size: MicromagPropTypes.screenSize,
};

const defaultProps = {
    size: {},
};

// Note: this is done to avoid excessive renders on the screens that use the context

export const ScreenSizeProvider = ({ size, children }) => {
    const {
        screen: nextScreen,
        width: nextWidth,
        height: nextHeight,
        resolution: nextResolution,
    } = size;
    const currentSize = useMemo(() => size, [nextScreen, nextWidth, nextHeight, nextResolution]);
    return <ScreenSizeContext.Provider value={currentSize}>{children}</ScreenSizeContext.Provider>;
};

ScreenSizeProvider.propTypes = propTypes;
ScreenSizeProvider.defaultProps = defaultProps;
