import React from 'react';
import { GoogleMapsClientProvider } from '../../packages/core/src/contexts';

const apiKey = process.env.GOOGLE_MAPS_API_KEY || null;

const withGoogleMaps = (Story) => {
    if (apiKey === null) return <div>Error loading api key</div>;
    return (
        <GoogleMapsClientProvider apiKey={apiKey} libraries={['places']}>
            <Story />
        </GoogleMapsClientProvider>
    );
};

export default withGoogleMaps;
