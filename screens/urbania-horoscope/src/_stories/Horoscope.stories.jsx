/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { defineMessage } from 'react-intl';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { text, title, imageMedia, backgroundVideo, transitions } from '../../../../.storybook/data';
import Horoscope from '../Horoscope';
import definition from '../definition';
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

const props = {
    description: { body: 'Qu’est-ce que les planètes racontent sur vous cette semaine?' },
    author: {
        name: { body: 'Robert Léponge' },
        avatar: imageMedia(),
    },
    button: {
        body: '<span>Découvrir</span>',
    },
    signs: [
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
            word: { body: title() },
            description: text('long'),
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
            word: { body: title() },
            description: text(),
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
                defaultMessage: 'June 23 - Aug 22',
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
    ],
    background: backgroundVideo(),
    // popupBackground: backgroundVideo(),
    transitions: transitions(),
};

export default {
    title: 'Urbania Screens/Horoscope',
    component: Horoscope,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Horoscope),
    },
};

export const Placeholder = (storyProps) => <Horoscope {...storyProps} />;

export const Preview = (storyProps) => <Horoscope {...storyProps} {...props} />;

export const Static = (storyProps) => <Horoscope {...storyProps} {...props} />;

export const Capture = (storyProps) => <Horoscope {...storyProps} {...props} />;

export const Edit = (storyProps) => <Horoscope {...storyProps} />;

export const Normal = (storyProps) => <Horoscope {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
