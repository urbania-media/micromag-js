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
    videoMedia, // video360Media,
    markers,
    quote,
    author,
    callToAction,
    conversation, // color,
} from '../data';

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
        images: images({ count: 4 }),
        background: {
            color: { alpha: 1, color: '#FFFF00' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'gallery-feed',
        layout: 'normal',
        images: images({ count: 5 }),
        background: {
            color: { alpha: 1, color: '#00FF00' },
        },
        callToAction: callToAction(),
    },
    {
        id: uuid(),
        type: 'gallery-feed-captions',
        layout: 'normal',
        images: imagesWithCaptions({ count: 5 }),
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
            color: { alpha: 1, color: '#FF00FF' },
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
            color: { alpha: 1, color: '#0000FF' },
        },
        callToAction: callToAction(),
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
        items: [...new Array(10)].map(() => ({
            title: { body: title() },
            description: text('long'),
            image: imageMedia(),
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
        type: 'share',
        layout: 'top',
        heading: 'Share this micromag!',
        options: {
            facebook: true,
            twitter: true
        },
        background: {
            color: { alpha: 1, color: '#00c28e' },
        },
    },
];

export default allScreens;
