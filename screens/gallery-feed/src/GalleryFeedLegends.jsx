/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import GalleryFeed from './GalleryFeed';

const GalleryFeedLegends = ({ ...props }) => (
    <GalleryFeed
        {...props}
        withLegends
    />
);

export default GalleryFeedLegends;
