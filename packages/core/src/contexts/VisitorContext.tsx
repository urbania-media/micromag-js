/* eslint-disable react/jsx-props-no-spreading */
import isString from 'lodash/isString';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { Visitor } from '../types';

type VisitorContextType = {
    visitor: Visitor | null;
    setVisitor: (visitor: Visitor | string | null) => void;
};

export const VisitorContext = createContext<VisitorContextType>({
    visitor: null,
    setVisitor: () => {},
});

export function useVisitorContext() {
    const { visitor, setVisitor } = useContext(VisitorContext);
    return { visitor, setVisitor };
}

export function useVisitor() {
    const { visitor } = useContext(VisitorContext);
    return visitor;
}

export function useSetVisitor() {
    const { setVisitor } = useContext(VisitorContext);
    return setVisitor;
}

interface VisitorProviderProps {
    children: React.ReactNode;
    visitor?: Visitor | string | null;
}

export function VisitorProvider({
    visitor: providedVisitor = null,
    children,
}: VisitorProviderProps) {
    const [visitor, setVisitor] = useState<Visitor | null>(
        isString(providedVisitor) ? { id: providedVisitor } : providedVisitor,
    );

    useEffect(() => {
        if (providedVisitor !== visitor) {
            setVisitor(isString(providedVisitor) ? { id: providedVisitor } : providedVisitor);
        }
    }, [providedVisitor, setVisitor]);

    const value = useMemo(
        () => ({
            visitor,
            setVisitor: (newVisitor: string | Visitor | null) =>
                setVisitor(isString(newVisitor) ? { id: newVisitor } : newVisitor),
        }),
        [visitor, setVisitor],
    );

    return <VisitorContext.Provider value={value}>{children}</VisitorContext.Provider>;
}
