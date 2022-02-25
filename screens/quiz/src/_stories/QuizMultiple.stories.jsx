/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { subtitle, backgroundColor, transitions, callToAction } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import QuizMultipleScreen from '../QuizMultiple';
import definition from '../definition';

const props = {
    questions: [
        {
            text: { body: 'Question 1?' },
            answers: [
                { id: 1, label: { body: subtitle() }, points: 0 },
                { id: 2, label: { body: subtitle() }, points: 1 },
                { id: 3, label: { body: subtitle() }, points: 2 },
                { id: 4, label: { body: subtitle() }, points: 3 },
            ]
        },
        {
            text: { body: 'Question 2?' },
            answers: [
                { id: 1, label: { body: subtitle() }, points: 0 },
                { id: 2, label: { body: subtitle() }, points: 1 },
                { id: 3, label: { body: subtitle() }, points: 2 },
                { id: 4, label: { body: subtitle() }, points: 3 },
            ]
        }
    ],
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/QuizMultiple',
    component: QuizMultipleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition[0],
    },
};

export const Placeholder = (storyProps) => <QuizMultipleScreen {...storyProps} />;

export const Preview = (storyProps) => <QuizMultipleScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <QuizMultipleScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <QuizMultipleScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <QuizMultipleScreen {...storyProps} />;

export const Normal = (storyProps) => <QuizMultipleScreen {...storyProps} {...props} />;

export const WithCallToAction = (storyProps) => (
    <QuizMultipleScreen {...storyProps} {...props} callToAction={callToAction()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;