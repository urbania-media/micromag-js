/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, subtitle, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TitleSubtitle from '../TitleSubtitle';
import definition from '../definition';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    background: background(),
};

export default {
    title: 'Screens/TitleSubtitle',
    component: TitleSubtitle,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TitleSubtitle),
    },
};

export const Placeholder = (storyProps) => <TitleSubtitle {...storyProps} />;

export const Preview = (storyProps) => <TitleSubtitle {...storyProps} {...props} />;

export const Edit = (storyProps) => <TitleSubtitle {...storyProps} />;

export const Normal = (storyProps) => <TitleSubtitle {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
