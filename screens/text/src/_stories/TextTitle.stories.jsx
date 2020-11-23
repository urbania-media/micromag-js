/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, text } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TextTitleScreen from '../TextTitle';
import definition from '../definition';

const props = {
    text: text('verylong'),
    title: { body: title() },
};

export default {
    title: 'Screens/TextTitle',
    component: TextTitleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TextTitleScreen),
    },
};

export const Placeholder = (storyProps) => <TextTitleScreen {...storyProps} />;

export const Preview = (storyProps) => <TextTitleScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <TextTitleScreen {...storyProps} />;

export const Normal = (storyProps) => <TextTitleScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
