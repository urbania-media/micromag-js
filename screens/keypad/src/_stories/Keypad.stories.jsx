/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import definition from '../definition';
import Keypad from '../Keypad';

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
            label: '1'
        },
        {
            id: '2',
            label: '2',
        },
        {
            id: '3',
            label: '3',
        },
        {
            id: '4',
            label: '4',
        },
        {
            id: '5',
            label: '5',
        },
        {
            id: '6',
            label: '6',
        },
        {
            id: '7',
            label: '7',
        },
    ],
};

export default {
    title: 'Screens/Keypad',
    component: Keypad,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Keypad),
    },
};

export const Placeholder = (storyProps) => <Keypad {...storyProps} />;

export const Preview = (storyProps) => <Keypad {...storyProps} {...props} />;

export const Static = (storyProps) => <Keypad {...storyProps} {...props} />;

export const Capture = (storyProps) => <Keypad {...storyProps} {...props} />;

export const Edit = (storyProps) => <Keypad {...storyProps} />;

export const Normal = (storyProps) => <Keypad {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
