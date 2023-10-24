/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import triviaData from '../../../../.storybook/data/stories/urbania-trivia';
import UrbaniaTrivia from '../UrbaniaTrivia';
import definition from '../definition';

import '../../../../.storybook/fonts/fonts.scss';

export default {
    title: 'Urbania Screens/Trivia',
    component: UrbaniaTrivia,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Cool = () => <p>Hello</p>;

export const Placeholder = (storyProps) => <UrbaniaTrivia {...storyProps} />;

export const Preview = (storyProps) => <UrbaniaTrivia {...storyProps} {...triviaData} />;

export const Static = (storyProps) => <UrbaniaTrivia {...storyProps} {...triviaData} />;

export const Capture = (storyProps) => <UrbaniaTrivia {...storyProps} {...triviaData} />;

export const Edit = (storyProps) => <UrbaniaTrivia {...storyProps} />;

export const Normal = (storyProps) => <UrbaniaTrivia {...storyProps} {...triviaData} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
