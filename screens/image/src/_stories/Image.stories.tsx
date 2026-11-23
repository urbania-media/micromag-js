/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    footer,
    header,
    headerFooter,
    imageMedia,
    transitions,
    videoMedia,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import ImageScreen from '../Image';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: 'cover',
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/Image',
    component: ImageScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageScreen),
    },
});

export const Placeholder = meta.story((args) => <ImageScreen {...args} />);

export const Preview = meta.story((args) => <ImageScreen {...args} {...props} />);

export const Static = meta.story((args) => <ImageScreen {...args} {...props} />);

export const Capture = meta.story((args) => <ImageScreen {...args} {...props} />);

export const Edit = meta.story((args) => <ImageScreen {...args} />);

export const Normal = meta.story((args) => <ImageScreen {...args} {...props} />);

export const WithVideo = meta.story((args) => (
    <ImageScreen {...args} {...props} image={videoMedia()} />
));

export const WithHeaderFooter = meta.story((args) => (
    <ImageScreen {...args} {...headerFooter()} {...props} />
));

export const WithHeader = meta.story((args) => (
    <ImageScreen {...args} header={header()} {...props} />
));

export const WithFooter = meta.story((args) => (
    <ImageScreen {...args} footer={footer()} {...props} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
