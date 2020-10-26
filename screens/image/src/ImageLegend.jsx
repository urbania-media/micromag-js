/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Image from './Image';

const ImageLegend = ({ ...props }) => (
    <Image
        {...props}
        withLegend
    />
);

export default ImageLegend;
