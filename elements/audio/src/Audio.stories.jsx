/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Audio from './Audio';
import { audio } from '../../../.storybook/data';

export default {
    component: Audio,
    title: 'Elements/Audio',
};

export const Normal = () => <Audio media={audio()} />;

export const Native = () => <Audio media={audio()} native />;
