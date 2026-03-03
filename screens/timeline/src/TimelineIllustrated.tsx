/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TimelineScreen from './Timeline';

function TimelineIllustratedScreen({ ...props }) {
    return <TimelineScreen {...props} illustrated />;
}

export default TimelineIllustratedScreen;
