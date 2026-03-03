/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';

export const FieldsValueContext = React.createContext(null);

export const useFieldsValue = () => useContext(FieldsValueContext);

interface FieldsValueContextProviderProps {
    value?: unknown;
    children: React.ReactNode;
}

export const FieldsValueContextProvider = ({ value = null, children }) => (
    <FieldsValueContext.Provider value={value}>{children}</FieldsValueContext.Provider>
);

