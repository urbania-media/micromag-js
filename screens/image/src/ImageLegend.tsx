/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ImageScreen from './Image';

const ImageLegendScreen = ({ ...props }) => <ImageScreen {...props} withLegend />;

export default ImageLegendScreen;
