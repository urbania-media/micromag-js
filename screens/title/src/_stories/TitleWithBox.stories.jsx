/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
    title,
    subtitle,
    backgroundColor,
    transitions,
    callToAction,
} from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
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

export default {
    title: 'Screens/TitleWithBox',
    component: TitleWithBoxScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleWithBoxScreen),
        defaultScreen: screen,
    },
};

export const Placeholder = (storyProps) => <TitleWithBoxScreen {...storyProps} />;

export const Preview = (storyProps) => <TitleWithBoxScreen {...storyProps} {...screen} />;
export const Static = (storyProps) => <TitleWithBoxScreen {...storyProps} {...screen} />;
export const Capture = (storyProps) => <TitleWithBoxScreen {...storyProps} {...screen} />;

export const Edit = (storyProps) => <TitleWithBoxScreen {...storyProps} />;

export const Normal = (storyProps) => <TitleWithBoxScreen {...storyProps} {...screen} />;

export const WithCallToAction = (storyProps) => (
    <TitleWithBoxScreen {...storyProps} {...screen} callToAction={callToAction()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
