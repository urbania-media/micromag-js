/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TitleScreen from '../Title';
import definition from '../definition';

const props = {
    title: { body: title() },
    background: background(),
};

export default {
    title: 'Screens/Title',
    component: TitleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleScreen),
    },
};

export const Placeholder = (storyProps) => <TitleScreen {...storyProps} />;

export const Preview = (storyProps) => <TitleScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <TitleScreen {...storyProps} />;

export const Normal = (storyProps) => <TitleScreen {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
