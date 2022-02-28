/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import EventEmitter from 'wolfy87-eventemitter';

const defaultValue = {
    events: new EventEmitter(),
    menuVisible: false,
    menuSize: 0,
    disableInteraction: null,
    enableInteraction: null,
};

export const ViewerContext = React.createContext(defaultValue);

export const useViewer = () => useContext(ViewerContext);

export const useViewerNavigation = () => {
    const { gotoNextScreen, gotoPreviousScreen } = useViewer();
    return {
        gotoNextScreen,
        gotoPreviousScreen,
    };
};

export const useViewerEvents = () => {
    const { events } = useViewer();
    return events;
};

export const useViewerInteraction = () => {
    const { disableInteraction, enableInteraction } = useViewer();
    return { disableInteraction, enableInteraction };
};

const propTypes = {
    children: PropTypes.node.isRequired,
    events: PropTypes.instanceOf(EventEmitter),
    menuVisible: PropTypes.bool,
    menuSize: PropTypes.number,
    gotoNextScreen: PropTypes.func.isRequired,
    gotoPreviousScreen: PropTypes.func.isRequired,
    disableInteraction: PropTypes.func,
    enableInteraction: PropTypes.func,
};

const defaultProps = { ...defaultValue };

export const ViewerProvider = ({
    children,
    events,
    menuVisible,
    menuSize,
    gotoNextScreen,
    gotoPreviousScreen,
    disableInteraction,
    enableInteraction,
}) => {
    const value = useMemo(
        () => ({
            events,
            menuVisible,
            menuSize,
            gotoNextScreen,
            gotoPreviousScreen,
            disableInteraction,
            enableInteraction,
        }),
        [
            events,
            menuVisible,
            menuSize,
            gotoNextScreen,
            gotoPreviousScreen,
            disableInteraction,
            enableInteraction,
        ],
    );
    return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
};

ViewerProvider.propTypes = propTypes;
ViewerProvider.defaultProps = defaultProps;
