/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slideshow from '../Slideshow';

const images = [
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
];

const props = { images };

export default {
    component: Slideshow,
    title: 'Screens/Slideshow',
};

export const Normal = () => <Slideshow {...props} />;
