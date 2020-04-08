/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Audio from './Audio';
import { audio } from '../../../.storybook/data';

export default {
    component: Audio,
    title: 'Components/Audio',
};

export const Normal = () => <Audio {...audio()} />;

export const Native = () => <Audio {...audio()} native />;
