/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    title,
    subtitle,
    backgroundColor,
    transitions,
    headerFooter,
    header,
    footer,
} from '../../../../.storybook/data';
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

export const WithHeaderFooter = (storyProps) => (
    <TitleWithBoxScreen {...storyProps} {...screen} {...headerFooter()} />
);

export const WithHeader = (storyProps) => (
    <TitleWithBoxScreen {...storyProps} {...screen} header={header()} />
);

export const WithFooter = (storyProps) => (
    <TitleWithBoxScreen {...storyProps} {...screen} footer={footer()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
