/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const defaultValue = {
    menuVisible: false,
    menuSize: 0,
};

export const ViewerContext = React.createContext(defaultValue);

export const useViewer = () => useContext(ViewerContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    menuVisible: PropTypes.bool,
    menuSize: PropTypes.number,
};

const defaultProps = { ...defaultValue };

export const ViewerProvider = ({ children, menuVisible, menuSize }) => {
    const value = useMemo(
        () => ({
            menuVisible,
            menuSize,
        }),
        [menuVisible, menuSize],
    );
    return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
};

ViewerProvider.propTypes = propTypes;
ViewerProvider.defaultProps = defaultProps;
