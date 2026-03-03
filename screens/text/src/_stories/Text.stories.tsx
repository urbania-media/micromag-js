/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    badge,
    callToAction,
    footer,
    header,
    text,
    transitions,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import TextScreen from '../Text';
import definition from '../definition';

const props = {
    text: text('verylong'),
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/Text',
    component: TextScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TextScreen),
    },
});

export const Placeholder = meta.story((args) => <TextScreen {...args} />);

export const Preview = meta.story((args) => <TextScreen {...args} {...props} />);

export const Static = meta.story((args) => <TextScreen {...args} {...props} />);

export const Capture = meta.story((args) => <TextScreen {...args} {...props} />);

export const Edit = meta.story((args) => <TextScreen {...args} />);

export const Normal = meta.story((args) => <TextScreen {...args} {...props} />);

export const WithHeaderFooter = meta.story((args) => (
    <TextScreen
        {...args}
        {...props}
        footer={{ callToAction: { ...callToAction(), inWebView: false, withArrow: false } }}
        header={{ badge: { ...badge(), label: { body: 'My badge 10210' } } }}
    />
));

export const WithHeader = meta.story((args) => (
    <TextScreen {...args} {...props} header={header()} />
));

export const WithFooter = meta.story((args) => (
    <TextScreen {...args} {...props} footer={footer()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
