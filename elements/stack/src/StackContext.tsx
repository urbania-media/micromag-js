import React, { use, useMemo } from 'react';

interface StackProviderProps {
    children: React.ReactNode;
    direction?: 'vertical' | 'horizontal';
}
const StackContext = React.createContext({
    direction: 'horizontal',
});

export const useStack = () => use(StackContext);

export const useStackDirection = () => {
    const { direction } = use(StackContext);
    return direction;
};

// Note: this is done to avoid excessive renders on the screens that use the context

export function StackProvider({ direction = 'vertical', children }: StackProviderProps) {
    const value = useMemo(() => ({ direction }), [direction]);
    return <StackContext value={value}>{children}</StackContext>;
}

export default StackContext;
