/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import withGoogleMapsApi from '../../../.storybook/decorators/withGoogleMaps';
import { map } from '../../../.storybook/data';

import MapComponent from './Map';

const props = {
    ...map(),
};

export default {
    component: MapComponent,
    title: 'Elements/Map',
    decorators: [withGoogleMapsApi],
};

export const Default = () => <MapComponent {...props} />;
