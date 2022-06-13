/* eslint-disable react/jsx-props-no-spreading */
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
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

const propTypes = {
    children: PropTypes.node.isRequired,
    events: PropTypes.instanceOf(EventEmitter),
    containerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            // eslint-disable-next-line react/forbid-prop-types
            current: PropTypes.any,
        }),
    ]),
    menuVisible: PropTypes.bool,
    menuOverScreen: PropTypes.bool,
    topHeight: PropTypes.number,
    bottomHeight: PropTypes.number,
    bottomSidesWidth: PropTypes.number,
    gotoNextScreen: PropTypes.func,
    gotoPreviousScreen: PropTypes.func,
    disableInteraction: PropTypes.func,
    enableInteraction: PropTypes.func,
};

const defaultProps = { ...defaultValue };

export const ViewerProvider = ({
    children,
    containerRef,
    events,
    menuVisible,
    menuOverScreen,
    topHeight,
    bottomHeight,
    bottomSidesWidth,
    gotoNextScreen,
    gotoPreviousScreen,
    disableInteraction,
    enableInteraction,
}) => {
    const [webView, setWebView] = useState(null);

    const value = useMemo(
        () => ({
            containerRef,
            events,
            menuVisible,
            menuOverScreen,
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
};

ViewerProvider.propTypes = propTypes;
ViewerProvider.defaultProps = defaultProps;
