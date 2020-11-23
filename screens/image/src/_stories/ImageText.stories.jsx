/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageMedia, text, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import ImageTextScreen from '../ImageText';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: { fit: 'cover' },
    text: text('verylong'),
    background: background(),
};

export default {
    title: 'Screens/ImageText',
    component: ImageTextScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageTextScreen),
    },
};

export const Placeholder = (storyProps) => <ImageTextScreen {...storyProps} />;

export const Preview = (storyProps) => <ImageTextScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageTextScreen {...storyProps} />;

export const Normal = (storyProps) => <ImageTextScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
