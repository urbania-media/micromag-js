/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { quote, author, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import QuoteScreen from '../Quote';
import definition from '../definition';

const props = {
    quote: { body: quote() },
    author: { body: author() },
    background: background(),
};

export default {
    title: 'Screens/Quote',
    component: QuoteScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <QuoteScreen {...storyProps} />;

export const Preview = (storyProps) => <QuoteScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <QuoteScreen {...storyProps} />;

export const Normal = (storyProps) => <QuoteScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;