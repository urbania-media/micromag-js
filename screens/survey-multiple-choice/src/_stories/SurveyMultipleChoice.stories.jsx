/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { description } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import SurveyMultipleChoice from '../SurveyMultipleChoice';
import definition from '../definition';

const props = {
    question: { body: description() },
    options: [
        { body: description() },
        { body: description() },
        { body: description() },
        { body: description() },
    ],
    result: {
        image: { url: 'https://picsum.photos/400/300' },
        text: { body: 'Le résultat de votre quiz' },
    },
};

export default {
    title: 'Screens/SurveyMultipleChoice',
    component: SurveyMultipleChoice,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <SurveyMultipleChoice {...storyProps} />;

export const Preview = (storyProps) => <SurveyMultipleChoice {...storyProps} />;

export const Edit = (storyProps) => <SurveyMultipleChoice {...storyProps} />;

export const Normal = (storyProps) => <SurveyMultipleChoice {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
