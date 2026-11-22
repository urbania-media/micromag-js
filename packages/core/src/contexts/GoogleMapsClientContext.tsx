import { loadGoogleMaps } from '@folklore/services';
import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react';

import { useGoogleKeys } from './GoogleKeysContext';
import createGoogleMapsLoader from './createGoogleMapsLoader';

export const GoogleMapsClientContext = React.createContext(null);

// Lets a consumer ask the closest provider to load the Google Maps API. The API is not loaded
// when the provider mounts, only when a component that needs it (a map, a geo field) mounts.
const GoogleMapsLoaderContext = React.createContext<(() => void) | null>(null);

const getServerClient = () => null;

export const useGoogleMapsClient = () => {
    const client = useContext(GoogleMapsClientContext);
    const requestLoad = useContext(GoogleMapsLoaderContext);
    useEffect(() => {
        if (client === null && requestLoad !== null) {
            requestLoad();
        }
    }, [client, requestLoad]);
    return client;
};

export const withGoogleMapsClient = (WrappedComponent) => {
    const getDisplayName = ({ displayName = null, name = null }) =>
        displayName || name || 'Component';

    function WithGoogleMapsClientComponent(props) {
        const client = useGoogleMapsClient();
        return <WrappedComponent googleApiClient={client} {...props} />;
    }

    WithGoogleMapsClientComponent.displayName = `WithGoogleMapsClient(${getDisplayName(
        WrappedComponent,
    )})`;
    return WithGoogleMapsClientComponent;
};

interface GoogleMapsClientProviderProps {
    children: React.ReactNode;
    locale?: string;
    libraries?: string[];
}

export function GoogleMapsClientProvider({
    children,
    locale = 'fr',
    libraries = null,
}: GoogleMapsClientProviderProps) {
    const { apiKey } = useGoogleKeys();
    const existingClient = useContext(GoogleMapsClientContext);
    const parentRequestLoad = useContext(GoogleMapsLoaderContext);
    const [loader] = useState(() => createGoogleMapsLoader(loadGoogleMaps));
    const loadedClient = useSyncExternalStore(loader.subscribe, loader.getClient, getServerClient);

    // A parent provider already loads the API on demand: use its client
    if (parentRequestLoad !== null) {
        return children;
    }

    const requestLoad = () => {
        if (existingClient === null) {
            loader.request({ apiKey, locale, libraries });
        }
    };

    return (
        <GoogleMapsLoaderContext.Provider value={requestLoad}>
            <GoogleMapsClientContext.Provider value={existingClient || loadedClient}>
                {children}
            </GoogleMapsClientContext.Provider>
        </GoogleMapsLoaderContext.Provider>
    );
}
