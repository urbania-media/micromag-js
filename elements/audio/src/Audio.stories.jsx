/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Audio from './Audio';
import { audio } from '../../../.storybook/data';

export default {
    component: Audio,
    title: 'Elements/Audio',
};

const props = {...audio(), autoPlay: true };

export const Normal = () => <Audio {...props} />;
