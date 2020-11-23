/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TitleScreen from '../Title';
import definition from '../definition';

const screen = {
    title: { body: title() },
    background: background(),
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
Preview.parameters = {
    viewport: {
        defaultViewport: 'mobileSmall',
    },
};

export const Edit = (storyProps) => <TitleScreen {...storyProps} />;
Edit.parameters = {
    viewport: {
        defaultViewport: 'mobileSmall',
    },
};

export const Normal = (storyProps) => <TitleScreen {...storyProps} {...screen} />;
Normal.parameters = {
    viewport: {
        defaultViewport: 'mobileSmall',
    },
};

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
