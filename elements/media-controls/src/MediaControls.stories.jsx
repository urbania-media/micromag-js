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
export const withAll = () => <MediaControls withPlayPause withSeekBar withTime muted />;
export const withAllColored = () => (
    <MediaControls
        withPlayPause
        withSeekBar
        withTime
        muted
        color={{ color: '#FF0000', alpha: 1 }}
        progressColor={{ color: '#00FF00', alpha: 1 }}
        duration={30}
        currentTime={20}
    />
);
