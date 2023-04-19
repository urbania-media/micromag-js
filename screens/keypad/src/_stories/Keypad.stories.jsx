/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, header, footer } from '../../../../.storybook/data';
import Keypad from '../Keypad';
import definition from '../definition';

const props = {
    background: backgroundColor(),
    items: [
        {
            id: '1',
            label: '1',
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

export const WithHeaderFooter = (storyProps) => (
    <Keypad {...storyProps} {...props} {...headerFooter()} />
);

export const WithHeader = (storyProps) => <Keypad {...storyProps} {...props} header={header()} />;

export const WithFooter = (storyProps) => <Keypad {...storyProps} {...props} footer={footer()} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
