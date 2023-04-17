/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    text,
    backgroundColor,
    transitions,
    callToAction,
    badge,
    header,
    footer,
} from '../../../../.storybook/data';
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

export const WithHeaderFooter = (storyProps) => (
    <TextScreen
        {...storyProps}
        {...props}
        footer={{ callToAction: { ...callToAction(), inWebView: false, withArrow: false } }}
        header={{ badge: { ...badge(), label: { body: 'My badge 10210' } } }}
    />
);

export const WithHeader = (storyProps) => (
    <TextScreen {...storyProps} {...props} header={header()} />
);

export const WithFooter = (storyProps) => (
    <TextScreen {...storyProps} {...props} footer={footer()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
