/* eslint-disable react/jsx-props-no-spreading */
import withGoogleMapsApi from '#.storybook/decorators/withGoogleMaps';
import preview from '#.storybook/preview';
import React from 'react';

import MapComponent from './Map';

const props = {
    center: {
        lat: 45.5,
        lng: -73.56,
    },
    zoom: 10,
    draggable: true,
};

const meta = preview.meta({
    component: MapComponent,
    title: 'Elements/Map',
    decorators: [withGoogleMapsApi],
});

export const Default = meta.story(() => {
    return <MapComponent {...props} />;
});
