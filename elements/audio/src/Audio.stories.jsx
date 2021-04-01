/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Audio from './Audio';

import { audioMedia } from '../../../.storybook/data';

export default {
    component: Audio,
    title: 'Elements/Audio',
};

const props = { media: audioMedia() };

export const Normal = () => <Audio {...props} />;

export const Autoplay = () => <Audio {...props} autoPlay loop />;
