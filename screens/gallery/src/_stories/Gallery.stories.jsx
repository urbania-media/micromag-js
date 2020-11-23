/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { images, backgroundColor } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import GalleryScreen from '../Gallery';
import definition from '../definition';

const props = {
    images: images({ count: 20 }),
    background: backgroundColor(),
};

export default {
    title: 'Screens/Gallery',
    component: GalleryScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryScreen),
    },
};

export const Placeholder = (storyProps) => <GalleryScreen {...storyProps} />;

export const Preview = (storyProps) => <GalleryScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <GalleryScreen {...storyProps} />;

export const Normal = (storyProps) => <GalleryScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
