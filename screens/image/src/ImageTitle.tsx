/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ImageScreen from './Image';

function ImageTitleScreen({ ...props }) {
    return <ImageScreen {...props} withTitle />;
}

export default ImageTitleScreen;
