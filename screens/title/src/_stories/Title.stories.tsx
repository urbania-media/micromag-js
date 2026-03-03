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

import TitleScreen from '../Title';
import definition from '../definition';

const screen = {
    title: { body: title() },
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/Title',
    component: TitleScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleScreen),
        defaultScreen: screen,
    },
});

export const Placeholder = meta.story((args) => <TitleScreen {...args} />);

export const Preview = meta.story((args) => <TitleScreen {...args} {...screen} />);

export const Static = meta.story((args) => <TitleScreen {...args} {...screen} />);

export const Capture = meta.story((args) => <TitleScreen {...args} {...screen} />);

export const Edit = meta.story((args) => <TitleScreen {...args} />);

export const Normal = meta.story((args) => <TitleScreen {...args} {...screen} />);

export const WithHeaderFooter = meta.story((args) => (
    <TitleScreen {...args} {...screen} {...headerFooter()} />
));

export const WithLongTitle = meta.story((args) => (
    <TitleScreen {...args} {...screen} {...headerFooter()} title={text('long')} />
));

export const WithHeader = meta.story((args) => (
    <TitleScreen {...args} {...screen} header={header()} />
));

export const WithFooter = meta.story((args) => (
    <TitleScreen {...args} {...screen} footer={footer()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
