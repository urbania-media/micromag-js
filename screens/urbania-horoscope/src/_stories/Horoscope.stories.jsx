/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    // text
    // title,
    imageMedia,
    backgroundVideo,
    transitions,
} from '../../../../.storybook/data';
import Horoscope from '../Horoscope';
import definition from '../definition';

const props = {
    // title: { body: 'Astrologie' },
    // description: text(),
    description: { body: 'Qu’est-ce que les planètes racontent sur vous cette semaine?' },

    author: {
        name: { body: 'Robert Léponge' },
        avatar: imageMedia(),
    },
    button: {
        body: 'Découvrir',
    },
    signs: [],
    background: backgroundVideo(),
    // popupBackground: { color: '#000F66', aplha: 1 },
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
