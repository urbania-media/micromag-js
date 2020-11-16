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
        media: {
            url: man1,
            metadata: {
                width: 1000,
                height: 1340,
            },
            legend: {
                body: 'Vous auriez pu ressembler à ceci, il y a 3-4 millions d’années',
            },
        },
    },
    {
        media: {
            url: man2,
            metadata: {
                width: 1000,
                height: 1340,
            },
            legend: {
                body: 'Retrouvez-vous des airs de famille dans votre ancêtre Homo Erectus?',
            },
        },
    },
    {
        media: {
            url: man3,
            metadata: {
                width: 1000,
                height: 1340,
            },
            legend: {
                body:
                    'L’homme de Néandertal est disparu il y a 30 000 ans, mais il reste encore un peu de lui dans votre ADN',
            },
        },
    },
    {
        media: {
            url: man4,
            metadata: {
                width: 1000,
                height: 1340,
            },
            legend: {
                body: 'Remerciez la sélection naturelle pour votre beau menton d’Homo Sapiens',
            },
        },
    },
    {
        media: {
            url: man5,
            metadata: {
                width: 1000,
                height: 1340,
            },
            legend: {
                body: 'À quoi va-t-on ressembler dans 100 000 ans? Grosse tête? Gros yeux? Pigmentation adaptée aux changements climatiques? Les paris sont ouverts!',
            },
        },
    },
];
