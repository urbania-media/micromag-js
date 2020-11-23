/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import GalleryScreen from './Gallery';

const GalleryCaptionsScreen = ({ ...props }) => (
    <GalleryScreen
        {...props}
        withCaptions
    />
);

export default GalleryCaptionsScreen;
