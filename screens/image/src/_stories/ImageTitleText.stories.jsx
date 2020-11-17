/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageWithRandomSize, title, text, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import ImageTitleTextScreen from '../ImageTitleText';
import definition from '../definition';

const props = {
    image: {...imageWithRandomSize(), objectFit: { fit: 'cover' }},
    title: { body: title() },
    text: text('verylong'),
    background: background(),
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

export const Definition = () => <ScreenDefinition definition={definition} />;
