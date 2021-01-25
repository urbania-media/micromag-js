/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import MapScreen from './Map';

const MapImagesScreen = ({ ...props }) => <MapScreen {...props} withMarkerImages />;

export default MapImagesScreen;
