/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import GalleryFeedScreen from './GalleryFeed';

const GalleryFeedLegendsScreen = ({ ...props }) => (
    <GalleryFeedScreen
        {...props}
        withLegends
    />
);

export default GalleryFeedLegendsScreen;
