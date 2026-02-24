/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TitleScreen from './Title';

const propTypes = {
};

const TitleWithBoxScreen = (props) => (
    <TitleScreen
        {...props}
        withSubtitle
        withDescription
        withBox
    />
);

TitleWithBoxScreen.propTypes = propTypes;

export default TitleWithBoxScreen;
