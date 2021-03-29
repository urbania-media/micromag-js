/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { text, backgroundColor, transitions, swipeUpLink } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import TextScreen from '../Text';
import definition from '../definition';

const props = {
    text: text('verylong'),
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Text',
    component: TextScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TextScreen),
    },
};

export const Placeholder = (storyProps) => <TextScreen {...storyProps} />;

export const Preview = (storyProps) => <TextScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <TextScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <TextScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <TextScreen {...storyProps} />;

export const Normal = (storyProps) => <TextScreen {...storyProps} {...props} />;

export const WithLink = (storyProps) => (
    <TextScreen {...storyProps} {...props} link={swipeUpLink()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
