/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { images, background, text } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import GalleryLegendsScreen from '../GalleryLegends';
import definition from '../definition';

const props = {
    images: images({ count: 20 }).map( image => ({...image, legend: text() })),
    background: background(),
};

export default {
    title: 'Screens/GalleryLegends',
    component: GalleryLegendsScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryLegendsScreen),
    },
};

export const Placeholder = (storyProps) => <GalleryLegendsScreen {...storyProps} />;

export const Preview = (storyProps) => <GalleryLegendsScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <GalleryLegendsScreen {...storyProps} />;

export const Normal = (storyProps) => <GalleryLegendsScreen {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
