/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { images, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Gallery from '../Gallery';
import definition from '../definition';

const props = {
    images: images({ count: 20 }),
    background: background(),
};

export default {
    title: 'Screens/Gallery',
    component: Gallery,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Gallery {...storyProps} />;

export const Preview = (storyProps) => <Gallery {...storyProps} />;

export const Edit = (storyProps) => <Gallery {...storyProps} />;

export const Normal = (storyProps) => <Gallery {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;