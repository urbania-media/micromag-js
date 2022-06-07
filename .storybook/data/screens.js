import { v1 as uuid } from 'uuid';
import {
    medias,
    mediasWithCaptions,
    // images,
    // imagesWithCaptions,
    imageMedia,
    backgroundImage,
    closedCaptionsMedia,
    text,
    title,
    subtitle,
    audioMedia,
    videoMedia, // video360Media,
    bigVideoMediaWithSound,
    markers,
    quote,
    author,
    callToAction,
    conversation, // color,
} from '../data';
import article from './stories/article.json';

export const allScreens = [
    {
        id: uuid(),
        type: 'audio',
        layout: 'middle',
        audio: {
            media: audioMedia(),
            autoPlay: true,
            loop: true,
            closedCaptions: closedCaptionsMedia(),
        },
        background: {
            color: { alpha: 1, color: '#00FF00' },
            image: imageMedia(),
            video: videoMedia(),
        },
        callToAction: callToAction(),
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
            color: { alpha: 1, color: '#00FFFF' },
            image: imageMedia({ gif: true }),
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'gallery',
        layout: 'one-two-one',
        images: medias({ count: 4 }),
        background: {
            color: { alpha: 1, color: '#FFFF00' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'gallery-feed',
        layout: 'normal',
        images: medias({ count: 5 }),
        background: {
            color: { alpha: 1, color: '#00FF00' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'gallery-feed-captions',
        layout: 'normal',
        images: mediasWithCaptions({ count: 5 }),
        background: {
            color: { alpha: 1, color: '#00FFFF' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'image',
        layout: 'normal',
        image: imageMedia({ gif: true }),
        imageFit: 'contain',
        background: {
            color: { alpha: 1, color: '#FF00FF' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'image',
        layout: 'normal',
        image: videoMedia(),
        background: {
            color: { alpha: 1, color: '#123b0b' },
            video: bigVideoMediaWithSound(),
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'image-title-text',
        layout: 'normal',
        image: videoMedia(),
        title: {
            body: title(),
        },
        text: {
            body: 'Another another image text',
        },
        background: {
            color: { alpha: 1, color: '#0000FF' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'image-legend',
        layout: 'normal',
        image: imageMedia(),
        background: {
            color: { alpha: 1, color: '#FF00FF' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'map',
        layout: 'normal',
        title: { body: title() },
        description: text(),
        button: { body: 'Débuter' },
        draggable: true,
        markers: markers(),
        background: {
            color: { alpha: 1, color: '#FF0000' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'map-images',
        layout: 'normal',
        title: { body: title() },
        description: text(),
        button: { body: 'Avec images' },
        draggable: true,
        markers: markers({ withImage: true }),
        background: {
            color: { alpha: 1, color: '#0000FF' },
        },
        callToAction: callToAction(),
    },

    {
        id: uuid(),
        type: 'conversation',
        layout: 'normal',
        title: { body: 'Une conversation particulièrement intéressante' },
        conversation: conversation(13, 4),
        background: {
            color: { alpha: 1, color: '#00000F' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'quiz',
        layout: 'split',
        question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
        answers: [
            { id: '1', label: { body: subtitle() } },
            { id: '2', label: { body: 'La bonne réponse' }, good: true },
            { id: '3', label: { body: subtitle() } },
            { id: '4', label: { body: subtitle() } },
        ],
        result: {
            body: 'Et oui, la bonne réponse était "La bonne réponse". Quand même surprenant hen?',
        },
        background: {
            color: { alpha: 1, color: '#00FF00' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'quote',
        layout: 'middle',
        quote: { body: quote() },
        author: { body: author() },
        background: {
            color: { alpha: 1, color: '#00FFFF' },
        },
        callToAction: callToAction(),
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
            color: { alpha: 1, color: '#FF00FF' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'survey',
        layout: 'middle',
        question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
        answers: [
            { id: '1', label: { body: 'Choix 1' } },
            { id: '2', label: { body: 'Choix 2' } },
            { id: '3', label: { body: 'Choix plus long' } },
            { id: '4', label: { body: 'Choix 4' } },
        ],
        background: {
            color: { alpha: 1, color: '#333' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'text',
        layout: 'middle',
        text: text(),
        background: {
            color: { alpha: 1, color: '#0f00f7' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'timeline',
        layout: 'normal',
        items: [...new Array(10)].map(() => ({
            title: { body: title() },
            description: {
                ...text('long'),
                textStyle: { color: '#fff', alpha: 1 },
            },
        })),
        bulletShape: 'circle',
        bulletColor: { alpha: 1, color: '#FFF' },
        lineColor: { alpha: 1, color: '#FFF' },
        bulletFilled: false,
        background: {
            color: { alpha: 1, color: '#FF00FF' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'timeline-illustrated',
        layout: 'normal',
        items: [...new Array(10)].map((it, index) => ({
            title: { body: title() },
            description: text('long'),
            image: index % 3 === 0 ? videoMedia() : imageMedia(), // use a video for every third item
        })),
        bulletShape: 'circle',
        bulletColor: { alpha: 1, color: '#FFF' },
        lineColor: { alpha: 1, color: '#FFF' },
        bulletFilled: false,
        background: {
            color: { alpha: 1, color: '#0000FF' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'title',
        layout: 'middle',
        title: {
            body: title(),
        },
        background: {
            color: { alpha: 1, color: '#FF0000' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'video',
        layout: 'full',
        video: {
            media: videoMedia(),
            autoPlay: true,
            loop: true,
            closedCaptions: closedCaptionsMedia(),
            withSeekBar: true,
            withControls: true,
        },
        background: {
            color: { alpha: 1, color: '#FF00FF' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'video',
        layout: 'full',
        video: {
            media: videoMedia({ vertical: true }),
            autoPlay: true,
            loop: false,
            withSeekBar: true,
            withControls: true,
        },
        background: {
            color: { alpha: 1, color: '#FF00FF' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'urbania-recommendation',
        category: { body: 'Pièce de théâtre' },
        date: { body: 'du 14 FÉVRIER au 5 MARS' },
        title: { body: 'Blackbird' },
        sponsor: { body: 'suggéré par banque national' },
        description: {
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        },
        background: backgroundImage({ width: 320, height: 480 }),
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'share',
        layout: 'top',
        heading: {
            body: 'Share this micromag!',
            textStyle: { textAlign: 'center' },
        },
        options: {
            facebook: true,
            twitter: true
        },
        background: {
            color: { alpha: 1, color: '#00c28e' },
        },
    },
    {
        id: uuid(),
        type: 'urbania-article',
        article,
        background: {
            color: { alpha: 1, color: '#FF00FF' },
        },
        callToAction: callToAction(),
    },
];

export default allScreens;
