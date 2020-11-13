/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { text } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TextScreen from '../Text';
import definition from '../definition';

const props = {
    text: text('verylong'),
};

export default {
    title: 'Screens/Text',
    component: TextScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TextScreen),
    },
};

export const Placeholder = (storyProps) => <TextScreen {...storyProps} />;

export const Preview = (storyProps) => <TextScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <TextScreen {...storyProps} />;

export const Normal = (storyProps) => <TextScreen {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
