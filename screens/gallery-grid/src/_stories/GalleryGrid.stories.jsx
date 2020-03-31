/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import GalleryGrid from '../GalleryGrid';

const images = [
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
];

const props = {
    spacing: 2,
    images,
};

export default {
    component: GalleryGrid,
    title: 'Screens/GalleryGrid',
};

export const OnePlusThree = () => <GalleryGrid {...props} />;

export const OneTwo = () => <GalleryGrid {...props} />;

export const Four = () => <GalleryGrid {...props} />;

export const TwoOne = () => <GalleryGrid {...props} />;

export const Nine = () => <GalleryGrid {...props} />;
