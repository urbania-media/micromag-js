/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { defineMessage } from 'react-intl';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { text, title, imageMedia, backgroundVideo, transitions } from '../../../../.storybook/data';
import UrbaniaHoroscope from '../UrbaniaHoroscope';
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
    ],
    background: backgroundVideo(),
    // popupBackground: backgroundVideo(),
    transitions: transitions(),
};

export default {
    title: 'Urbania Screens/UrbaniaHoroscope',
    component: UrbaniaHoroscope,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === UrbaniaHoroscope),
    },
};

export const Placeholder = (storyProps) => <UrbaniaHoroscope {...storyProps} />;

export const Preview = (storyProps) => <UrbaniaHoroscope {...storyProps} {...props} />;

export const Static = (storyProps) => <UrbaniaHoroscope {...storyProps} {...props} />;

export const Capture = (storyProps) => <UrbaniaHoroscope {...storyProps} {...props} />;

export const Edit = (storyProps) => <UrbaniaHoroscope {...storyProps} />;

export const Normal = (storyProps) => <UrbaniaHoroscope {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
