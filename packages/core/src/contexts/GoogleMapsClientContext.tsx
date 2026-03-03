/* eslint-disable react/jsx-props-no-spreading */
import { loadGoogleMaps } from '@folklore/services';
import React, { useContext, useEffect, useState } from 'react';

import { useGoogleKeys } from './GoogleKeysContext';

export const GoogleMapsClientContext = React.createContext(null);

export const useGoogleMapsClient = () => useContext(GoogleMapsClientContext);

export const withGoogleMapsClient = (WrappedComponent) => {
    const getDisplayName = ({ displayName = null, name = null }) =>
        displayName || name || 'Component';

    function WithGoogleMapsClientComponent(props) {
        return (
            <GoogleMapsClientContext.Consumer>
                {(client) => <WrappedComponent googleApiClient={client} {...props} />}
            </GoogleMapsClientContext.Consumer>
        );
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

export function GoogleMapsClientProvider({ children, locale = 'fr', libraries = null }) {
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

    return (
        <GoogleMapsClientContext.Provider value={client}>
            {children}
        </GoogleMapsClientContext.Provider>
    );
}
