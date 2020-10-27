/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Map from './Map';

const MapImages = ({ ...props }) => <Map {...props} withMarkerImages />

export default MapImages;