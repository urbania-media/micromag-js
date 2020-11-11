/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageWithRandomSize, text, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import ImageLegend from '../ImageLegend';
import definition from '../definition';

const props = {
    image: {...imageWithRandomSize(), objectFit: { fit: 'cover' }},
    legend: text(),
    background: background(),
};

export default {
    title: 'Screens/ImageLegend',
    component: ImageLegend,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageLegend),
    },
};

export const Placeholder = (storyProps) => <ImageLegend {...storyProps} />;

export const Preview = (storyProps) => <ImageLegend {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageLegend {...storyProps} />;

export const Normal = (storyProps) => <ImageLegend {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
