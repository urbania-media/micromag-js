/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    title,
    text,
    backgroundColor,
    transitions,
    headerFooter,
    header,
    footer,
} from '../../../../.storybook/data';
import TextTitleScreen from '../TextTitle';
import definition from '../definition';

const props = {
    text: text('long'),
    title: { body: title() },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/TextTitle',
    component: TextTitleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TextTitleScreen),
    },
};

export const Placeholder = (storyProps) => <TextTitleScreen {...storyProps} />;

export const Preview = (storyProps) => <TextTitleScreen {...storyProps} {...props} />;

export const Static = (storyProps) => <TextTitleScreen {...storyProps} {...props} />;

export const Capture = (storyProps) => <TextTitleScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <TextTitleScreen {...storyProps} />;

export const Normal = (storyProps) => <TextTitleScreen {...storyProps} {...props} />;

export const WithHeaderFooter = (storyProps) => (
    <TextTitleScreen {...storyProps} {...props} {...headerFooter()} />
);

export const WithHeader = (storyProps) => (
    <TextTitleScreen {...storyProps} {...props} header={header()} />
);

export const WithFooter = (storyProps) => (
    <TextTitleScreen {...storyProps} {...props} footer={footer()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
