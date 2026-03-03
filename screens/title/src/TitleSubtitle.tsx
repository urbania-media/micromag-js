/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TitleScreen from './Title';

function TitleSubtitleScreen({ ...props }) {
  return <TitleScreen {...props} withSubtitle />;
}

export default TitleSubtitleScreen;
