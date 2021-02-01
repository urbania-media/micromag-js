/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const defaultValue = {
    menuVisible: false,
    menuSize: 0,
    menuPosition: 'top',
    menuOpened: false,
};

export const ViewerContext = React.createContext(defaultValue);

export const useViewer = () => useContext(ViewerContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    menuVisible: PropTypes.bool,
    menuSize: PropTypes.number,
    menuPosition: PropTypes.oneOf(['top', 'right']),
    menuOpened: PropTypes.bool,
};

const defaultProps = {...defaultValue};

export const ViewerProvider = ({ children, menuVisible, menuSize, menuPosition, menuOpened }) => {
    const value = useMemo(
        () => ({
            menuVisible,
            menuSize,
            menuPosition,
            menuOpened,
        }),
        [menuVisible, menuSize, menuPosition, menuOpened],
    );
    return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
};

ViewerProvider.propTypes = propTypes;
ViewerProvider.defaultProps = defaultProps;
