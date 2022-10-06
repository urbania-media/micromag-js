/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import definition from '../definition';
import Grid from '../Grid';
// images: images({ count: 20 }),

const createText = body => ({
    body: `<p>${body}</p>`,
    textStyle: {
        fontSize: 20,
        fontStyle: {
            bold: true,
        },
    }
});

const props = {
    background: {
        color: {
            alpha: 1,
            color: '#696942',
        }
    },
    items: [
        {
            id: '1',
            label: createText('1'),
        },
        {
            id: '2',
            label: createText('2'),
        },
        {
            id: '3',
            label: createText('3'),
        },
        {
            id: '4',
            label: createText('4'),
        },
        {
            id: '5',
            label: createText('5'),
        },
        {
            id: '6',
            label: createText('6'),
        },
        {
            id: '7',
            label: createText('7'),
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
