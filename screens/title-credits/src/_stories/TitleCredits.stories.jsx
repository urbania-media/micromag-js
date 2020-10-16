/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, subtitle, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TitleCredits from '../TitleCredits';
import definition from '../definition';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    credits: { body: subtitle() },
    background: background(),
};

export default {
    title: 'Screens/TitleCredits',
    component: TitleCredits,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <TitleCredits {...storyProps} />;

export const Preview = (storyProps) => <TitleCredits {...storyProps} />;

export const Edit = (storyProps) => <TitleCredits {...storyProps} />;

export const Normal = (storyProps) => <TitleCredits {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
