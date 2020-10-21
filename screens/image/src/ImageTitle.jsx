/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Image from './Image';

const ImageTitle = ({ ...props }) => (
    <Image
        {...props}
        withTitle
    />
);

export default ImageTitle;
