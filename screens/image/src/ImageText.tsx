import React from 'react';

import ImageScreen from './Image';

function ImageTextScreen({ ...props }) {
    return <ImageScreen {...props} withText />;
}

export default ImageTextScreen;
