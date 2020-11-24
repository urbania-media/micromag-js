import React from 'react';
import { imageMedia, videoMedia } from '../../../.storybook/data';
import Background from './Background';

export default {
    component: Background,
    title: 'Elements/Background',
};

export const color = () => (
    <Background
        width={200}
        height={350}
        color={{ color: '#ff0000', alpha: 0.5 }}
    />
);

export const image = () => (
    <Background
        width={200}
        height={350}
        image={imageMedia({ width: 400, height: 200 })}
        fit="cover"
        color={{ color: 'black' }}
    />
);

export const video = () => (
    <Background
        width={200}
        height={350}
        color={{ color: 'black' }}
        video={videoMedia()}
    />
);
