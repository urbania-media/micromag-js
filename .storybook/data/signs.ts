import { defineMessage } from 'react-intl'
import { text, title } from '../data';

import aquarius from './files/signs/aquarius.png';
import aries from './files/signs/aries.png';
import cancer from './files/signs/cancer.png';
import capricorn from './files/signs/capricorn.png';
import gemini from './files/signs/gemini.png';
import leo from './files/signs/leo.png';
import libra from './files/signs/libra.png';
import pisces from './files/signs/pisces.png';
import sagittarius from './files/signs/sagittarius.png';
import scorpio from './files/signs/scorpio.png';
import taurus from './files/signs/taurus.png';
import virgo from './files/signs/virgo.png';

export default [
    {
        id: 'aries',
        image: aries,
        label: defineMessage({
            defaultMessage: 'Aries',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Mar 21 - Apr 19',
            description: 'UrbaniaHoroscope date',
        }),
        word: { body: title() },
        description: text('long'),
    },
    {
        id: 'taurus',
        image: taurus,
        label: defineMessage({
            defaultMessage: 'Taurus',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Apr 20 - May 20',
            description: 'UrbaniaHoroscope date',
        }),
        word: { body: title() },
        description: text(),
    },
    {
        id: 'gemini',
        image: gemini,
        label: defineMessage({
            defaultMessage: 'Gemini',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'May 21 - June 20',
            description: 'UrbaniaHoroscope date',
        }),
        description: text(),
    },
    {
        id: 'cancer',
        image: cancer,
        label: defineMessage({
            defaultMessage: 'Cancer',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'June 21 - July 22',
            description: 'UrbaniaHoroscope date',
        }),
        description: text(),
    },
    {
        id: 'leo',
        image: leo,
        label: defineMessage({
            defaultMessage: 'Leo',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'June 23 - Aug 22',
            description: 'UrbaniaHoroscope date',
        }),
        description: text(),
    },
    {
        id: 'virgo',
        image: virgo,
        label: defineMessage({
            defaultMessage: 'Virgo',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Aug 23 - Sept 22',
            description: 'UrbaniaHoroscope date',
        }),
    },
    {
        id: 'libra',
        image: libra,
        label: defineMessage({
            defaultMessage: 'Libra',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Sept 23 - Oct 22',
            description: 'UrbaniaHoroscope date',
        }),
    },
    {
        id: 'scorpio',
        image: scorpio,
        label: defineMessage({
            defaultMessage: 'Scorpio',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Oct 23 - Nov 22',
            description: 'UrbaniaHoroscope date',
        }),
    },
    {
        id: 'sagittarius',
        image: sagittarius,
        label: defineMessage({
            defaultMessage: 'Sagittarius',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Nov 23 - Dec 21',
            description: 'UrbaniaHoroscope date',
        }),
    },
    {
        id: 'capricorn',
        image: capricorn,
        label: defineMessage({
            defaultMessage: 'Capricorn',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Dec 22 - Jan 20',
            description: 'UrbaniaHoroscope date',
        }),
    },
    {
        id: 'aquarius',
        image: aquarius,
        label: defineMessage({
            defaultMessage: 'Aquarius',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Jan 21 - Feb 18',
            description: 'UrbaniaHoroscope date',
        }),
    },
    {
        id: 'pisces',
        image: pisces,
        label: defineMessage({
            defaultMessage: 'Pisces',
            description: 'UrbaniaHoroscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Feb 19 - Mar 20',
            description: 'UrbaniaHoroscope date',
        }),
    },
];
