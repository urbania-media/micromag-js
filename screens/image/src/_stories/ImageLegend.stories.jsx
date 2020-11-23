/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageMedia, text, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import ImageLegendScreen from '../ImageLegend';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: { fit: 'cover' },
    legend: text(),
    background: background(),
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

export const Edit = (storyProps) => <ImageLegendScreen {...storyProps} />;

export const Normal = (storyProps) => <ImageLegendScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
