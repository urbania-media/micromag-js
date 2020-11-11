import { v1 as uuid } from 'uuid';

import {
    advertising,
    image,
    images,
    imageWithRandomSize,
    text,
    audio,
    videoFile,
    background,
    backgroundImage,
    map,
    markers,
} from '../data';

export const basic = [
    {
        id: uuid(),
        type: 'map',
        layout: 'bottom',
        map: map(),
        markers: markers(),
        splash: { body: 'Débuter' },
        background: {
            color: '#FF0000',
        },
    },
    {
        id: uuid(),
        type: 'map-images',
        layout: 'top',
        map: map(),
        markers: markers(),
        splash: { body: 'Débuter' },
        background: {
            color: '#FF0000',
        },
    },
    {
        id: uuid(),
        type: 'gallery-feed',
        layout: 'normal',
        images: [...Array(5)].map(() => ({ image: imageWithRandomSize() })),
        background: {
            color: '#00FF00',
        },
    },
    {
        id: uuid(),
        type: 'image',
        layout: 'center',
        text: {
            body: 'Another another image text',
        },
        image: {
            ...image(),
        },
        background: {
            color: '#0000FF',
        },
    },
    {
        id: uuid(),
        type: 'image',
        layout: 'center',
        image: image({ width: 300, height: 300 }),
        background: {
            color: '#FF00FF',
        },
    },
    {
        id: uuid(),
        type: 'ad',
        layout: 'center',
        ad: advertising({ width: 300, height: 250 }),
        background: {
            color: '#00FFFF',
        },
    },
    {
        id: uuid(),
        type: 'audio',
        layout: 'center',
        image: image({ width: 300, height: 300 }),
        background: {
            color: '#00FF00',
        },
    },
    {
        id: uuid(),
        layout: 'one-plus-three',
        type: 'gallery',
        images: images({ count: 4 }),
        background: {
            color: '#FFFF00',
        },
    },
    {
        id: uuid(),
        type: 'gallery-feed',
        layout: 'normal',
        images: images({ count: 10 }),
        background: {
            color: '#00FFFF',
        },
    },
    {
        id: uuid(),
        type: 'text',
        layout: 'center',
        text: {
            ...text(),
            style: {
                text: {
                    color: '#EEE',
                },
            },
        },
        background: {
            color: '#0000FF',
        },
    },
    {
        id: uuid(),
        type: 'title',
        layout: 'center',
        title: {
            body: 'A title',
        },
        background: {
            color: '#FF0000',
        },
    },
];

export const medium = [
    {
        id: uuid(),
        type: 'title',
        layout: 'center',
        title: {
            body: 'A longer title',
        },
        subtitle: {
            body: 'A subtitle',
        },
        description: text('long', 'big'),
        background: backgroundImage({ random: true }),
    },
    {
        id: uuid(),
        type: 'video',
        layout: 'loop',
        video: videoFile(),
        background: backgroundImage({ random: true }),
    },
    {
        id: uuid(),
        type: 'image',
        layout: 'center',
        image: image({ width: 300, height: 300 }),
        background: backgroundImage({ random: true }),
    },
    {
        id: uuid(),
        type: 'audio',
        layout: 'center',
        image: image({ width: 300, height: 300 }),
        audio: audio(),
        background: background(),
    },
    {
        id: uuid(),
        type: 'gallery',
        layout: 'one-plus-three',
        images: images({ count: 4, random: true }),
        background: backgroundImage({ random: true }),
    },
    {
        id: uuid(),
        type: 'gallery-feed',
        layout: 'reverse',
        images: images({ count: 20 }),
        background: backgroundImage({ random: true }),
    },
    {
        id: uuid(),
        type: 'text',
        layout: 'center',
        text: {
            ...text(),
            style: {
                text: {
                    color: '#EEE',
                },
            },
        },
        background: backgroundImage({ random: true }),
    },
    {
        id: uuid(),
        type: 'image',
        layout: 'center',
        text: text('long', 'big'),
        image: {
            ...image({ width: 400, height: 400 }),
        },
        background: backgroundImage({ random: true }),
    },
];
