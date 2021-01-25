/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ImageScreen from './Image';

const ImageTitleScreen = ({ ...props }) => <ImageScreen {...props} withTitle />;

export default ImageTitleScreen;
