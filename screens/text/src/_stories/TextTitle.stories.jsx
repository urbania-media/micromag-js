/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { title, text } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TextTitle from '../TextTitle';
import definition from '../definition';

const props = {
    text: text('verylong'),
    title: { body: title() },
};

export default {
    title: 'Screens/TextTitle',
    component: TextTitle,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TextTitle),
    },
};

export const Placeholder = (storyProps) => <TextTitle {...storyProps} />;

export const Preview = (storyProps) => <TextTitle {...storyProps} />;

export const Edit = (storyProps) => <TextTitle {...storyProps} />;

export const Normal = (storyProps) => <TextTitle {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
