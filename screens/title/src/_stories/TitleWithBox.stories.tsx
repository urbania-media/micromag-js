/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    footer,
    header,
    headerFooter,
    subtitle,
    title,
    transitions,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import TitleWithBoxScreen from '../TitleWithBox';
import definition from '../definition';

const screen = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    description: { body: subtitle() },
    boxStyle: {
        backgroundColor: backgroundColor(),
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: backgroundColor(),
    },
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/TitleWithBox',
    component: TitleWithBoxScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleWithBoxScreen),
        defaultScreen: screen,
    },
});

export const Placeholder = meta.story((args) => <TitleWithBoxScreen {...args} />);

export const Preview = meta.story((args) => <TitleWithBoxScreen {...args} {...screen} />);

export const Static = meta.story((args) => <TitleWithBoxScreen {...args} {...screen} />);

export const Capture = meta.story((args) => <TitleWithBoxScreen {...args} {...screen} />);

export const Edit = meta.story((args) => <TitleWithBoxScreen {...args} />);

export const Normal = meta.story((args) => <TitleWithBoxScreen {...args} {...screen} />);

export const WithHeaderFooter = meta.story((args) => (
    <TitleWithBoxScreen {...args} {...screen} {...headerFooter()} />
));

export const WithHeader = meta.story((args) => (
    <TitleWithBoxScreen {...args} {...screen} header={header()} />
));

export const WithFooter = meta.story((args) => (
    <TitleWithBoxScreen {...args} {...screen} footer={footer()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
