/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { images, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import GalleryFeedLegendsScreen from '../GalleryFeedLegends';
import definition from '../definition';

const props = {
    images: images({count: 5}),
    background: background(),
};

export default {
    title: 'Screens/GalleryFeedLegends',
    component: GalleryFeedLegendsScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryFeedLegendsScreen),
    },
};

export const Placeholder = (storyProps) => <GalleryFeedLegendsScreen {...storyProps} />;

export const Preview = (storyProps) => <GalleryFeedLegendsScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <GalleryFeedLegendsScreen {...storyProps} />;

export const Normal = (storyProps) => <GalleryFeedLegendsScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
