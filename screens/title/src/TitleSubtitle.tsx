/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TitleScreen from './Title';

const TitleSubtitleScreen = ({ ...props }) => <TitleScreen {...props} withSubtitle />;

export default TitleSubtitleScreen;
