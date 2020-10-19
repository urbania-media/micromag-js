/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const LayoutContext = React.createContext({
    direction: 'horizontal',
});

export const useLayout = () => useContext(LayoutContext);

export const useLayoutDirection = () => {
    const { direction } = useContext(LayoutContext);
    return direction;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
};

const defaultProps = {
    direction: 'vertical',
};

// Note: this is done to avoid excessive renders on the screens that use the context

export const LayoutProvider = ({ direction, children }) => {
    const value = useMemo(() => ({ direction }), [direction]);
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

LayoutProvider.propTypes = propTypes;
LayoutProvider.defaultProps = defaultProps;

export default LayoutContext;
