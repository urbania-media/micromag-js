/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TitleScreen from './Title';

interface TitleWithBoxScreenProps {
    [key: string]: unknown;
}

const TitleWithBoxScreen = (props) => (
    <TitleScreen
        {...props}
        withSubtitle
        withDescription
        withBox
    />
);

export default TitleWithBoxScreen;
