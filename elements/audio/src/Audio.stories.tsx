import React from 'react';

import { audioMedia } from '../../../.storybook/data';
import Audio from './Audio';

export default {
    component: Audio,
    title: 'Elements/Audio',
    parameters: {
        intl: true,
    },
};

export function Normal() {
    return <Audio media={audioMedia()} />;
}

export function NormalWithWaveform() {
    return (<Audio media={audioMedia({ withWaveform: true })} withWave />);
}

export function Autoplay() {
    return <Audio media={audioMedia()} autoPlay loop />;
}
