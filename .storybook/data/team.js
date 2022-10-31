import { imageMediaFromURL } from '../data';
import dmp from './files/team/dmp.jpg';
import nrb from './files/team/nrb.jpg';
import maj from './files/team/maj.jpg';
import alex from './files/team/alex.jpg';
import cocog from './files/team/cocog.jpg';
import job from './files/team/job.jpg';
import fred from './files/team/fred.jpg';

export default [
    {
        label: 'David Mongeau-Petitpas',
        visual: imageMediaFromURL(dmp),
        content: {
            body: '<p>David est un lorem ipsum dolor sit amet consectetur adipiscing</p>'
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
            body: '<p>Marc-Antoine a toujours été dolor sit amet consectetur adipiscing elit, nunquam dolores. Errare humanum est.</p>'
        },
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
            }
        },
        visual: imageMediaFromURL(nrb)
    },
    {
        label: 'Alexandre Lamarche',
        visual: imageMediaFromURL(alex)
    },
    {
        label: 'Corentin Guérin',
        visual: imageMediaFromURL(cocog)
    },
    {
        label: 'Joseph Blais',
        visual: imageMediaFromURL(job)
    },
    {
        label:  'Fred Mercy',
        visual: imageMediaFromURL(fred)
    },
];
