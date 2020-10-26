/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageWithRandomSize, title, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import ImageTitle from '../ImageTitle';
import definition from '../definition';

const props = {
    image: imageWithRandomSize(),
    title: { body: title() },
    background: background(),
};

export default {
    title: 'Screens/ImageTitle',
    component: ImageTitle,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageTitle),
    },
};

export const Placeholder = (storyProps) => <ImageTitle {...storyProps} />;

export const Preview = (storyProps) => <ImageTitle {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageTitle {...storyProps} />;

export const Normal = (storyProps) => <ImageTitle {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
