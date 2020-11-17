import { v1 as uuid } from 'uuid';

// import { descriptionText } from './styles';
import tommyBefore from './assets-face-a-face/tommy-before.jpg';
import man1 from './assets-face-a-face/1.jpg';
import man2 from './assets-face-a-face/2.jpg';
import man3 from './assets-face-a-face/3.jpg';
import man4 from './assets-face-a-face/4.jpg';
import man5 from './assets-face-a-face/5.jpg';

export const descriptionText = {
    fontFamily: 'Apercu',
    fontSize: 16,
    fontStyle: {
        bold: false,
    },
};

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
                    width: 500,
                    height: 670,
                },
            },
        },
        legend: {
            body: 'Vous auriez pu ressembler à ceci, il y a 3-4 millions d’années',
            textStyle: descriptionText,
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
            textStyle: descriptionText,
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
            textStyle: descriptionText,
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
            textStyle: descriptionText,
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
            textStyle: descriptionText,
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
    },
    {
        id: uuid(),
        label: {
            body: 'Deux heures et demi',
        },
    },
    {
        id: uuid(),
        label: {
            body: '18 heures',
        },
    },
    {
        id: uuid(),
        label: {
            body: '36 heures',
        },
    },
];

export const quiz2options = [
    {
        id: uuid(),
        label: {
            body: '1',
        },
    },
    {
        id: uuid(),
        label: {
            body: '2',
        },
    },
    {
        id: uuid(),
        label: {
            body: '3',
        },
    },
    {
        id: uuid(),
        label: {
            body: '4',
        },
    },
];

export const quiz3options = [
    {
        id: uuid(),
        label: {
            body: 'Une à deux fois plus',
        },
    },
    {
        id: uuid(),
        label: {
            body: '5 fois plus',
        },
    },
    {
        id: uuid(),
        label: {
            body: '1000 fois plus',
        },
    },
    {
        id: uuid(),
        label: {
            body: '10 à 100 fois plus',
        },
    },
];

export const quiz4options = [
    {
        id: uuid(),
        label: {
            body: 'Un sourire Colgate',
        },
    },
    {
        id: uuid(),
        label: {
            body: 'Un sourire de Pan Am',
        },
    },
    {
        id: uuid(),
        label: {
            body: 'Un sourire de faux cul',
        },
    },
    {
        id: uuid(),
        label: {
            body: 'Un hide the pain Harold',
        },
    },
];

export const quiz5options = [
    {
        id: uuid(),
        label: {
            body: '307 000',
        },
    },
    {
        id: uuid(),
        label: {
            body: '1364',
        },
    },
    {
        id: uuid(),
        label: {
            body: '1.5 millions',
        },
    },
    {
        id: uuid(),
        label: {
            body: '229',
        },
    },
];

export const quiz6options = [
    {
        id: uuid(),
        label: {
            body: '2 millions',
        },
    },
    {
        id: uuid(),
        label: {
            body: '75 000',
        },
    },
    {
        id: uuid(),
        label: {
            body: '300 000',
        },
    },
    {
        id: uuid(),
        label: {
            body: '200 millions',
        },
    },
];

export const rankingItems = [
    {
        title: { body: 'On naît super-recognizer, on ne le devient pas' },
        description: {
            body:
                'Eh oui, on ne voulait pas anéantir vos espoirs de développer un super pouvoir comme ça, mais c’est un fait. On est super héros ou on ne l’est pas.',
        },
    },
    {
        title: {
            body: 'On peut se spécialiser dans une certaine physionomie (ou couleur) de visage',
        },
        description: {
            body:
                'Quelqu’un a dit profilage? C’est tout de même le cas de certains super-recognizers s’entraînent à reconnaître des suspects d’une certaine origine ethnique',
        },
    },
    {
        title: { body: 'Il faut viser le centre' },
        description: {
            body:
                'Oubliez les yeux, les nez ou les signes distinctifs. Pour absorber le visage de quelqu’un, il faut se concentrer sur un point juste au-dessus du nez.',
        },
    },
];

export const timelineItems = [
    {
        title: { body: 'Jour 1' },
        description: {
            body:
                'Je masque tous les miroirs de ma maison. Je réalise alors à la dure à quel point on se regarde toujours un peu – même à la dérobée – en allant pisser, en se brossant les dents, en enfilant des vêtements. J’ai même dû détourner les yeux en me lavant, pour éviter mon reflet dans la porte de ma douche. Ne pas tricher est ma devise. Je survis à une séance de gym sans me voir.',
        },
    },
    {
        title: { body: 'Jour 2' },
        description: {
            body:
                'La journée se passe bien. Je suis peut-être moins imbu de moi-même que je pensais. Même si je m’arrange encore comme en 1993, j’ai toujours été quand même soucieux de mon apparence. Je ne suis pas fâché de réaliser que je peux vivre sans me voir la face.',
        },
    },
    {
        title: { body: 'Jour 3' },
        description: {
            body:
                'J’emprunte la voiture de ma collègue Jasmine. Comme j’ai cinq ans, je décide de prendre un selfie dans son char. Je ne le réalise pas sur le coup, mais je viens d’enfreindre ma seule règle : ne pas me voir. Ce sera la seule fois de la semaine.',
        },
    },
    {
        title: { body: 'Jour 4' },
        description: {
            body:
                'Ma blonde Martine soulève le rideau recouvrant le miroir pour se pomponner avant d’aller enseigner. Un bon moyen de ne pas avoir l’air maquillé comme un char volé, comme dirait une amie. Elle avoue avoir négligé ses cheveux cette semaine à cause de cette mission farfelue que je nous impose.',
        },
    },
    {
        title: { body: 'Jour 5' },
        description: {
            body:
                'Je pars pour la fin de semaine dans un chalet avec des amis. C’est facile de résister à l’attrait des miroirs quand tu passes deux jours en mou à jouer à Cranium avec une hygiène discutable.',
        },
    },
    {
        title: { body: 'Resultat' },
        description: {
            body:
                'En rentrant chez moi le dimanche par contre, j’avais hâte de renouer avec mon visage. Déception. J’étais pareil, juste mal rasé et hangover de ma fin de semaine au chalet. Le buzz de me revoir aura duré 10 secondes, et j’étais à nouveau en train de chialer sur mon poids.',
        },
    },
];
