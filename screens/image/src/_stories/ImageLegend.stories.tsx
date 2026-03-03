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

import ImageLegendScreen from '../ImageLegend';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: 'cover',
    legend: text(),
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/ImageLegend',
    component: ImageLegendScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageLegendScreen),
    },
});

export const Placeholder = meta.story((args) => <ImageLegendScreen {...args} />);

export const Preview = meta.story((args) => <ImageLegendScreen {...args} {...props} />);
export const Static = meta.story((args) => <ImageLegendScreen {...args} {...props} />);
export const Capture = meta.story((args) => <ImageLegendScreen {...args} {...props} />);

export const Edit = meta.story((args) => <ImageLegendScreen {...args} />);

export const Normal = meta.story((args) => <ImageLegendScreen {...args} {...props} />);
export const WithVideo = meta.story((args) => (
    <ImageLegendScreen {...args} {...props} image={videoMedia()} />
));

export const WithHeaderFooter = meta.story((args) => (
    <ImageLegendScreen {...args} {...props} {...headerFooter()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
