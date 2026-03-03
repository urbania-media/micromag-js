/* eslint-disable react/jsx-props-no-spreading */
import isString from 'lodash/isString';
import React, { useContext, useState, useEffect, useMemo } from 'react';

import type { Visitor } from '../lib';
export const VisitorContext = React.createContext({
    visitor: null,
    setVisitor: () => {},
});

export const useVisitorContext = () => {
    const { visitor, setVisitor } = useContext(VisitorContext);
    return { visitor, setVisitor };
};

export const useVisitor = () => {
    const { visitor } = useContext(VisitorContext);
    return visitor;
};

export const useSetVisitor = () => {
    const { setVisitor } = useContext(VisitorContext);
    return setVisitor;
};

interface VisitorProviderProps {
    children: React.ReactNode;
    visitor?: Visitor;
}

export const VisitorProvider = ({ visitor: providedVisitor = null, children }) => {
    const [visitor, setVisitor] = useState(providedVisitor);

    useEffect(() => {
        if (providedVisitor !== visitor) {
            setVisitor(providedVisitor);
        }
    }, [providedVisitor, setVisitor]);

    const value = useMemo(
        () => ({
            visitor,
            setVisitor: (newVisitor) => (isString(newVisitor) ? { id: newVisitor } : newVisitor),
        }),
        [visitor, setVisitor],
    );

    return <VisitorContext.Provider value={value}>{children}</VisitorContext.Provider>;
};

