import { v1 as uuid } from 'uuid';

import {
    tommy,
    mans,
    survey1options,
    quiz1options,
    quiz2options,
    quiz3options,
    quiz4options,
    quiz5options,
    quiz6options,
    timelineItems,
    rankingItems,
} from './data';

import { header1, header2, bodyText, background, backgroundImage } from './styles';

const faceAFaceStory = [
    {
        id: uuid(),
        type: 'title',
        layout: 'middle',
        title: {
            body: 'Face à face avec votre face',
            textStyle: header1,
        },
        background: backgroundImage(),
    },
    {
        id: uuid(),
        type: 'quote',
        layout: 'middle',
        author: {
            body:
                'Tommy Kruise, qui se rappelle le déclic qui l’a poussé à subir une opération chirurgicale à la mâchoire pour guérir son apnée du sommeil',
            textStyle: bodyText,
        },
        quote: {
            body: '« Soudainement, je m’en crissais de ce que j’allais avoir l’air. »',
            textStyle: header2,
        },
        background: background(),
    },
    {
        id: uuid(),
        type: 'image-title-text',
        layout: 'card',
        title: {
            body: 'Changer de visage',
            textStyle: header2,
        },
        text: {
            body:
                'Ça faisait longtemps qu’il y pensait, mais c’est après qu’un ami soit décédé de complications reliées à l’apnée du sommeil que Tommy Kruise s’est décidé à faire passer son visage au bistouri. Il s’endormait partout et ça le rendait même irritable et un peu chiant. Son opération à la mâchoire a changé son look de façon subtile, mais il dort nettement mieux depuis. «Maintenant, j’ai vraiment un jawline, alors je suis content!»',
            textStyle: bodyText,
        },
        image: tommy,
        background: backgroundImage(),
    },
    {
        id: uuid(),
        type: 'gallery-feed-legends',
        title: {
            body: 'La face de l’humain au fil du temps',
            textStyle: header2,
        },
        images: mans,
        background: backgroundImage(),
    },
    {
        id: uuid(),
        type: 'survey',
        layout: 'middle',
        question: {
            body: 'Qu’est-ce qui vous agace le plus dans votre face?',
            textStyle: header2,
        },
        options: survey1options,
        background: background(),
    },
    {
        id: uuid(),
        type: 'title',
        layout: 'middle',
        title: {
            body: 'Avez-vous du pif au milieu du visage? Testez vos connaissances!',
            textStyle: header1,
        },
        background: backgroundImage(),
    },
    {
        id: uuid(),
        type: 'quiz',
        layout: 'middle',
        question: {
            body: 'Combien d’heures a duré la première greffe de visage au Canada?',
            textStyle: header2,
        },
        options: quiz1options,
        answerIndex: 2,
        result: {
            body:
                'La pose du visage a duré 18 heures, mais il en a fallu 28 de plus pour retirer les visages du donneur et du receveur.',
            textStyle: bodyText,
        },
        background: background(),
    },
    {
        id: uuid(),
        type: 'quiz',
        layout: 'middle',
        question: {
            body: 'Combien d’yeux avait Frank and Louie, un chat à deux visages décédé en 2014?',
            textStyle: header2,
        },
        options: quiz2options,
        answerIndex: 2,
        result: {
            body:
                'Trois yeux et deux bouches, mais un seul cerveau. Vous avez le droit d’aller googler.',
            textStyle: bodyText,
        },
        background: background(),
    },
    {
        id: uuid(),
        type: 'quiz',
        layout: 'middle',
        question: {
            body:
                'Dans quelle proportion les systèmes de reconnaissance faciale identifient-ils erronément les Noirs, les Asiatiques et les Autochtones?',
            textStyle: header2,
        },
        options: quiz3options,
        answerIndex: 3,
        result: {
            body: 'La raison: ces systèmes sont testés sur des Blancs en grand majorité.',
            textStyle: bodyText,
        },
        background: background(),
    },
    {
        id: uuid(),
        type: 'quiz',
        layout: 'middle',
        question: {
            body:
                'Comment appelle-t-on un «faux» sourire qui n’est pas généré de façon authentique?',
            textStyle: header2,
        },
        options: quiz4options,
        answerIndex: 1,
        result: {
            body:
                'Pas qu’on croit pas à la sincérité des agents de bord, mais c’est humainement impossible de sourire constamment quand on est entouré de bébé qui braillent et de voyageurs qui chialent.',
            textStyle: bodyText,
        },
        background: background(),
    },
    {
        id: uuid(),
        type: 'quiz',
        layout: 'middle',
        question: {
            body:
                'Combien d’abonnés Instagram compte Jason Diamond, le chirurgien des stars d’Hollywood?',
            textStyle: header2,
        },
        options: quiz5options,
        answerIndex: 0,
        result: {
            body:
                'Mais l’histoire ne dit pas s’il utilise des filtres Instagram sur les photos de ses patients.',
            textStyle: bodyText,
        },
        background: background(),
    },
    {
        id: uuid(),
        type: 'quiz',
        layout: 'middle',
        question: {
            body: 'Combien de caméras de surveillance compte la Chine?',
            textStyle: header2,
        },
        options: quiz6options,
        answerIndex: 3,
        result: {
            body:
                'Une grande partie de ces caméras sont équipées de technologies de reconnaissance faciale qui laisse entrevoir un avenir un peu trop proche de Black Mirror.',
            textStyle: bodyText,
        },
        background: background(),
    },
    {
        id: uuid(),
        type: 'title-subtitle',
        layout: 'middle',
        title: {
            body: 'Top 3 des secrets des <br/>super-recognizers',
            textStyle: header1,
        },
        subtitle: {
            body:
                'Ces gens capables de reconnaître presque n’importe qui n’importe où n’importe quand',
            textStyle: header2,
        },
        background: backgroundImage(),
    },
    {
        id: uuid(),
        layout: 'side',
        type: 'ranking',
        items: rankingItems,
        background: background(),
    },
    {
        id: uuid(),
        type: 'title-subtitle-credits',
        layout: 'split-top',
        title: {
            body: 'Pourriez vous passer une semaine sans vous regarder dans le miroir?',
            textStyle: header2,
        },
        subtitle: {
            body: 'On a tenté l’expérience et voici comment ça s’est déroulé',
            textStyle: bodyText,
        },
        credits: {
            body: 'Par Hugo Meunier',
            textStyle: bodyText,
        },
        background: background(),
    },
    {
        id: uuid(),
        type: 'timeline',
        layout: 'normal',
        items: timelineItems,
        bulletColor: '#FFF',
        lineColor: '#FFF',
        bulletFilled: false,
        background: backgroundImage(),
    },
];

export default faceAFaceStory;
