/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { images, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import GalleryFeed from '../GalleryFeed';
import definition from '../definition';

const props = {
    images: images({ width: 500, height: Math.random() > 0.5 ? 300 : 200, count: 20 }),
    background: background(),
};

const smallProps = {
    images: images({ width: 150, height: 100, count: 20 }),
    background: background(),
};

export default {
    title: 'Screens/GalleryFeed',
    component: GalleryFeed,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <GalleryFeed {...storyProps} />;

export const Preview = (storyProps) => <GalleryFeed {...storyProps} />;

export const Edit = (storyProps) => <GalleryFeed {...storyProps} />;

export const Normal = (storyProps) => <GalleryFeed {...storyProps} {...props} />;
export const Small = (storyProps) => <GalleryFeed {...storyProps} {...smallProps} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
