/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ImageScreen from './Image';

const ImageTextScreen = ({ ...props }) => <ImageScreen {...props} withText />;

export default ImageTextScreen;
