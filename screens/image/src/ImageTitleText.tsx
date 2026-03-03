/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ImageScreen from './Image';

function ImageTitleTextScreen({ ...props }) {
  return <ImageScreen {...props} withTitle withText />;
}

export default ImageTitleTextScreen;
