/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import withGoogleMapsApi from '../../../.storybook/decorators/withGoogleMaps';

import MapComponent from './Map';

const props = {
    center: {
        lat: 45.5,
        lng: -73.56,
    },
    zoom: 10,
    scrollable: true,
};

export default {
    component: MapComponent,
    title: 'Elements/Map',
    decorators: [withGoogleMapsApi],
};

export const Default = () => <MapComponent {...props} />;
