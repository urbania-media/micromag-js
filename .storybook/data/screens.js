import { v1 as uuid } from 'uuid';

import {
    // advertising,
    images,
    imageMedia,
    text,
    title,
    subtitle,
    audio,
    video,
    map,
    markers,
    quote,
    author,
} from '../data';

export const basic = [
    // {
    //     id: uuid(),
    //     type: 'ad',
    //     layout: 'center',
    //     ad: advertising({ width: 300, height: 250 }),
    //     background: {
    //         color: '#00FFFF',
    //     },
    // },
    {
        id: uuid(),
        type: 'audio',
        layout: 'normal',
        audio: audio(),
        background: {
            color: '#00FF00',
        },
    },
    // {
    //     id: uuid(),
    //     type: 'contribution',
    //     layout: 'normal',
    //     background: {
    //         color: '#00FFFF',
    //     },
    // },
    {
        id: uuid(),
        type: 'gallery',
        layout: 'one-two-one',        
        images: images({ count: 4 }),
        background: {
            color: '#FFFF00',
        },
    },
    {
        id: uuid(),
        type: 'gallery-feed',
        layout: 'normal',
        images: images({ count: 5 }),
        background: {
            color: '#00FF00',
        },
    },
    {
        id: uuid(),
        type: 'gallery-feed-legends',
        layout: 'normal',
        images: images({ count: 5 }),
        background: {
            color: '#00FFFF',
        },
    },
    {
        id: uuid(),
        type: 'image',
        layout: 'normal',
        image: imageMedia(),
        background: {
            color: '#FF00FF',
        },
    },
    {
        id: uuid(),
        type: 'image-title-text',
        layout: 'center',
        image: imageMedia(),
        title: {
            body: title(),
        },
        text: {
            body: 'Another another image text',
        },
        background: {
            color: '#0000FF',
        },
    },
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
        markers: markers({ withImage: true }),
        splash: { body: 'Avec images' },
        background: {
            color: '#FF0000',
        },
    },
    {
        id: uuid(),
        type: 'quiz',
        layout: 'middle',
        question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
        options: [
            { id: 1, label: { body: subtitle() } },
            { id: 2, label: { body: 'La bonne réponse' } },
            { id: 3, label: { body: subtitle() } },
            { id: 4, label: { body: subtitle() } },
        ],
        answerIndex: 1,
        result: {
            body: 'Et oui, la bonne réponse était "La bonne réponse". Quand même surprenant hen?'
        },
        background: {
            color: '#0000FF',
        },
    },
    {
        id: uuid(),
        type: 'quote',
        layout: 'middle',
        quote: { body: quote() },
        author: { body: author() },
        background: {
            color: '#00FFFF',
        },
    },
    {
        id: uuid(),
        type: 'ranking',
        layout: 'middle',
        items: [...new Array(10)].map(() => ({
            title: { body: title() },
            description: text('long'),
        })),
        background: {
            color: '#FF00FF',
        },
    },
    {
        id: uuid(),
        type: 'survey',
        layout: 'middle',
        question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
        options: [
            { id: 1, label: { body: 'Choix 1' }, percent: 34 },
            { id: 2, label: { body: 'Choix 2' }, percent: 12 },
            { id: 3, label: { body: 'Choix plus long' }, percent: 38 },
            { id: 4, label: { body: 'Choix 4' }, percent: 16 },
        ],
        background: {
            color: '#333',
        },
    },
    {
        id: uuid(),
        type: 'text',
        layout: 'middle',
        text: text(),
        background: {
            color: '#0000FF',
        },
    },
    {
        id: uuid(),
        type: 'timeline',
        layout: 'normal',
        items: [...new Array(10)].map(() => ({
            title: { body: title() },
            description: text('long'),
        })),
        bulletColor: '#FFF',
        lineColor: '#FFF',
        bulletFilled: false,
        background: {
            color: '#FF00FF',
        },
    },
    {
        id: uuid(),
        type: 'timeline-illustrated',
        layout: 'normal',
        items: [...new Array(10)].map(() => ({
            title: { body: title() },
            description: text('long'),
            image: imageMedia(),
        })),
        bulletColor: '#FFF',
        lineColor: '#FFF',
        bulletFilled: false,
        background: {
            color: '#0000FF',
        },
    },
    {
        id: uuid(),
        type: 'title',
        layout: 'middle',
        title: {
            body: 'A title',
        },
        background: {
            color: '#FF0000',
        },
    },
    {
        id: uuid(),
        type: 'video',
        layout: 'full',
        video: video(),
        background: {
            color: '#FF00FF',
        },
    },
];

export default basic;