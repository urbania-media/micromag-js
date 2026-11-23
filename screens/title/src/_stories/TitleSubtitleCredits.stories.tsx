/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, subtitle, title, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import TitleSubtitleCreditsScreen from '../TitleSubtitleCredits';
import definition from '../definition';

const screen = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    credits: { body: subtitle() },
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/TitleSubtitleCredits',
    component: TitleSubtitleCreditsScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleSubtitleCreditsScreen),
        defaultScreen: screen,
    },
});

export const Placeholder = meta.story((args) => <TitleSubtitleCreditsScreen {...args} />);

export const Preview = meta.story((args) => <TitleSubtitleCreditsScreen {...args} {...screen} />);

export const Static = meta.story((args) => <TitleSubtitleCreditsScreen {...args} {...screen} />);

export const Capture = meta.story((args) => <TitleSubtitleCreditsScreen {...args} {...screen} />);

export const Edit = meta.story((args) => <TitleSubtitleCreditsScreen {...args} />);

export const Normal = meta.story((args) => <TitleSubtitleCreditsScreen {...args} {...screen} />);

export const WithHeaderFooter = meta.story((args) => (
    <TitleSubtitleCreditsScreen {...args} {...screen} {...headerFooter()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
