/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { image, text, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import SlideshowScreen from '../Slideshow';
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
    title: 'Screens/Slideshow (TODO)',
    component: SlideshowScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <SlideshowScreen {...storyProps} />;

export const Preview = (storyProps) => <SlideshowScreen {...storyProps} />;

export const Edit = (storyProps) => <SlideshowScreen {...storyProps} />;

export const Normal = (storyProps) => <SlideshowScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
