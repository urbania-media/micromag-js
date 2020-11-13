/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import GalleryScreen from './Gallery';

const GalleryLegendsScreen = ({ ...props }) => (
    <GalleryScreen
        {...props}
        withLegends
    />
);

export default GalleryLegendsScreen;
