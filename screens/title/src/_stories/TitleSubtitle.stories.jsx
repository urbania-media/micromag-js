/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, subtitle, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TitleSubtitleScreen from '../TitleSubtitle';
import definition from '../definition';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    background: background(),
};

export default {
    title: 'Screens/TitleSubtitle',
    component: TitleSubtitleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleSubtitleScreen),
    },
};

export const Placeholder = (storyProps) => <TitleSubtitleScreen {...storyProps} />;

export const Preview = (storyProps) => <TitleSubtitleScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <TitleSubtitleScreen {...storyProps} />;

export const Normal = (storyProps) => <TitleSubtitleScreen {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
