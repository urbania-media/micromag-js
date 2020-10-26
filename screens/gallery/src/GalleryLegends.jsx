/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Gallery from './Gallery';

const GalleryLegends = ({ ...props }) => (
    <Gallery
        {...props}
        withLegends
    />
);

export default GalleryLegends;
