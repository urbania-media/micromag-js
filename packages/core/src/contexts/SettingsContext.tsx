/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';

export const SettingsContext = React.createContext({});

export const useSettings = () => useContext(SettingsContext);

export const useSetting = (key, defaultValue = null) => {
    const settings = useSettings();
    const { [key]: value = defaultValue } = settings || {};
    return value;
};

interface SettingsProviderProps {
    children: React.ReactNode;
    settings?: Record<string, unknown>;
}

export function SettingsProvider({ children, settings = null }) {
    const previousSettings = useSettings();
    const value = useMemo(
        () => ({
            ...previousSettings,
            ...settings,
        }),
        [settings, previousSettings],
    );
    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
