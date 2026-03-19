import React from 'react';

import MapScreen from './Map';

function MapImagesScreen({ ...props }) {
    return <MapScreen {...props} withMarkerImages />;
}

export default MapImagesScreen;
