/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Audio from './Audio';

import { audioMedia } from '../../../.storybook/data';

export default {
    component: Audio,
    title: 'Elements/Audio',
};

export const Normal = () => <Audio media={audioMedia()} />;

export const NormalWithWaveform = () => <Audio media={audioMedia({ withWaveform: true })} withWave />;

export const Autoplay = () => <Audio media={audioMedia()} autoPlay loop />;
