import React from 'react';
import MediaControls from './MediaControls';

export default {
    component: MediaControls,
    title: 'Elements/MediaControls',
};

export const normal = () => <MediaControls />;
export const withSeekBar = () => <MediaControls withSeekBar />;
