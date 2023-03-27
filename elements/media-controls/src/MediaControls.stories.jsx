/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import MediaControls from './MediaControls';

export default {
    component: MediaControls,
    title: 'Elements/MediaControls',
    parameters: {
        intl: true,
    },
};

const theme = {
    color: { color: '#FF0000', alpha: 1 },
    progressColor: { color: '#00FF00', alpha: 1 },
};

export const normal = () => <MediaControls {...theme} />;
export const loading = () => <MediaControls loading withSeekBar withControls {...theme} />;
export const withSeekBar = () => <MediaControls withSeekBar {...theme} />;
export const withControls = () => <MediaControls withControls {...theme} />;
export const withAll = () => <MediaControls withControls withSeekBar muted {...theme} />;

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
