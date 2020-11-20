/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { images, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import GalleryFeedScreen from '../GalleryFeed';
import definition from '../definition';

const props = {
    images: images({ count: 5 }),
    background: background(),
};

export default {
    title: 'Screens/GalleryFeed',
    component: GalleryFeedScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryFeedScreen),
    },
};

export const Placeholder = (storyProps) => <GalleryFeedScreen {...storyProps} />;

export const Preview = (storyProps) => <GalleryFeedScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <GalleryFeedScreen {...storyProps} />;

export const Normal = (storyProps) => <GalleryFeedScreen {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
