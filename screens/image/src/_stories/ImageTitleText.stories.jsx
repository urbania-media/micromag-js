/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageMedia, title, text, backgroundColor } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import ImageTitleTextScreen from '../ImageTitleText';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: { fit: 'cover' },
    title: { body: title() },
    text: text('verylong'),
    background: backgroundColor(),
};

export default {
    title: 'Screens/ImageTitleText',
    component: ImageTitleTextScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageTitleTextScreen),
    },
};

export const Placeholder = (storyProps) => <ImageTitleTextScreen {...storyProps} />;

export const Preview = (storyProps) => <ImageTitleTextScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageTitleTextScreen {...storyProps} />;

export const Normal = (storyProps) => <ImageTitleTextScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
