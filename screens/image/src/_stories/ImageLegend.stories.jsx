/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
    imageMedia,
    videoMedia,
    text,
    backgroundColor,
    transitions,
    callToAction,
} from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
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

export const WithCallToAction = (storyProps) => (
    <ImageLegendScreen {...storyProps} {...props} callToAction={callToAction()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
