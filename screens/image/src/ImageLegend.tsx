/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ImageScreen from './Image';

function ImageLegendScreen({ ...props }) {
    return <ImageScreen {...props} withLegend />;
}

export default ImageLegendScreen;
