/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    quote,
    author,
    backgroundColor,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import QuoteScreen from '../Quote';
import definition from '../definition';

const props = {
    quote: { body: quote() },
    author: { body: author() },
    background: backgroundColor(),
    transitions: transitions(),
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
export const Static = (storyProps) => <QuoteScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <QuoteScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <QuoteScreen {...storyProps} />;

export const Normal = (storyProps) => <QuoteScreen {...storyProps} {...props} />;

export const WithHeaderFooter = (storyProps) => (
    <QuoteScreen {...storyProps} {...props} {...headerFooter()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
