/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, subtitle, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

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
    background: backgroundColor(),
    transitions: transitions(),
};

const multipleGood = [
    { id: 1, label: { body: subtitle() } },
    { id: 2, label: { body: 'La bonne réponse' }, good: true },
    { id: 3, label: { body: subtitle() } },
    { id: 4, label: { body: subtitle() }, good: true },
];

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
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/Quiz',
    component: QuizScreen,

    parameters: {
        intl: true,
        screenDefinition: definition[0],
    },
});

export const Placeholder = meta.story((args) => <QuizScreen {...args} />);

export const Preview = meta.story((args) => <QuizScreen {...args} {...props} />);

export const Static = meta.story((args) => <QuizScreen {...args} {...props} />);

export const Capture = meta.story((args) => <QuizScreen {...args} {...props} />);

export const Edit = meta.story((args) => <QuizScreen {...args} />);

export const Normal = meta.story((args) => <QuizScreen {...args} {...props} />);

export const MultipleGoodAnswers = meta.story((args) => (
    <QuizScreen {...args} {...props} answers={multipleGood} />
));

export const WithoutTrueFalse = meta.story((args) => (
    <QuizScreen {...args} {...props} withoutTrueFalse />
));

export const WithoutGoodAnswer = meta.story((args) => <QuizScreen {...args} {...noGoodProps} />);

export const WithoutGoodAnswerAndWithoutTrueFalse = meta.story((args) => (
    <QuizScreen {...args} {...noGoodProps} withoutTrueFalse />
));

export const WithHeaderFooter = meta.story((args) => (
    <QuizScreen {...args} {...props} {...headerFooter()} />
));

export const WithShortLayout = meta.story((args) => (
    <QuizScreen {...args} {...props} {...headerFooter()} answers={[]} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
