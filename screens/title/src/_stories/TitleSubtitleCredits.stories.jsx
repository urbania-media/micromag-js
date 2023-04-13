/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    title,
    subtitle,
    backgroundColor,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import TitleSubtitleCreditsScreen from '../TitleSubtitleCredits';
import definition from '../definition';

const screen = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    credits: { body: subtitle() },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/TitleSubtitleCredits',
    component: TitleSubtitleCreditsScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleSubtitleCreditsScreen),
        defaultScreen: screen,
    },
};

export const Placeholder = (storyProps) => <TitleSubtitleCreditsScreen {...storyProps} />;

export const Preview = (storyProps) => <TitleSubtitleCreditsScreen {...storyProps} {...screen} />;

export const Static = (storyProps) => <TitleSubtitleCreditsScreen {...storyProps} {...screen} />;

export const Capture = (storyProps) => <TitleSubtitleCreditsScreen {...storyProps} {...screen} />;

export const Edit = (storyProps) => <TitleSubtitleCreditsScreen {...storyProps} />;

export const Normal = (storyProps) => <TitleSubtitleCreditsScreen {...storyProps} {...screen} />;

export const WithHeaderFooter = (storyProps) => (
    <TitleSubtitleCreditsScreen {...storyProps} {...screen} {...headerFooter()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
