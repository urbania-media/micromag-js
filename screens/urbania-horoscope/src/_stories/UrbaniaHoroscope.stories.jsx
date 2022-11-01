/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { imageMedia, backgroundVideo, transitions } from '../../../../.storybook/data';
import UrbaniaHoroscope from '../UrbaniaHoroscope';
import definition from '../definition';
import signs from '../../../../.storybook/data/signs';

const props = {
    description: { body: 'Qu’est-ce que les planètes racontent sur vous cette semaine?' },
    author: {
        name: { body: 'Robert Léponge' },
        avatar: imageMedia(),
    },
    button: {
        body: '<span>Découvrir</span>',
    },
    signs,
    background: backgroundVideo(),
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
