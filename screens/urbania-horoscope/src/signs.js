import { defineMessage } from 'react-intl';
import aquarius from './images/aquarius.png';
import aries from './images/aries.png';
import cancer from './images/cancer.png';
import capricorn from './images/capricorn.png';
import gemini from './images/gemini.png';
import leo from './images/leo.png';
import libra from './images/libra.png';
import pisces from './images/pisces.png';
import sagittarius from './images/sagittarius.png';
import scorpio from './images/scorpio.png';
import taurus from './images/taurus.png';
import virgo from './images/virgo.png';

export default [
    {
        id: 'aries',
        image: aries,
        label: defineMessage({
            defaultMessage: 'Aries',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Mar 21 - Apr 19',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'taurus',
        image: taurus,
        label: defineMessage({
            defaultMessage: 'Taurus',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Apr 20 - May 20',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'gemini',
        image: gemini,
        label: defineMessage({
            defaultMessage: 'Gemini',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'May 21 - June 20',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'cancer',
        image: cancer,
        label: defineMessage({
            defaultMessage: 'Cancer',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'June 21 - July 22',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'leo',
        image: leo,
        label: defineMessage({
            defaultMessage: 'Leo',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'July 23 - Aug 22',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'virgo',
        image: virgo,
        label: defineMessage({
            defaultMessage: 'Virgo',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Aug 23 - Sept 22',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'libra',
        image: libra,
        label: defineMessage({
            defaultMessage: 'Libra',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Sept 23 - Oct 22',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'scorpio',
        image: scorpio,
        label: defineMessage({
            defaultMessage: 'Scorpio',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Oct 23 - Nov 22',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'sagittarius',
        image: sagittarius,
        label: defineMessage({
            defaultMessage: 'Sagittarius',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Nov 23 - Dec 21',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'capricorn',
        image: capricorn,
        label: defineMessage({
            defaultMessage: 'Capricorn',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Dec 22 - Jan 20',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'aquarius',
        image: aquarius,
        label: defineMessage({
            defaultMessage: 'Aquarius',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Jan 21 - Feb 18',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'pisces',
        image: pisces,
        label: defineMessage({
            defaultMessage: 'Pisces',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Feb 19 - Mar 20',
            description: 'Horoscope date',
        }),
    },
];
