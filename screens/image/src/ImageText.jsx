/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Image from './Image';

const ImageText = ({ ...props }) => (
    <Image
        {...props}
        withText
    />
);

export default ImageText;
