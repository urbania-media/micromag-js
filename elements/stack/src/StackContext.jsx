/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const StackContext = React.createContext({
    direction: 'horizontal',
});

export const useStack = () => useContext(StackContext);

export const useStackDirection = () => {
    const { direction } = useContext(StackContext);
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

export const StackProvider = ({ direction, children }) => {
    const value = useMemo(() => ({ direction }), [direction]);
    return <StackContext.Provider value={value}>{children}</StackContext.Provider>;
};

StackProvider.propTypes = propTypes;
StackProvider.defaultProps = defaultProps;

export default StackContext;
