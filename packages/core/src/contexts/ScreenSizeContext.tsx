/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import type { ScreenSize } from '../lib';
export const ScreenSizeContext = React.createContext({
    screen: null,
    screens: [],
    width: 0,
    height: 0,
    resolution: 1,
    landscape: false,
});

export const useScreenSize = () => useContext(ScreenSizeContext);

// Note: this is done to avoid excessive renders on the screens that use the context

interface ScreenSizeProviderProps {
    children: React.ReactNode;
    size?: ScreenSize;
}

export const ScreenSizeProvider = ({ size = {}, children }) => {
    const {
        screen: nextScreen,
        width: nextWidth,
        height: nextHeight,
        resolution: nextResolution,
    } = size;
    const currentSize = useMemo(() => size, [nextScreen, nextWidth, nextHeight, nextResolution]);
    return <ScreenSizeContext.Provider value={currentSize}>{children}</ScreenSizeContext.Provider>;
};

