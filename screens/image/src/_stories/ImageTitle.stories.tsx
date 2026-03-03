/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    headerFooter,
    imageMedia,
    title,
    transitions,
    videoMedia,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import ImageTitleScreen from '../ImageTitle';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: 'cover',
    title: { body: title() },
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/ImageTitle',
    component: ImageTitleScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageTitleScreen),
    },
});

export const Placeholder = meta.story((args) => <ImageTitleScreen {...args} />);

export const Preview = meta.story((args) => <ImageTitleScreen {...args} {...props} />);
export const Static = meta.story((args) => <ImageTitleScreen {...args} {...props} />);
export const Capture = meta.story((args) => <ImageTitleScreen {...args} {...props} />);

export const Edit = meta.story((args) => <ImageTitleScreen {...args} />);

export const Normal = meta.story((args) => <ImageTitleScreen {...args} {...props} />);
export const WithVideo = meta.story((args) => (
    <ImageTitleScreen {...args} {...props} image={videoMedia()} />
));

export const WithHeaderFooter = meta.story((args) => (
    <ImageTitleScreen {...args} {...props} {...headerFooter()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
