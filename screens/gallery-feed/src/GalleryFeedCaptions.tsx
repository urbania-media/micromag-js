/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import GalleryFeedScreen from './GalleryFeed';

const GalleryFeedCaptionsScreen = ({ ...props }) => <GalleryFeedScreen {...props} withCaptions />;

export default GalleryFeedCaptionsScreen;
