/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, subtitle, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TitleSubtitleCredits from '../TitleSubtitleCredits';
import definition from '../definition';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    credits: { body: subtitle() },
    background: background(),
};

export default {
    title: 'Screens/TitleSubtitleCredits',
    component: TitleSubtitleCredits,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleSubtitleCredits),
    },
};

export const Placeholder = (storyProps) => <TitleSubtitleCredits {...storyProps} />;

export const Preview = (storyProps) => <TitleSubtitleCredits {...storyProps} {...props} />;

export const Edit = (storyProps) => <TitleSubtitleCredits {...storyProps} />;

export const Normal = (storyProps) => <TitleSubtitleCredits {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
