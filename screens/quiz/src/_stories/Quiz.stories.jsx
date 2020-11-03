/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { description, subtitle } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Quiz from '../Quiz';
import definition from '../definition';

const props = {
    question: { body: description() },
    options: [
        { id: 1, label: { body: subtitle() } },
        { id: 2, label: { body: 'La bonne réponse' } },
        { id: 3, label: { body: subtitle() } },
        { id: 4, label: { body: subtitle() } },
    ],
    answerIndex: 1,
    result: {
        body: 'Le résultat de votre quiz'
    },
};

export default {
    title: 'Screens/Quiz',
    component: Quiz,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Quiz {...storyProps} />;

export const Preview = (storyProps) => <Quiz {...storyProps} {...props} />;

export const Edit = (storyProps) => <Quiz {...storyProps} />;

export const Normal = (storyProps) => <Quiz {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
