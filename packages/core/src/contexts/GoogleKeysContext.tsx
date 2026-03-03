/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';

import { useSetting } from './SettingsContext';

export const GoogleKeysContext = React.createContext({
    apiKey: null,
});

export const useGoogleKeys = () => useContext(GoogleKeysContext);

interface GoogleKeysProviderProps {
    children: React.ReactNode;
    apiKey?: string;
}

export function GoogleKeysProvider({ children, apiKey = null }) {
    const { apiKey: previousApiKey } = useGoogleKeys();
    const settingApiKey = useSetting('googleApiKey');
    const value = useMemo(
        () => ({ apiKey: apiKey || previousApiKey || settingApiKey }),
        [apiKey, previousApiKey, settingApiKey],
    );
    return <GoogleKeysContext.Provider value={value}>{children}</GoogleKeysContext.Provider>;
}

