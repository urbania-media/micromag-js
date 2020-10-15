/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, subtitle, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Title from '../Title';
import definition from '../definition';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    background: background(),
};

export default {
    title: 'Screens/Title',
    component: Title,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Title {...storyProps} />;

export const Preview = (storyProps) => <Title {...storyProps} />;

export const Edit = (storyProps) => <Title {...storyProps} />;

export const Normal = (storyProps) => <Title {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
