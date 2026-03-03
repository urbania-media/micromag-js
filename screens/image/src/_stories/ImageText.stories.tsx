/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    headerFooter,
    imageMedia,
    text,
    transitions,
    videoMedia,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import ImageTextScreen from '../ImageText';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: 'cover',
    text: text('verylong'),
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/ImageText',
    component: ImageTextScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageTextScreen),
    },
});

export const Placeholder = meta.story((args) => <ImageTextScreen {...args} />);

export const Preview = meta.story((args) => <ImageTextScreen {...args} {...props} />);
export const Static = meta.story((args) => <ImageTextScreen {...args} {...props} />);
export const Capture = meta.story((args) => <ImageTextScreen {...args} {...props} />);

export const Edit = meta.story((args) => <ImageTextScreen {...args} />);

export const Normal = meta.story((args) => <ImageTextScreen {...args} {...props} />);
export const WithVideo = meta.story((args) => (
    <ImageTextScreen {...args} {...props} image={videoMedia()} />
));

export const WithHeaderFooter = meta.story((args) => (
    <ImageTextScreen {...args} {...props} {...headerFooter()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
