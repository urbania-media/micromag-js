/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Center } from '../components';
import { withGoogleMapsApi, withScreenSize } from '../../../../.storybook/decorators';
import { map } from '../../../../.storybook/data';

const props = {
    map: map(),
};

export default {
    component: Center,
    title: 'Screens/MapPath/Views',
    decorators: [withScreenSize(), withGoogleMapsApi],
};

export const MapCentered = () => <Center {...props} />;
