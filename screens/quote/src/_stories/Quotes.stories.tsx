/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    author,
    backgroundColor,
    footer,
    header,
    headerFooter,
    quote,
    transitions,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import QuoteScreen from '../Quote';
import definition from '../definition';

const props = {
    quote: { body: quote() },
    author: { body: author() },
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/Quote',
    component: QuoteScreen,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

export const Placeholder = meta.story((args) => <QuoteScreen {...args} />);

export const Preview = meta.story((args) => <QuoteScreen {...args} {...props} />);

export const Static = meta.story((args) => <QuoteScreen {...args} {...props} />);

export const Capture = meta.story((args) => <QuoteScreen {...args} {...props} />);

export const Edit = meta.story((args) => <QuoteScreen {...args} />);

export const Normal = meta.story((args) => <QuoteScreen {...args} {...props} />);

export const WithHeaderFooter = meta.story((args) => (
    <QuoteScreen {...args} {...props} {...headerFooter()} />
));

export const WithHeader = meta.story((args) => (
    <QuoteScreen {...args} {...props} header={header()} />
));

export const WithFooter = meta.story((args) => (
    <QuoteScreen {...args} {...props} footer={footer()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
