/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TimelineScreen from './Timeline';

const TimelineIllustratedScreen = ({ ...props }) => (
    <TimelineScreen
        {...props}
        illustrated
    />
);

export default TimelineIllustratedScreen;
