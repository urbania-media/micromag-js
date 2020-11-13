/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ImageScreen from './Image';

const ImageTitleTextScreen = ({ ...props }) => (
    <ImageScreen
        {...props}
        withTitle
        withText
    />
);

export default ImageTitleTextScreen;
