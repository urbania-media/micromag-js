/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    footer,
    header,
    headerFooter,
    imageMedia,
    text,
    title,
    transitions,
    videoMedia,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import ImageTitleTextScreen from '../ImageTitleText';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: 'cover',
    title: { body: title() },
    text: text('short'),
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/ImageTitleText',
    component: ImageTitleTextScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageTitleTextScreen),
    },
});

export const Placeholder = meta.story((args) => <ImageTitleTextScreen {...args} />);

export const Preview = meta.story((args) => <ImageTitleTextScreen {...args} {...props} />);

export const Static = meta.story((args) => <ImageTitleTextScreen {...args} {...props} />);

export const Capture = meta.story((args) => <ImageTitleTextScreen {...args} {...props} />);

export const Edit = meta.story((args) => <ImageTitleTextScreen {...args} />);

export const Normal = meta.story((args) => <ImageTitleTextScreen {...args} {...props} />);

export const WithVideo = meta.story((args) => (
    <ImageTitleTextScreen {...args} {...props} image={videoMedia()} />
));

export const WithHeaderFooter = meta.story((args) => (
    <ImageTitleTextScreen {...args} {...props} {...headerFooter()} />
));

export const WithHeader = meta.story((args) => (
    <ImageTitleTextScreen {...args} {...props} header={header()} />
));

export const WithFooter = meta.story((args) => (
    <ImageTitleTextScreen {...args} {...props} footer={footer()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
