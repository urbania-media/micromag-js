import { v1 as uuid } from 'uuid';

import { tommy, mans } from './data';

const faceAFaceStory = [
    {
        id: uuid(),
        type: 'title',
        layout: 'middle',
        title: {
            body: 'Face à face avec votre face',
        },
    },
    {
        id: uuid(),
        type: 'quote',
        layout: 'middle',
        author: {
            body:
                'Tommy Kruise, qui se rappelle le déclic qui l’a poussé à subir une opération chirurgicale à la mâchoire pour guérir son apnée du sommeil',
        },
        quote: {
            body: '« Soudainement, je m’en crissais de ce que j’allais avoir l’air. »',
        },
    },
    {
        id: uuid(),
        type: 'image-title-text',
        layout: 'normal',
        title: {
            body: 'Changer de visage',
        },
        text: {
            body:
                'Ça faisait longtemps qu’il y pensait, mais c’est après qu’un ami soit décédé de complications reliées à l’apnée du sommeil que Tommy Kruise s’est décidé à faire passer son visage au bistouri. Il s’endormait partout et ça le rendait même irritable et un peu chiant. Son opération à la mâchoire a changé son look de façon subtile, mais il dort nettement mieux depuis. «Maintenant, j’ai vraiment un jawline, alors je suis content!»',
        },
        image: tommy,
    },
    {
        id: uuid(),
        type: 'gallery-feed-legends',
        title: {
            body: 'La face de l’humain au fil du temps',
        },
        images: mans
    },
    {
        id: uuid(),
        type: 'title',
        layout: 'middle',
        title: {
            body: 'Face à face avec votre face',
        },
    },
    {
        id: uuid(),
        type: 'title',
        layout: 'middle',
        title: {
            body: 'Face à face avec votre face',
        },
    },
    {
        id: uuid(),
        type: 'title',
        layout: 'middle',
        title: {
            body: 'Face à face avec votre face',
        },
    },
];

export default faceAFaceStory;
