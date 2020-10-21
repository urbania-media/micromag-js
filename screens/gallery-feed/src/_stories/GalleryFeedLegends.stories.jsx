/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageWithRandomSize, background, text } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import GalleryFeedLegends from '../GalleryFeedLegends';
import definition from '../definition';

const props = {
    images: [...Array(5)].map(() => ({ image: imageWithRandomSize(), legend: text() })),
    background: background(),
};

export default {
    title: 'Screens/GalleryFeedLegends',
    component: GalleryFeedLegends,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryFeedLegends),
    },
};

export const Placeholder = (storyProps) => <GalleryFeedLegends {...storyProps} />;

export const Preview = (storyProps) => <GalleryFeedLegends {...storyProps} {...props} />;

export const Edit = (storyProps) => <GalleryFeedLegends {...storyProps} />;

export const Normal = (storyProps) => <GalleryFeedLegends {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
