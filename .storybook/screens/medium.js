import uuid from 'uuid/v1';

import {
    advertising,
    image,
    images,
    text,
    audio,
    videoFile,
    background,
    backgroundImage,
} from '../data';

export default [
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
        layout: 'one_plus_three',
        images: images({ count: 4, random: true }),
        background: backgroundImage({ random: true }),
    },
    {
        id: uuid(),
        type: 'gallery-scroll',
        layout: 'triple',
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
        type: 'text-image',
        layout: 'center',
        text: text('long', 'big'),
        image: {
            ...image({ width: 400, height: 400 }),
        },
        background: backgroundImage({ random: true }),
    },
];
