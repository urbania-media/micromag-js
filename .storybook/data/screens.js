import { v1 as uuid } from 'uuid';

import {
    images,
    imageMedia,
    imagesWithCaptions,
    closedCaptionsMedia,
    text,
    title,
    subtitle,
    audioMedia,
    videoMedia,
    video360Media,
    markers,
    quote,
    author,
    transitions,
} from '../data';

export const allScreens = [
    {
        id: uuid(),
        type: 'audio',
        layout: 'normal',
        audio: {
            media: audioMedia(),
            autoPlay: false,
            loop: true,
            closedCaptions: closedCaptionsMedia(),
        },
        background: {
            color: '#00FF00',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'contribution',
        layout: 'middle',
        title: { body: title() },
        name: { label: 'Votre nom' },
        message: { label: 'Votre message' },
        submit: { body: 'Envoyer' },
        background: {
            color: '#00FFFF',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'gallery',
        layout: 'one-two-one',
        images: images({ count: 4 }),
        background: {
            color: '#FFFF00',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'gallery-feed',
        layout: 'normal',
        images: images({ count: 5 }),
        background: {
            color: '#00FF00',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'gallery-feed-captions',
        layout: 'normal',
        images: imagesWithCaptions({ count: 5 }),
        background: {
            color: '#00FFFF',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'image',
        layout: 'normal',
        image: imageMedia(),
        background: {
            color: '#FF00FF',
        },
        transitions: transitions(),
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
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'map',
        layout: 'normal',
        title: { body: title() },
        description: text(),
        button: { body: 'Débuter' },
        scrollable: true,
        markers: markers(),        
        background: {
            color: '#FF0000',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'map-images',
        layout: 'normal',
        title: { body: title() },
        description: text(),
        button: { body: 'Avec images' },
        scrollable: true,
        markers: markers({ withImage: true }),        
        background: {
            color: '#0000FF',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'quiz',
        layout: 'top',
        question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
        answers: [
            { id: 1, label: { body: subtitle() } },
            { id: 2, label: { body: 'La bonne réponse' }, good: true },
            { id: 3, label: { body: subtitle() } },
            { id: 4, label: { body: subtitle() } },
        ],
        result: {
            body: 'Et oui, la bonne réponse était "La bonne réponse". Quand même surprenant hen?',
        },
        background: {
            color: '#00FF00',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'quote',
        layout: 'top',
        quote: { body: quote() },
        author: { body: author() },
        background: {
            color: '#00FFFF',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'ranking',
        layout: 'side',
        items: [...new Array(10)].map(() => ({
            title: { body: title() },
            description: text('long'),
        })),
        numbersStyle: { fontSize: 50 },
        background: {
            color: '#FF00FF',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'survey',
        layout: 'top',
        question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
        answers: [
            { id: 1, label: { body: 'Choix 1' }, percent: 34 },
            { id: 2, label: { body: 'Choix 2' }, percent: 12 },
            { id: 3, label: { body: 'Choix plus long' }, percent: 38 },
            { id: 4, label: { body: 'Choix 4' }, percent: 16 },
        ],
        background: {
            color: '#333',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'text',
        layout: 'top',
        text: text(),
        background: {
            color: '#0000FF',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'timeline',
        layout: 'normal',
        items: [...new Array(10)].map(() => ({
            title: { body: title() },
            description: text('long'),
        })),
        bulletShape: 'circle',
        bulletColor: '#FFF',
        lineColor: '#FFF',
        bulletFilled: false,
        background: {
            color: '#FF00FF',
        },
        transitions: transitions(),
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
        bulletShape: 'circle',
        bulletColor: '#FFF',
        lineColor: '#FFF',
        bulletFilled: false,
        background: {
            color: '#0000FF',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'title',
        layout: 'top',
        title: {
            body: title(),
        },
        background: {
            color: '#FF0000',
        },
        transitions: transitions(),
    },
    {
        id: uuid(),
        type: 'video',
        layout: 'normal',
        video: {
            media: videoMedia(),
            autoPlay: false,
            loop: true,
            closedCaptions: closedCaptionsMedia(),
            withSeekBar: true,
        },
        background: {
            color: '#FF00FF',
        },
        transitions: transitions(),
    },
    // {
    //     id: uuid(),
    //     type: 'video-360',
    //     layout: 'full',
    //     video: {
    //         media: video360Media(),
    //         autoPlay: false,
    //         loop: true,
    //         closedCaptions: closedCaptionsMedia(),
    //         withSeekBar: true,
    //     },
    //     background: {
    //         color: '#FF00FF',
    //     },
    //     transitions: transitions(),
    // },
];

export default allScreens;
