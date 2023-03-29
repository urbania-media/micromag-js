import { imageMediaFromURL } from '../data';

import alex from './files/team/alex.jpg';
import cocog from './files/team/cocog.jpg';
import dmp from './files/team/dmp.jpg';
import fred from './files/team/fred.jpg';
import job from './files/team/job.jpg';
import maj from './files/team/maj.jpg';
import nrb from './files/team/nrb.jpg';

export default [
    {
        label: 'David Mongeau-Petitpas',
        visual: imageMediaFromURL(dmp),
        content: {
            body: '<p>David est un lorem ipsum dolor sit amet consectetur adipiscing</p>',
        },
        button: {
            label: { body: 'Clik hier' },
            url: 'http://google.com',
            inWebView: false,
            boxStyle: {
                backgroundColor: {
                    color: '#f2f',
                    alpha: 1,
                },
            },
        },
        largeVisual: imageMediaFromURL(dmp),
        buttonStyles: {
            layout: 'label-top',
            textStyle: {
                fontStyle: {
                    bold: true,
                    italic: false,
                    underline: false,
                },
                fontSize: 8,
            },
            boxStyle: {
                backgroundColor: {
                    color: '#23195c',
                    alpha: 1,
                },
                borderRadius: 10,
                padding: {
                    bottom: 5,
                },
            },
        },
    },
    {
        label: 'Marc-Antoine Jacques',
        visual: imageMediaFromURL(maj),
        content: {
            body: '<p>Marc-Antoine a toujours été dolor sit amet consectetur adipiscing elit, nunquam dolores. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est. Errare humanum est.</p>',
        },
        button: { label: { body: 'Clik there' }, url: 'https://urbania.ca', inWebView: true },
        largeVisual: imageMediaFromURL(maj),
    },
    {
        label: 'Nicolas Roy Bourdages',
        heading: {
            body: '@phatshambler',
            textStyle: {
                fontStyle: {
                    bold: true,
                    italic: false,
                    underline: false,
                },
                fontSize: 20,
            },
        },
        visual: imageMediaFromURL(nrb),
    },
    {
        label: 'Alexandre Lamarche',
        visual: imageMediaFromURL(alex),
    },
    {
        label: 'Corentin Guérin',
        visual: imageMediaFromURL(cocog),
    },
    {
        label: 'Joseph Blais',
        visual: imageMediaFromURL(job),
    },
    {
        label: 'Fred Mercy',
        visual: imageMediaFromURL(fred),
    },
    {
        label: 'Alexandre Lamarche',
        visual: imageMediaFromURL(alex),
    },
    {
        label: 'Corentin Guérin',
        visual: imageMediaFromURL(cocog),
    },
    {
        label: 'Joseph Blais',
        visual: imageMediaFromURL(job),
    },
    {
        label: 'Fred Mercy',
        visual: imageMediaFromURL(fred),
    },
    {
        label: 'Alexandre Lamarche',
        visual: imageMediaFromURL(alex),
    },
    {
        label: 'Corentin Guérin',
        visual: imageMediaFromURL(cocog),
    },
    {
        label: 'Joseph Blais',
        visual: imageMediaFromURL(job),
    },
    {
        label: 'Fred Mercy',
        visual: imageMediaFromURL(fred),
    },
    {
        label: 'Alexandre Lamarche',
        visual: imageMediaFromURL(alex),
    },
    {
        label: 'Corentin Guérin',
        visual: imageMediaFromURL(cocog),
    },
    {
        label: 'Joseph Blais',
        visual: imageMediaFromURL(job),
    },
    {
        label: 'David Mongeau-Petitpas',
        visual: imageMediaFromURL(dmp),
        content: {
            body: '<p>David est un lorem ipsum dolor sit amet consectetur adipiscing</p>',
        },
        button: {
            label: { body: 'Clik hier' },
            url: 'http://google.com',
            inWebView: false,
            boxStyle: {
                backgroundColor: {
                    color: '#f2f',
                    alpha: 1,
                },
            },
        },
        largeVisual: imageMediaFromURL(dmp),
        buttonStyles: {
            layout: 'label-top',
            textStyle: {
                fontStyle: {
                    bold: true,
                    italic: false,
                    underline: false,
                },
                fontSize: 8,
            },
            boxStyle: {
                backgroundColor: {
                    color: '#23195c',
                    alpha: 1,
                },
                borderRadius: 10,
                padding: {
                    bottom: 5,
                },
            },
        },
    },
    {
        label: 'Nicolas Roy Bourdages',
        heading: {
            body: '@phatshambler',
            textStyle: {
                fontStyle: {
                    bold: true,
                    italic: false,
                    underline: false,
                },
                fontSize: 20,
            },
        },
        visual: imageMediaFromURL(nrb),
    },
    {
        label: 'Bingus bongus dingus dongus',
        content: {
            body: '<p>bbbb ing  us, bong gus, lend me your ears.</p>',
        },
        heading: {
            body: 'bongus bingus dongus dingus',
        },
    },
];
