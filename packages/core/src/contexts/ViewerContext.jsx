/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';

const defaultValue = {
    menuVisible: false,
    menuSize: 0,
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

const propTypes = {
    children: PropTypes.node.isRequired,
    menuVisible: PropTypes.bool,
    menuSize: PropTypes.number,
    gotoNextScreen: PropTypes.func.isRequired,
    gotoPreviousScreen: PropTypes.func.isRequired,
};

const defaultProps = { ...defaultValue };

export const ViewerProvider = ({
    children,
    menuVisible,
    menuSize,
    gotoNextScreen,
    gotoPreviousScreen,
}) => {
    const value = useMemo(
        () => ({
            menuVisible,
            menuSize,
            gotoNextScreen,
            gotoPreviousScreen,
        }),
        [menuVisible, menuSize, gotoNextScreen, gotoPreviousScreen],
    );
    return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
};

ViewerProvider.propTypes = propTypes;
ViewerProvider.defaultProps = defaultProps;
