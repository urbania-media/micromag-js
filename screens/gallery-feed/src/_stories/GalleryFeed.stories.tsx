/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, images, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import GalleryFeedScreen from '../GalleryFeed';
import definition from '../definition';

const props = {
    images: images({ count: 5 }),
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/GalleryFeed',
    component: GalleryFeedScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryFeedScreen),
    },
});

export const Placeholder = meta.story((args) => <GalleryFeedScreen {...args} />);

export const Preview = meta.story((args) => <GalleryFeedScreen {...args} {...props} />);

export const Static = meta.story((args) => <GalleryFeedScreen {...args} {...props} />);

export const Capture = meta.story((args) => <GalleryFeedScreen {...args} {...props} />);

export const Edit = meta.story((args) => <GalleryFeedScreen {...args} />);

export const Normal = meta.story((args) => <GalleryFeedScreen {...args} {...props} />);

export const WithHeaderFooter = meta.story((args) => (
    <GalleryFeedScreen {...args} {...headerFooter()} {...props} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
