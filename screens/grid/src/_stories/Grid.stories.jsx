/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { text } from '../../../../.storybook/data';
import definition from '../definition';
import Grid from '../Grid';
// images: images({ count: 20 }),

const createText = body => ({
    body,
    textStyle: {}
});

const props = {
    items: [
        {
            id: 'once',
            description: createText('once'),
        },
        {
            id: 'upon',
            description: createText('upon'),
        },
        {
            id: 'a',
            description: createText('a'),
        },
        {
            id: 'time',
            description: createText('time'),
        },
        {
            id: 'in a',
            description: createText('in a'),
        },
        {
            id: 'galaxy',
            description: createText('galaxy'),
        },
        {
            id: 'far away',
            description: createText('far away'),
        },
    ],
};

export default {
    title: 'Screens/Grid',
    component: Grid,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Grid),
    },
};

export const Placeholder = (storyProps) => <Grid {...storyProps} />;

export const Preview = (storyProps) => <Grid {...storyProps} {...props} />;

export const Static = (storyProps) => <Grid {...storyProps} {...props} />;

export const Capture = (storyProps) => <Grid {...storyProps} {...props} />;

export const Edit = (storyProps) => <Grid {...storyProps} />;

export const Normal = (storyProps) => <Grid {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
