import React from 'react';
import { Story } from '@micromag/core';
import Audio from './Audio';
import Test from './test.mp3';

export default {
    component: Audio,
    title: 'Screens/Audio',
};

export const Default = () => (
    <Story>
        <Audio src={Test} />
    </Story>
);
