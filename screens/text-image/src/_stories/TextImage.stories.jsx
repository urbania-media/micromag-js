/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { text, imageWithRandomSize } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TextImage from '../TextImage';
import definition from '../definition';

const props = {
    text: text(),
    image: imageWithRandomSize(),
};

export default {
    title: 'Screens/TextImage',
    component: TextImage,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <TextImage {...storyProps} />;

export const Preview = (storyProps) => <TextImage {...storyProps} />;

export const Edit = (storyProps) => <TextImage {...storyProps} />;

export const Normal = (storyProps) => <TextImage {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;

