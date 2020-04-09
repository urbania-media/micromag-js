/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Center } from '../components';
import { withGoogleMapsApi, withScreenSize } from '../../../../.storybook/decorators';
import { map, background, backgroundImage } from '../../../../.storybook/data';

const props = {
    map: map(),
    cardBackground: background(),
};

export default {
    component: Center,
    title: 'Screens/Map/Views',
    decorators: [withScreenSize(), withGoogleMapsApi],
};

export const MapCentered = () => <Center {...props} />;

export const MapWithBackground = () => <Center {...props} background={backgroundImage()} />;

export const MapEmpty = () => <Center map={{ ...map, markers: [] }} />;
