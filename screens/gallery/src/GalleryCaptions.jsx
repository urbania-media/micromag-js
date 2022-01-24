/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import GalleryScreen from './Gallery';

function GalleryCaptionsScreen({ ...props }) {
    return <GalleryScreen {...props} withCaptions />;
}

export default GalleryCaptionsScreen;
