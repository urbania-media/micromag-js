import { v1 as uuid } from 'uuid';

import {
    tommy,
    mans,
    survey1answers,
    quiz1answers,
    quiz2answers,
    quiz3answers,
    quiz4answers,
    quiz5answers,
    quiz6answers,
    timelineItems,
    rankingItems,
    backgroundNose,
    backgroundIntro,
    backgroundDarkBlueNoise,
    backgroundBlueNoise,
    backgroundBlackNoise,
    backgroundSkin,
    backgroundFaces,
    backgroundHugoMirror,
    colorPink,
    colorDarkBlue,
    colorGreen,
    colorYellow,
    transitions,
} from './data';

import { header1, header2, bodyText } from './styles';

const faceAFaceStory = {
    title: 'Face à face avec votre face',
    components: [
        {
            id: uuid(),
            type: 'title-subtitle',
            layout: 'bottom',
            title: {
                body: 'Face à face',
                textStyle: { ...header1, fontSize: 60, align: 'center', color: { color: colorPink }, lineHeight: 0.2 },
            },
            subtitle: {
                body: 'avec votre face',
                textStyle: { ...header1, fontSize: 50, align: 'center', color: { color: colorDarkBlue } },
            },
            background: backgroundIntro,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type: 'quote',
            layout: 'middle',
            quote: {
                body: 'Soudainement,<br/>je m’en crissais<br/>de ce que j’allais<br/>avoir l’air.',
                textStyle: {
                    fontFamily: header2.fontFamily,
                    fontSize: 50,
                    fontStyle: {
                        transform: 'uppercase',
                        outline: true,
                    },
                    lineHeight: 1,
                    color: { color: colorPink },
                },
            },
            author: {
                body:
                    'Tommy Kruise, qui se rappelle le déclic qui l’a poussé à subir une opération chirurgicale à la mâchoire pour guérir son apnée du sommeil',
                textStyle: bodyText,
            },
            background: backgroundDarkBlueNoise,
            transitions: transitions(),
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
            background: backgroundDarkBlueNoise,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type: 'gallery-feed-captions',
            title: {
                body: 'La face de l’humain au fil du temps',
                textStyle: header2,
            },
            images: mans,
            background: backgroundDarkBlueNoise,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type: 'survey',
            layout: 'middle',
            question: {
                body: 'Qu’est-ce qui vous agace le plus dans votre face?',
                textStyle: { ...header2, color: { color: colorGreen } },
            },
            answers: survey1answers,
            background: backgroundDarkBlueNoise,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type: 'title-subtitle',
            layout: 'split',
            title: {
                body: 'Avez-vous<br/>du pif<br/>au milieu<br/>du visage?',
                textStyle: { ...header1, color: { color: colorDarkBlue } },
            },
            subtitle: {
                body: 'Testez vos<br/>connaissances!',
                textStyle: { ...header2, color: { color: colorDarkBlue } },
            },
            background: backgroundNose,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type: 'quiz',
            layout: 'middle',
            question: {
                body: 'Combien d’heures a duré la première greffe de visage au Canada?',
                textStyle: header2,
            },
            answers: quiz1answers,
            result: {
                body:
                    'La pose du visage a duré 18 heures, mais il en a fallu 28 de plus pour retirer les visages du donneur et du receveur.',
                textStyle: bodyText,
            },
            background: backgroundSkin,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type: 'quiz',
            layout: 'middle',
            question: {
                body:
                    'Combien d’yeux avait Frank and Louie, un chat à deux visages décédé en 2014?',
                textStyle: header2,
            },
            answers: quiz2answers,
            result: {
                body:
                    'Trois yeux et deux bouches, mais un seul cerveau. Vous avez le droit d’aller googler.',
                textStyle: bodyText,
            },
            background: backgroundSkin,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type: 'quiz',
            layout: 'middle',
            question: {
                body:
                    'Dans quelle proportion les systèmes de reconnaissance faciale identifient-ils erronément les Noirs, les Asiatiques et les Autochtones?',
                textStyle: {...header2, fontSize: 34 },
            },
            answers: quiz3answers,
            result: {
                body: 'La raison: ces systèmes sont testés sur des Blancs en grand majorité.',
                textStyle: bodyText,
            },
            background: backgroundSkin,
            transitions: transitions(),
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
            answers: quiz4answers,
            result: {
                body:
                    'Pas qu’on croit pas à la sincérité des agents de bord, mais c’est humainement impossible de sourire constamment quand on est entouré de bébé qui braillent et de voyageurs qui chialent.',
                textStyle: bodyText,
            },
            background: backgroundSkin,
            transitions: transitions(),
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
            answers: quiz5answers,
            result: {
                body:
                    'Mais l’histoire ne dit pas s’il utilise des filtres Instagram sur les photos de ses patients.',
                textStyle: bodyText,
            },
            background: backgroundSkin,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type: 'quiz',
            layout: 'middle',
            question: {
                body: 'Combien de caméras de surveillance compte la Chine?',
                textStyle: header2,
            },
            answers: quiz6answers,
            result: {
                body:
                    'Une grande partie de ces caméras sont équipées de technologies de reconnaissance faciale qui laisse entrevoir un avenir un peu trop proche de Black Mirror.',
                textStyle: bodyText,
            },
            background: backgroundSkin,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type:  'title-subtitle-credits',
            layout: 'middle',
            title: {
                body: 'Top 3',
                textStyle: {...header1, align: 'center', fontSize: 90, lineHeight: 0.5 },
            },
            subtitle: {
                body:
                    'des secrets des<br/>super-recognizers',
                textStyle: {...header2, align: 'center', fontSize: 30, color: { color: colorYellow }},
            },
            credits: {
                body:
                    'Ces gens capables de reconnaître<br/>presque n’importe qui n’importe où<br/>n’importe quand',
                textStyle: {...bodyText, align: 'center', fontSize: 14, },
            },
            background: backgroundFaces,
            transitions: transitions(),
        },
        {
            id: uuid(),
            layout: 'side',
            type: 'ranking',
            items: rankingItems,
            numbersStyle: {...header2, fontSize: 60, lineHeight: 0.9, color: { color: colorYellow } },
            background: backgroundBlueNoise,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type: 'title-subtitle-credits',
            layout: 'bottom',
            title: {
                body: 'Pourriez vous passer une semaine sans vous regarder dans le miroir?',
                textStyle: {...header2, color: { color: colorYellow }, fontSize: 40 },
            },
            subtitle: {
                body: 'On a tenté l’expérience et voici comment ça s’est déroulé',
                textStyle: {...bodyText, fontSize: 20 },
            },
            credits: {
                body: '<br/><br/>Par Hugo Meunier',
                textStyle: {...bodyText, fontSize: 14 },
            },
            background: backgroundHugoMirror,
            transitions: transitions(),
        },
        {
            id: uuid(),
            type: 'timeline',
            layout: 'normal',
            items: timelineItems,
            bulletColor: { color: colorYellow, alpha: 1 },
            lineColor: { color: '#fff', alpha: 1 },
            bulletFilled: true,
            background: backgroundBlackNoise,
            transitions: transitions(),
        },
    ],
};

export default faceAFaceStory;
