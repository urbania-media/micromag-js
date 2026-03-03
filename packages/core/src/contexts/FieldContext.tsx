/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';

export const FieldContext = React.createContext(null);

export const useFieldContext = () => useContext(FieldContext);

interface FieldContextProviderProps {
    context?: unknown;
    children: React.ReactNode;
}

export function FieldContextProvider({ context = null, children }) {
    return <FieldContext.Provider value={context}>{children}</FieldContext.Provider>;
}
