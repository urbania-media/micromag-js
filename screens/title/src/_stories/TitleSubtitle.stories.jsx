/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { title, subtitle, backgroundColor, transitions } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import TitleSubtitleScreen from '../TitleSubtitle';
import definition from '../definition';

const screen = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/TitleSubtitle',
    component: TitleSubtitleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleSubtitleScreen),
        defaultScreen: screen,
    },
};

export const Placeholder = (storyProps) => <TitleSubtitleScreen {...storyProps} />;

export const Preview = (storyProps) => <TitleSubtitleScreen {...storyProps} {...screen} />;
export const Static = (storyProps) => <TitleSubtitleScreen {...storyProps} {...screen} />;
export const Capture = (storyProps) => <TitleSubtitleScreen {...storyProps} {...screen} />;

export const Edit = (storyProps) => <TitleSubtitleScreen {...storyProps} />;

export const Normal = (storyProps) => <TitleSubtitleScreen {...storyProps} {...screen} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
