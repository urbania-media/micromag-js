import React from 'react';
import Audio from '../Audio';
import Test from './test.mp3';

export default {
    component: Audio,
    title: 'Screens/Audio',
};

export const Default = () => <Audio src={Test} />;
