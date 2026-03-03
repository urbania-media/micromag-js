/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';

interface StackProviderProps {
    children: React.ReactNode;
    direction?: 'vertical' | 'horizontal';
}
const StackContext = React.createContext({
    direction: 'horizontal',
});

export const useStack = () => useContext(StackContext);

export const useStackDirection = () => {
    const { direction } = useContext(StackContext);
    return direction;
};

// Note: this is done to avoid excessive renders on the screens that use the context

export function StackProvider({ direction = 'vertical', children }) {
    const value = useMemo(() => ({ direction }), [direction]);
    return <StackContext.Provider value={value}>{children}</StackContext.Provider>;
}

export default StackContext;
