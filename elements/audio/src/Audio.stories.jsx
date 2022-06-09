import React from 'react';
import { audioMedia } from '../../../.storybook/data';
import Audio from './Audio';

export default {
    component: Audio,
    title: 'Elements/Audio',
};

export const Normal = () => <Audio media={audioMedia()} />;

export const NormalWithWaveform = () => <Audio media={audioMedia({ withWaveform: true })} withWave />;

export const Autoplay = () => <Audio media={audioMedia()} autoPlay loop />;
