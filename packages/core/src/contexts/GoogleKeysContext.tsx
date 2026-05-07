import { ReactNode, createContext, use } from 'react';

import { useSetting } from './SettingsContext';

export const GoogleKeysContext = createContext({
    apiKey: null,
});

export const useGoogleKeys = () => use(GoogleKeysContext);

interface GoogleKeysProviderProps {
    children: ReactNode;
    apiKey?: string | null;
}

export function GoogleKeysProvider({ children, apiKey = null }: GoogleKeysProviderProps) {
    const { apiKey: previousApiKey } = useGoogleKeys();
    const settingApiKey = useSetting('googleApiKey');
    const value = { apiKey: apiKey || previousApiKey || settingApiKey };
    return <GoogleKeysContext value={value}>{children}</GoogleKeysContext>;
}
