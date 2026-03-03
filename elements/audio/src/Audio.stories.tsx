import { audioMedia } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import Audio from './Audio';

const meta = preview.meta({
    component: Audio,
    title: 'Elements/Audio',

    parameters: {
        intl: true,
    },
});

export const Normal = meta.story(() => {
    return <Audio media={audioMedia()} />;
});

export const NormalWithWaveform = meta.story(() => {
    return <Audio media={audioMedia({ withWaveform: true })} withWave />;
});

export const Autoplay = meta.story(() => {
    return <Audio media={audioMedia()} autoPlay loop />;
});
