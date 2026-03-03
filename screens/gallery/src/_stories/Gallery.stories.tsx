/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    footer,
    header,
    headerFooter,
    images,
    transitions,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import GalleryScreen from '../Gallery';
import definition from '../definition';

const props = {
    images: images({ count: 20 }),
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/Gallery',
    component: GalleryScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryScreen),
    },
});

export const Placeholder = meta.story((args) => {
    return <GalleryScreen {...args} />;
});

export const Preview = meta.story((args) => {
    return <GalleryScreen {...args} {...props} />;
});

export const Static = meta.story((args) => {
    return <GalleryScreen {...args} {...props} />;
});

export const Capture = meta.story((args) => {
    return <GalleryScreen {...args} {...props} />;
});

export const Edit = meta.story((args) => {
    return <GalleryScreen {...args} />;
});

export const Normal = meta.story((args) => {
    return <GalleryScreen {...args} {...props} />;
});

export const WithHeaderFooter = meta.story((args) => {
    return <GalleryScreen {...args} {...headerFooter()} {...props} />;
});

export const WithHeader = meta.story((args) => {
    return <GalleryScreen {...args} header={header()} {...props} />;
});

export const WithFooter = meta.story((args) => {
    return <GalleryScreen {...args} footer={footer()} {...props} />;
});

export const Definition = meta.story((args) => {
    return <ScreenDefinition {...args} />;
});
