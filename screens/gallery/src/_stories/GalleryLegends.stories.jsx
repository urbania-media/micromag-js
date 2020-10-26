/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { images, background, text } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import GalleryLegends from '../GalleryLegends';
import definition from '../definition';

const props = {
    images: images({ count: 20 }).map( image => ({...image, legend: text() })),
    background: background(),
};

export default {
    title: 'Screens/GalleryLegends',
    component: GalleryLegends,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryLegends),
    },
};

export const Placeholder = (storyProps) => <GalleryLegends {...storyProps} />;

export const Preview = (storyProps) => <GalleryLegends {...storyProps} {...props} />;

export const Edit = (storyProps) => <GalleryLegends {...storyProps} />;

export const Normal = (storyProps) => <GalleryLegends {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
