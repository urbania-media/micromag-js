import { v1 as uuid } from 'uuid';

import tommyBefore from './assets-face-a-face/tommy-before.jpg';
import man1 from './assets-face-a-face/1.jpg';
import man2 from './assets-face-a-face/2.jpg';
import man3 from './assets-face-a-face/3.jpg';
import man4 from './assets-face-a-face/4.jpg';
import man5 from './assets-face-a-face/5.jpg';

export const tommy = {
    media: {
        url: tommyBefore,
        metadata: {
            width: 1000,
            height: 645,
        },
    },
};

export const mans = [
    {
        image: {
            media: {
                url: man1,
                metadata: {
                    width: 1000,
                    height: 1340,
                },
            },
        },
        legend: {
            body: 'Vous auriez pu ressembler à ceci, il y a 3-4 millions d’années',
        },
    },
    {
        image: {
            media: {
                url: man2,
                metadata: {
                    width: 1000,
                    height: 1340,
                },
            },
        },
        legend: {
            body: 'Retrouvez-vous des airs de famille dans votre ancêtre Homo Erectus?',
        },
    },
    {
        image: {
            media: {
                url: man3,
                metadata: {
                    width: 1000,
                    height: 1340,
                },
            },
        },
        legend: {
            body:
                'L’homme de Néandertal est disparu il y a 30 000 ans, mais il reste encore un peu de lui dans votre ADN',
        },
    },
    {
        image: {
            media: {
                url: man4,
                metadata: {
                    width: 1000,
                    height: 1340,
                },
            },
        },
        legend: {
            body: 'Remerciez la sélection naturelle pour votre beau menton d’Homo Sapiens',
        },
    },
    {
        image: {
            media: {
                url: man5,
                metadata: {
                    width: 1000,
                    height: 1340,
                },
            },
        },
        legend: {
            body:
                'À quoi va-t-on ressembler dans 100 000 ans? Grosse tête? Gros yeux? Pigmentation adaptée aux changements climatiques? Les paris sont ouverts!',
        },
    },
];

export const survey1options = [
    {
        id: uuid(),
        label: {
            body: 'Mes yeux',
        },
        percent: 10,
    },
    {
        id: uuid(),
        label: {
            body: 'Mon nez',
        },
        percent: 20,
    },
    {
        id: uuid(),
        label: {
            body: 'Mes Oreilles',
        },
        percent: 12.5,
    },
    {
        id: uuid(),
        label: {
            body: 'Ma bouche',
        },
        percent: 5,
    },
    {
        id: uuid(),
        label: {
            body: 'Rien du tout',
        },
        percent: 15,
    },
    {
        id: uuid(),
        label: {
            body: 'autre',
        },
        percent: 37.5,
    },
];

export const quiz1options = [
    {
        id: uuid(),
        label: {
            body: 'Deux minutes, pareil comme dans le film Face/Off',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: 'Deux heures et demi',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '18 heures',
        },
        answer: true,
    },
    {
        id: uuid(),
        label: {
            body: '36 heures',
        },
        answer: false,
    },
];

export const quiz2options = [
    {
        id: uuid(),
        label: {
            body: '1',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '2',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '3',
        },
        answer: true,
    },
    {
        id: uuid(),
        label: {
            body: '4',
        },
        answer: false,
    },
];

export const quiz3options = [
    {
        id: uuid(),
        label: {
            body: 'Une à deux fois plus',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '5 fois plus',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '1000 fois plus',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '10 à 100 fois plus',
        },
        answer: true,
    },
];

export const quiz4options = [
    {
        id: uuid(),
        label: {
            body: 'Un sourire Colgate',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: 'Un sourire de Pan Am',
        },
        answer: true,
    },
    {
        id: uuid(),
        label: {
            body: 'Un sourire de faux cul',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: 'Un hide the pain Harold',
        },
        answer: false,
    },
];

export const quiz5options = [
    {
        id: uuid(),
        label: {
            body: '307 000',
        },
        answer: true,
    },
    {
        id: uuid(),
        label: {
            body: '1364',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '1.5 millions',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '229',
        },
        answer: false,
    },
];

export const quiz6options = [
    {
        id: uuid(),
        label: {
            body: '2 millions',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '75 000',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '300 000',
        },
        answer: false,
    },
    {
        id: uuid(),
        label: {
            body: '200 millions',
        },
        answer: true,
    },
];

export const timelineItems = [
    {
        title: 'Jour 1',
        body:
            'Je masque tous les miroirs de ma maison. Je réalise alors à la dure à quel point on se regarde toujours un peu – même à la dérobée – en allant pisser, en se brossant les dents, en enfilant des vêtements. J’ai même dû détourner les yeux en me lavant, pour éviter mon reflet dans la porte de ma douche. Ne pas tricher est ma devise. Je survis à une séance de gym sans me voir.',
    },
    {
        title: 'Jour 2',
        body:
            'La journée se passe bien. Je suis peut-être moins imbu de moi-même que je pensais. Même si je m’arrange encore comme en 1993, j’ai toujours été quand même soucieux de mon apparence. Je ne suis pas fâché de réaliser que je peux vivre sans me voir la face.',
    },
    {
        title: 'Jour 3',
        body:
            'J’emprunte la voiture de ma collègue Jasmine. Comme j’ai cinq ans, je décide de prendre un selfie dans son char. Je ne le réalise pas sur le coup, mais je viens d’enfreindre ma seule règle : ne pas me voir. Ce sera la seule fois de la semaine.',
    },
    {
        title: 'Jour 4',
        body:
            'Ma blonde Martine soulève le rideau recouvrant le miroir pour se pomponner avant d’aller enseigner. Un bon moyen de ne pas avoir l’air maquillé comme un char volé, comme dirait une amie. Elle avoue avoir négligé ses cheveux cette semaine à cause de cette mission farfelue que je nous impose.',
    },
    {
        title: 'Jour 5',
        body:
            'Je pars pour la fin de semaine dans un chalet avec des amis. C’est facile de résister à l’attrait des miroirs quand tu passes deux jours en mou à jouer à Cranium avec une hygiène discutable.',
    },
    {
        title: 'Resultat',
        body:
            'En rentrant chez moi le dimanche par contre, j’avais hâte de renouer avec mon visage. Déception. J’étais pareil, juste mal rasé et hangover de ma fin de semaine au chalet. Le buzz de me revoir aura duré 10 secondes, et j’étais à nouveau en train de chialer sur mon poids.',
    },
];
