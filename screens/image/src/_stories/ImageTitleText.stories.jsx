/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageWithRandomSize, title, text, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import ImageTitleText from '../ImageTitleText';
import definition from '../definition';

const props = {
    image: imageWithRandomSize(),
    title: { body: title() },
    text: text('verylong'),
    background: background(),
};

export default {
    title: 'Screens/ImageTitleText',
    component: ImageTitleText,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageTitleText),
    },
};

export const Placeholder = (storyProps) => <ImageTitleText {...storyProps} />;

export const Preview = (storyProps) => <ImageTitleText {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageTitleText {...storyProps} />;

export const Normal = (storyProps) => <ImageTitleText {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
