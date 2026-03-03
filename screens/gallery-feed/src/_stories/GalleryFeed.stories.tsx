/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { images, backgroundColor, transitions, headerFooter } from '../../../../.storybook/data';
import GalleryFeedScreen from '../GalleryFeed';
import definition from '../definition';

const props = {
    images: images({ count: 5 }),
    background: backgroundColor(),
    transitions: transitions(),
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

export const Static = (storyProps) => <GalleryFeedScreen {...storyProps} {...props} />;

export const Capture = (storyProps) => <GalleryFeedScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <GalleryFeedScreen {...storyProps} />;

export const Normal = (storyProps) => <GalleryFeedScreen {...storyProps} {...props} />;

export const WithHeaderFooter = (storyProps) => (
    <GalleryFeedScreen {...storyProps} {...headerFooter()} {...props} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
