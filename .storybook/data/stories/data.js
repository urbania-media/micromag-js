import { v1 as uuid } from 'uuid';

import { header2, header3, bodyText } from './styles';
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
            textStyle: header3,
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
            textStyle: header3,
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
            textStyle: header3,
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
            textStyle: header3,
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
            textStyle: header3,
        },
    },
];

export const survey1options = [
    {
        id: uuid(),
        label: {
            body: 'Mes yeux',
            textStyle: header3,
        },
        percent: 10,
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Mon nez',
        },
        percent: 20,
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Mes Oreilles',
        },
        percent: 12.5,
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Ma bouche',
        },
        percent: 5,
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Rien du tout',
        },
        percent: 15,
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'autre',
        },
        percent: 37.5,
    },
];

export const quiz1options = [
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Deux minutes, pareil comme dans le film Face/Off',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Deux heures et demi',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '18 heures',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '36 heures',
        },
    },
];

export const quiz2options = [
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '1',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '2',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '3',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '4',
        },
    },
];

export const quiz3options = [
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Une à deux fois plus',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '5 fois plus',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '1000 fois plus',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '10 à 100 fois plus',
        },
    },
];

export const quiz4options = [
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Un sourire Colgate',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Un sourire de Pan Am',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Un sourire de faux cul',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: 'Un hide the pain Harold',
        },
    },
];

export const quiz5options = [
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '307 000',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '1364',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '1.5 millions',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '229',
        },
    },
];

export const quiz6options = [
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '2 millions',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '75 000',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '300 000',
        },
    },
    {
        id: uuid(),
        label: {
            textStyle: header3,
            body: '200 millions',
        },
    },
];

export const rankingItems = [
    {
        title: {
            textStyle: header2,
            body: 'On naît super-recognizer, on ne le devient pas',
        },
        description: {
            textStyle: bodyText,
            body:
                'Eh oui, on ne voulait pas anéantir vos espoirs de développer un super pouvoir comme ça, mais c’est un fait. On est super héros ou on ne l’est pas.',
        },
    },
    {
        title: {
            textStyle: header2,
            body: 'On peut se spécialiser dans une certaine physionomie (ou couleur) de visage',
        },
        description: {
            textStyle: bodyText,
            body:
                'Quelqu’un a dit profilage? C’est tout de même le cas de certains super-recognizers s’entraînent à reconnaître des suspects d’une certaine origine ethnique',
        },
    },
    {
        title: {
            textStyle: header2,
            body: 'Il faut viser le centre',
        },
        description: {
            textStyle: bodyText,
            body:
                'Oubliez les yeux, les nez ou les signes distinctifs. Pour absorber le visage de quelqu’un, il faut se concentrer sur un point juste au-dessus du nez.',
        },
    },
];

export const timelineItems = [
    {
        title: {
            textStyle: header2,
            body: 'Jour 1',
        },
        description: {
            textStyle: bodyText,
            body:
                'Je masque tous les miroirs de ma maison. Je réalise alors à la dure à quel point on se regarde toujours un peu – même à la dérobée – en allant pisser, en se brossant les dents, en enfilant des vêtements. J’ai même dû détourner les yeux en me lavant, pour éviter mon reflet dans la porte de ma douche. Ne pas tricher est ma devise. Je survis à une séance de gym sans me voir.',
        },
    },
    {
        title: {
            textStyle: header2,
            body: 'Jour 2',
        },
        description: {
            textStyle: bodyText,
            body:
                'La journée se passe bien. Je suis peut-être moins imbu de moi-même que je pensais. Même si je m’arrange encore comme en 1993, j’ai toujours été quand même soucieux de mon apparence. Je ne suis pas fâché de réaliser que je peux vivre sans me voir la face.',
        },
    },
    {
        title: {
            textStyle: header2,
            body: 'Jour 3',
        },
        description: {
            textStyle: bodyText,
            body:
                'J’emprunte la voiture de ma collègue Jasmine. Comme j’ai cinq ans, je décide de prendre un selfie dans son char. Je ne le réalise pas sur le coup, mais je viens d’enfreindre ma seule règle : ne pas me voir. Ce sera la seule fois de la semaine.',
        },
    },
    {
        title: {
            textStyle: header2,
            body: 'Jour 4',
        },
        description: {
            textStyle: bodyText,
            body:
                'Ma blonde Martine soulève le rideau recouvrant le miroir pour se pomponner avant d’aller enseigner. Un bon moyen de ne pas avoir l’air maquillé comme un char volé, comme dirait une amie. Elle avoue avoir négligé ses cheveux cette semaine à cause de cette mission farfelue que je nous impose.',
        },
    },
    {
        title: {
            textStyle: header2,
            body: 'Jour 5',
        },
        description: {
            textStyle: bodyText,
            body:
                'Je pars pour la fin de semaine dans un chalet avec des amis. C’est facile de résister à l’attrait des miroirs quand tu passes deux jours en mou à jouer à Cranium avec une hygiène discutable.',
        },
    },
    {
        title: {
            textStyle: header2,
            body: 'Resultat',
        },
        description: {
            textStyle: bodyText,
            body:
                'En rentrant chez moi le dimanche par contre, j’avais hâte de renouer avec mon visage. Déception. J’étais pareil, juste mal rasé et hangover de ma fin de semaine au chalet. Le buzz de me revoir aura duré 10 secondes, et j’étais à nouveau en train de chialer sur mon poids.',
        },
    },
];
