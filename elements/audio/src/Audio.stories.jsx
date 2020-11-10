/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Audio from './Audio';
import { audio, closedCaptions } from '../../../.storybook/data';

export default {
    component: Audio,
    title: 'Elements/Audio',
};

const props = {...audio()};

export const Normal = () => <Audio {...props} />;
export const Loop = () => <Audio {...props} loop />;
export const AutoPlay = () => <Audio {...props} autoPlay />;
export const WithClosedCaptions = () => <Audio {...props} autoPlay loop closedCaptions={closedCaptions()} />;
