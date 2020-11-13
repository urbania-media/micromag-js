/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, subtitle, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TitleSubtitleCreditsScreen from '../TitleSubtitleCredits';
import definition from '../definition';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    credits: { body: subtitle() },
    background: background(),
};

export default {
    title: 'Screens/TitleSubtitleCredits',
    component: TitleSubtitleCreditsScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleSubtitleCreditsScreen),
    },
};

export const Placeholder = (storyProps) => <TitleSubtitleCreditsScreen {...storyProps} />;

export const Preview = (storyProps) => <TitleSubtitleCreditsScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <TitleSubtitleCreditsScreen {...storyProps} />;

export const Normal = (storyProps) => <TitleSubtitleCreditsScreen {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
