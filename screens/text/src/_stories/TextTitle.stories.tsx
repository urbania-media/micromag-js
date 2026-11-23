/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    footer,
    header,
    headerFooter,
    text,
    title,
    transitions,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import TextTitleScreen from '../TextTitle';
import definition from '../definition';

const props = {
    text: text('long'),
    title: { body: title() },
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/TextTitle',
    component: TextTitleScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TextTitleScreen),
    },
});

export const Placeholder = meta.story((args) => <TextTitleScreen {...args} />);

export const Preview = meta.story((args) => <TextTitleScreen {...args} {...props} />);

export const Static = meta.story((args) => <TextTitleScreen {...args} {...props} />);

export const Capture = meta.story((args) => <TextTitleScreen {...args} {...props} />);

export const Edit = meta.story((args) => <TextTitleScreen {...args} />);

export const Normal = meta.story((args) => <TextTitleScreen {...args} {...props} />);

export const WithHeaderFooter = meta.story((args) => (
    <TextTitleScreen {...args} {...props} {...headerFooter()} />
));

export const WithHeader = meta.story((args) => (
    <TextTitleScreen {...args} {...props} header={header()} />
));

export const WithFooter = meta.story((args) => (
    <TextTitleScreen {...args} {...props} footer={footer()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
