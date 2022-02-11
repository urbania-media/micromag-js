import React from 'react';
import MediaControls from './MediaControls';

export default {
    component: MediaControls,
    title: 'Elements/MediaControls',
    parameters: {
        intl: true,
    },
};

export const normal = () => <MediaControls />;
export const withSeekBar = () => <MediaControls withSeekBar />;
export const withPlayPause = () => <MediaControls withPlayPause />;
export const withSeekbarAndTime = () => <MediaControls withSeekBar withPlayPause withTime />;
export const withAll = () => <MediaControls withPlayPause withSeekBar muted />;
