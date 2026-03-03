import { defineMessage } from 'react-intl';
import aquarius from '../images/aquarius.png';
import aries from '../images/aries.png';
import cancer from '../images/cancer.png';
import capricorn from '../images/capricorn.png';
import gemini from '../images/gemini.png';
import leo from '../images/leo.png';
import libra from '../images/libra.png';
import pisces from '../images/pisces.png';
import sagittarius from '../images/sagittarius.png';
import scorpio from '../images/scorpio.png';
import taurus from '../images/taurus.png';
import virgo from '../images/virgo.png';
import aquariusThumbnail from '../images/aquarius_small.png';
import ariesThumbnail from '../images/aries_small.png';
import cancerThumbnail from '../images/cancer_small.png';
import capricornThumbnail from '../images/capricorn_small.png';
import geminiThumbnail from '../images/gemini_small.png';
import leoThumbnail from '../images/leo_small.png';
import libraThumbnail from '../images/libra_small.png';
import piscesThumbnail from '../images/pisces_small.png';
import sagittariusThumbnail from '../images/sagittarius_small.png';
import scorpioThumbnail from '../images/scorpio_small.png';
import taurusThumbnail from '../images/taurus_small.png';
import virgoThumbnail from '../images/virgo_small.png';

export default [
    {
        id: 'aries',
        image: aries,
        thumbnail: ariesThumbnail,
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
        thumbnail: taurusThumbnail,
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
        thumbnail: geminiThumbnail,
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
        thumbnail: cancerThumbnail,
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
        thumbnail: leoThumbnail,
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
        thumbnail: virgoThumbnail,
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
        thumbnail: libraThumbnail,
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
        thumbnail: scorpioThumbnail,
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
        thumbnail: sagittariusThumbnail,
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
        thumbnail: capricornThumbnail,
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
        thumbnail: aquariusThumbnail,
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
        thumbnail: piscesThumbnail,
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
