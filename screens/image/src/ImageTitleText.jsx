/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Image from './Image';

const ImageTitleText = ({ ...props }) => (
    <Image
        {...props}
        withTitle
        withText
    />
);

export default ImageTitleText;
