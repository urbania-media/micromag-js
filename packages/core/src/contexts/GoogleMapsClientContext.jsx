/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadGoogleMaps } from '@folklore/services';

const GoogleMapsClientContext = React.createContext(null);

export const useGoogleMapsClient = () => useContext(GoogleMapsClientContext);

export const withGoogleMapsClient = WrappedComponent => {
    const getDisplayName = ({ displayName = null, name = null }) =>
        displayName || name || 'Component';

    const WithGoogleMapsClientComponent = props => (
        <GoogleMapsClientContext.Consumer>
            {client => <WrappedComponent googleApiClient={client} {...props} />}
        </GoogleMapsClientContext.Consumer>
    );
    WithGoogleMapsClientComponent.displayName = `WithGoogleMapsClient(${getDisplayName(
        WrappedComponent,
    )})`;
    return WithGoogleMapsClientComponent;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    apiKey: PropTypes.string.isRequired,
    locale: PropTypes.string,
    libraries: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
    locale: 'fr',
    libraries: null,
};

export const GoogleMapsClientProvider = ({ children, apiKey, locale, libraries }) => {
    const [client, setClient] = useState(null);
    useEffect(() => {
        loadGoogleMaps({ apiKey, locale, libraries }).then(mapsApi => setClient(mapsApi));
    }, [apiKey, setClient]);
    return (
        <GoogleMapsClientContext.Provider value={client}>
            {children}
        </GoogleMapsClientContext.Provider>
    );
};

GoogleMapsClientProvider.propTypes = propTypes;
GoogleMapsClientProvider.defaultProps = defaultProps;

export default GoogleMapsClientContext;
