/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Timeline from './Timeline';

const TimelineIllustrated = ({ ...props }) => (
    <Timeline
        {...props}
        illustrated
    />
);

export default TimelineIllustrated;
