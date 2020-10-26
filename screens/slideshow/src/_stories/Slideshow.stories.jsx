/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { image, text, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Slideshow from '../Slideshow';
import definition from '../definition';

const props = {
    background: background(),
    slides: [
        {
            image: image({ width: 500, height: 250 }),
            text: text(),
        },
        {
            image: image({ width: 500, height: 400 }),
            text: text(),
        },
        {
            image: image({ width: 500, height: 500 }),
            text: text(),
        },
    ],
};

export default {
    title: 'Screens/Slideshow',
    component: Slideshow,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Slideshow {...storyProps} />;

export const Preview = (storyProps) => <Slideshow {...storyProps} />;

export const Edit = (storyProps) => <Slideshow {...storyProps} />;

export const Normal = (storyProps) => <Slideshow {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
