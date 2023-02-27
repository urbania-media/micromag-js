/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { subtitle, backgroundColor, transitions, callToAction } from '../../../../.storybook/data';
import QuizScreen from '../Quiz';
import definition from '../definition';

const props = {
    question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
    answers: [
        { id: 1, label: { body: subtitle() } },
        { id: 2, label: { body: 'La bonne réponse' }, good: true },
        { id: 3, label: { body: subtitle() } },
        { id: 4, label: { body: subtitle() } },
    ],
    result: {
        body: 'Et oui, la bonne réponse était "La bonne réponse". Quand même surprenant hen?',
    },
    // withoutTrueFalse: true,
    background: backgroundColor(),
    transitions: transitions(),
};

const noGoodProps = {
    question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
    answers: [
        { id: 1, label: { body: subtitle() } },
        { id: 2, label: { body: 'Nope' }, good: false },
        { id: 3, label: { body: subtitle() } },
        { id: 4, label: { body: subtitle() } },
    ],
    result: {
        body: 'Et oui, la bonne réponse était "La bonne réponse". Quand même surprenant hen?',
    },
    // withoutTrueFalse: true,
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Quiz',
    component: QuizScreen,
    parameters: {
        intl: true,
        screenDefinition: definition[0],
    },
};

export const Placeholder = (storyProps) => <QuizScreen {...storyProps} />;

export const Preview = (storyProps) => <QuizScreen {...storyProps} {...props} />;

export const Static = (storyProps) => <QuizScreen {...storyProps} {...props} />;

export const Capture = (storyProps) => <QuizScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <QuizScreen {...storyProps} />;

export const Normal = (storyProps) => <QuizScreen {...storyProps} {...props} />;

export const WithoutGoodAnswer = (storyProps) => <QuizScreen {...storyProps} {...noGoodProps} />;

export const WithoutGoodAnswerAndWithoutTrueFalse = (storyProps) => (
    <QuizScreen {...storyProps} {...noGoodProps} withoutTrueFalse />
);

export const WithCallToAction = (storyProps) => (
    <QuizScreen {...storyProps} {...props} callToAction={callToAction()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
