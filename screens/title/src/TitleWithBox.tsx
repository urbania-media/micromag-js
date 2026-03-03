/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TitleScreen from './Title';

interface TitleWithBoxScreenProps {
    [key: string]: unknown;
}

function TitleWithBoxScreen(props) {
    return <TitleScreen {...props} withSubtitle withDescription withBox />;
}

export default TitleWithBoxScreen;
