/* eslint-disable react/jsx-props-no-spreading */
import isString from 'lodash/isString';
import React, { useContext, useMemo, useState } from 'react';
import EventEmitter from 'wolfy87-eventemitter';

const defaultValue = {
    events: new EventEmitter(),
    menuVisible: false,
    menuOverScreen: false,
    topHeight: 0,
    bottomHeight: 0,
    bottomSidesWidth: 0,
    gotoNextScreen: () => {},
    gotoPreviousScreen: () => {},
    disableInteraction: () => {},
    enableInteraction: () => {},
};

export const ViewerContext = React.createContext({
    ...defaultValue,
    webView: null,
    setWebView: () => {},
});

export const useViewerContext = () => useContext(ViewerContext);

export const useViewerSize = () => {
    const { width, height } = useViewerContext();
    return {
        width,
        height,
    };
};

export const useViewerNavigation = () => {
    const { gotoNextScreen, gotoPreviousScreen } = useViewerContext();
    return {
        gotoNextScreen,
        gotoPreviousScreen,
    };
};

export const useViewerEvents = () => {
    const { events } = useViewerContext();
    return events;
};

export const useViewerContainer = () => {
    const { containerRef = null } = useViewerContext();
    return containerRef !== null ? containerRef.current : null;
};

export const useViewerInteraction = () => {
    const { disableInteraction, enableInteraction } = useViewerContext();
    return { disableInteraction, enableInteraction };
};

export const useViewerWebView = () => {
    const { webView, setWebView } = useViewerContext();

    const value = useMemo(
        () => ({
            ...webView,
            opened: webView !== null,
            open: (newWebView) =>
                setWebView(
                    isString(newWebView)
                        ? {
                              url: newWebView,
                          }
                        : newWebView,
                ),
            close: () => setWebView(null),
            update: (newWebView) =>
                setWebView({
                    ...webView,
                    ...newWebView,
                }),
        }),
        [webView, setWebView],
    );
    return value;
};

interface ViewerProviderProps {
    children: React.ReactNode;
    events?: EventEmitter;
    containerRef?: (...args: unknown[]) => void | { current?: unknown };
    menuVisible?: boolean;
    menuOverScreen?: boolean;
    width?: number;
    height?: number;
    topHeight?: number;
    bottomHeight?: number;
    bottomSidesWidth?: number;
    gotoNextScreen?: (...args: unknown[]) => void;
    gotoPreviousScreen?: (...args: unknown[]) => void;
    disableInteraction?: (...args: unknown[]) => void;
    enableInteraction?: (...args: unknown[]) => void;
}

export function ViewerProvider({
    children,
    containerRef,
    events = new EventEmitter(),
    menuVisible = false,
    menuOverScreen = false,
    width,
    height,
    topHeight = 0,
    bottomHeight = 0,
    bottomSidesWidth = 0,
    gotoNextScreen = () => {},
    gotoPreviousScreen = () => {},
    disableInteraction = () => {},
    enableInteraction = () => {},
}: ViewerProviderProps) {
    const [webView, setWebView] = useState(null);

    const value = useMemo(
        () => ({
            containerRef,
            events,
            menuVisible,
            menuOverScreen,
            width,
            height,
            topHeight,
            bottomHeight,
            bottomSidesWidth,
            gotoNextScreen,
            gotoPreviousScreen,
            disableInteraction,
            enableInteraction,
            webView,
            setWebView,
        }),
        [
            containerRef,
            events,
            menuVisible,
            menuOverScreen,
            width,
            height,
            topHeight,
            bottomHeight,
            bottomSidesWidth,
            gotoNextScreen,
            gotoPreviousScreen,
            disableInteraction,
            enableInteraction,
            webView,
            setWebView,
        ],
    );
    return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
}
