/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, imagesWithCaptions, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import GalleryFeedCaptionsScreen from '../GalleryFeedCaptions';
import definition from '../definition';

const props = {
    images: imagesWithCaptions({ count: 5 }),
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/GalleryFeedCaptions',
    component: GalleryFeedCaptionsScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryFeedCaptionsScreen),
    },
});

export const Placeholder = meta.story((args) => <GalleryFeedCaptionsScreen {...args} />);

export const Preview = meta.story((args) => <GalleryFeedCaptionsScreen {...args} {...props} />);

export const Static = meta.story((args) => <GalleryFeedCaptionsScreen {...args} {...props} />);

export const Capture = meta.story((args) => <GalleryFeedCaptionsScreen {...args} {...props} />);

export const Edit = meta.story((args) => <GalleryFeedCaptionsScreen {...args} />);

export const Normal = meta.story((args) => <GalleryFeedCaptionsScreen {...args} {...props} />);

export const WithHeaderFooter = meta.story((args) => (
    <GalleryFeedCaptionsScreen {...args} {...headerFooter()} {...props} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
