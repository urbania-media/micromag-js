/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, text } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Text from '../Text';
import definition from '../definition';

const props = {
    text: text('verylong'),
};

export default {
    title: 'Screens/Text',
    component: Text,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Text {...storyProps} />;

export const Preview = (storyProps) => <Text {...storyProps} />;

export const Edit = (storyProps) => <Text {...storyProps} />;

export const Normal = (storyProps) => <Text {...storyProps} {...props} />;
export const WithTitle = (storyProps) => <Text {...storyProps} {...props} title={{ body: title() }} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
