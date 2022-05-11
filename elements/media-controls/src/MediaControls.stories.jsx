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
export const withControls = () => <MediaControls withControls />;
export const withAll = () => <MediaControls withControls withSeekBar muted />;
export const withAllColored = () => (
    <MediaControls
        withControls
        withSeekBar
        muted
        color={{ color: '#FF0000', alpha: 1 }}
        progressColor={{ color: '#00FF00', alpha: 1 }}
        duration={30}
        currentTime={20}
    />
);
