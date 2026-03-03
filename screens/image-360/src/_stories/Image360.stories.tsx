/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    image360Media,
    backgroundColor,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import Image360Screen from '../Image360';
import definition from '../definition';

const props = () => ({
    image: image360Media(),
    background: backgroundColor(),
    transitions: transitions(),
});

export default {
    title: 'Screens/Image 360',
    component: Image360Screen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Image360Screen {...storyProps} />;

export const Preview = (storyProps) => <Image360Screen {...storyProps} {...props()} />;

export const Static = (storyProps) => <Image360Screen {...storyProps} {...props()} />;

export const Capture = (storyProps) => <Image360Screen {...storyProps} {...props()} />;

export const Edit = (storyProps) => <Image360Screen {...storyProps} />;

export const Normal = (storyProps) => <Image360Screen {...storyProps} {...props()} />;

export const WithHeaderFooter = (storyProps) => (
    <Image360Screen {...storyProps} {...props()} {...headerFooter()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
