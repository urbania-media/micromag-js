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
        visual: imageMediaFromURL(dmp)
    },
    {
        label: 'Marc-Antoine Jacques',
        visual: imageMediaFromURL(maj)
    },
    {
        label: 'Nicolas Roy Bourdages',
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
