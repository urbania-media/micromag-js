/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { quote, author, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Quote from '../Quote';
import definition from '../definition';

const props = {
    quote: { body: quote() },
    author: { body: author() },
    background: background(),
};

export default {
    title: 'Screens/Quote',
    component: Quote,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Quote {...storyProps} />;

export const Preview = (storyProps) => <Quote {...storyProps} {...props} />;

export const Edit = (storyProps) => <Quote {...storyProps} />;

export const Normal = (storyProps) => <Quote {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;