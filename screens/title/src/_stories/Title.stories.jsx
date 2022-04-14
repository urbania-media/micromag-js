/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { title, backgroundColor, transitions, callToAction } from '../../../../.storybook/data';
import TitleScreen from '../Title';
import definition from '../definition';

const screen = {
    title: { body: title() },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Title',
    component: TitleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleScreen),
        defaultScreen: screen,
    },
};

export const Placeholder = (storyProps) => <TitleScreen {...storyProps} />;

export const Preview = (storyProps) => <TitleScreen {...storyProps} {...screen} />;

export const Static = (storyProps) => <TitleScreen {...storyProps} {...screen} />;

export const Capture = (storyProps) => <TitleScreen {...storyProps} {...screen} />;

export const Edit = (storyProps) => <TitleScreen {...storyProps} />;

export const Normal = (storyProps) => <TitleScreen {...storyProps} {...screen} />;

export const WithCallToAction = (storyProps) => (
    <TitleScreen {...storyProps} {...screen} callToAction={callToAction()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
