/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { text, imageWithRandomSize } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TwoImages from '../TwoImages';
import definition from '../definition';

const props = {
    text: text(),
    image: imageWithRandomSize(),
    image2: imageWithRandomSize(),
};

export default {
    title: 'Screens/TwoImages',
    component: TwoImages,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <TwoImages {...storyProps} />;

export const Preview = (storyProps) => <TwoImages {...storyProps} {...props} />;

export const Edit = (storyProps) => <TwoImages {...storyProps} />;

export const Normal = (storyProps) => <TwoImages {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
