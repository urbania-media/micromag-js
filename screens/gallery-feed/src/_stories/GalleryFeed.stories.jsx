/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageWithRandomSize, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import GalleryFeed from '../GalleryFeed';
import definition from '../definition';

const props = {
    images: [...Array(5)].map(() => ({ image: imageWithRandomSize() })),
    background: background(),
};

export default {
    title: 'Screens/GalleryFeed',
    component: GalleryFeed,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryFeed),
    },
};

export const Placeholder = (storyProps) => <GalleryFeed {...storyProps} />;

export const Preview = (storyProps) => <GalleryFeed {...storyProps} {...props} />;

export const Edit = (storyProps) => <GalleryFeed {...storyProps} />;

export const Normal = (storyProps) => <GalleryFeed {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
