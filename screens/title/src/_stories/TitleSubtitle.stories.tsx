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

import TitleSubtitleScreen from '../TitleSubtitle';
import definition from '../definition';

const screen = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/TitleSubtitle',
    component: TitleSubtitleScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleSubtitleScreen),
        defaultScreen: screen,
    },
});

export const Placeholder = meta.story((args) => <TitleSubtitleScreen {...args} />);

export const Preview = meta.story((args) => <TitleSubtitleScreen {...args} {...screen} />);

export const Static = meta.story((args) => <TitleSubtitleScreen {...args} {...screen} />);

export const Capture = meta.story((args) => <TitleSubtitleScreen {...args} {...screen} />);

export const Edit = meta.story((args) => <TitleSubtitleScreen {...args} />);

export const Normal = meta.story((args) => <TitleSubtitleScreen {...args} {...screen} />);

export const WithHeaderFooter = meta.story((args) => (
    <TitleSubtitleScreen {...args} {...screen} {...headerFooter()} />
));

export const WithHeader = meta.story((args) => (
    <TitleSubtitleScreen {...args} {...screen} header={header()} />
));

export const WithFooter = meta.story((args) => (
    <TitleSubtitleScreen {...args} {...screen} footer={footer()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
