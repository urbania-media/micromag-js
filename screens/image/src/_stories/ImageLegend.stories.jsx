/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    imageMedia,
    videoMedia,
    text,
    backgroundColor,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import ImageLegendScreen from '../ImageLegend';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: 'cover',
    legend: text(),
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/ImageLegend',
    component: ImageLegendScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageLegendScreen),
    },
};

export const Placeholder = (storyProps) => <ImageLegendScreen {...storyProps} />;

export const Preview = (storyProps) => <ImageLegendScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <ImageLegendScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <ImageLegendScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageLegendScreen {...storyProps} />;

export const Normal = (storyProps) => <ImageLegendScreen {...storyProps} {...props} />;
export const WithVideo = (storyProps) => (
    <ImageLegendScreen {...storyProps} {...props} image={videoMedia()} />
);

export const WithHeaderFooter = (storyProps) => (
    <ImageLegendScreen {...storyProps} {...props} {...headerFooter()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
