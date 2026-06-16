import { loadGoogleMaps } from '@folklore/services';
import { type ReactNode, createContext, use, useEffect, useState } from 'react';

import { useGoogleKeys } from './GoogleKeysContext';

export const GoogleMapsClientContext = createContext(null);

export const useGoogleMapsClient = () => use(GoogleMapsClientContext);

const defaultLibraries = ['places'];
interface GoogleMapsClientProviderProps {
    children: ReactNode;
    locale?: string;
    libraries?: string[];
}

export function GoogleMapsClientProvider({
    children,
    locale = 'fr',
    libraries = defaultLibraries,
}: GoogleMapsClientProviderProps) {
    const { apiKey } = useGoogleKeys();
    const exisitingClient = useGoogleMapsClient();
    const [client, setClient] = useState(exisitingClient);

    useEffect(() => {
        if (exisitingClient === null) {
            loadGoogleMaps({ apiKey, locale, libraries }).then((newClient) => {
                setClient(newClient);
            });
        }
    }, [apiKey, locale, libraries, setClient, exisitingClient]);

    return <GoogleMapsClientContext value={client}>{children}</GoogleMapsClientContext>;
}
