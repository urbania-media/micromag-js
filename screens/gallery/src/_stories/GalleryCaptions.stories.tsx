/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, imagesWithCaptions, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import GalleryCaptionsScreen from '../GalleryCaptions';
import definition from '../definition';

const props = {
    images: imagesWithCaptions({ count: 20 }),
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/GalleryCaptions',
    component: GalleryCaptionsScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryCaptionsScreen),
    },
});

export const Placeholder = meta.story((args) => {
    return <GalleryCaptionsScreen {...args} />;
});

export const Preview = meta.story((args) => {
    return <GalleryCaptionsScreen {...args} {...props} />;
});

export const Static = meta.story((args) => {
    return <GalleryCaptionsScreen {...args} {...props} />;
});

export const Capture = meta.story((args) => {
    return <GalleryCaptionsScreen {...args} {...props} />;
});

export const Edit = meta.story((args) => {
    return <GalleryCaptionsScreen {...args} />;
});

export const Normal = meta.story((args) => {
    return <GalleryCaptionsScreen {...args} {...props} />;
});

export const WithHeaderFooter = meta.story((args) => {
    return <GalleryCaptionsScreen {...args} {...headerFooter()} {...props} />;
});

export const Definition = meta.story((args) => {
    return <ScreenDefinition {...args} />;
});
