/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageWithRandomSize, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Image from '../Image';
import definition from '../definition';

const props = {
    image: imageWithRandomSize(),
    background: background(),
};

export default {
    title: 'Screens/Image',
    component: Image,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Image),
    },
};

export const Placeholder = (storyProps) => <Image {...storyProps} />;

export const Preview = (storyProps) => <Image {...storyProps} {...props} />;

export const Edit = (storyProps) => <Image {...storyProps} />;

export const Normal = (storyProps) => <Image {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
