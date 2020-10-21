/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageWithRandomSize, text, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import ImageText from '../ImageText';
import definition from '../definition';

const props = {
    image: imageWithRandomSize(),
    text: text('verylong'),
    background: background(),
};

export default {
    title: 'Screens/ImageText',
    component: ImageText,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageText),
    },
};

export const Placeholder = (storyProps) => <ImageText {...storyProps} />;

export const Preview = (storyProps) => <ImageText {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageText {...storyProps} />;

export const Normal = (storyProps) => <ImageText {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
