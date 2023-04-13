/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { subtitle, backgroundColor, transitions, headerFooter } from '../../../../.storybook/data';
import QuizMultipleScreen from '../QuizMultiple';
import definition from '../definition';

const props = {
    questions: [
        {
            text: { body: 'Question 1?' },
            answers: [
                {
                    id: 1,
                    label: {
                        body: subtitle(),
                    },
                    points: 0,
                },
                { id: 2, label: { body: subtitle() }, points: 1 },
                { id: 3, label: { body: subtitle() }, points: 5 },
                { id: 4, label: { body: subtitle() }, points: 10 },
                { id: 5, label: { body: subtitle() }, points: 20 },
                { id: 6, label: { body: subtitle() }, points: 2 },
            ],
        },
        {
            text: { body: 'Question 2?' },
            answers: [
                { id: 1, label: { body: subtitle() }, points: 0 },
                { id: 2, label: { body: subtitle() }, points: 3 },
                { id: 3, label: { body: subtitle() }, points: 10 },
                { id: 4, label: { body: subtitle() }, points: 1 },
            ],
            background: backgroundColor(),
        },
    ],
    results: [
        {
            title: { body: subtitle('Medium') },
            description: { body: 'Medium' },
            points: 4,
        },
        {
            title: { body: subtitle('Low') },
            description: { body: 'Low' },
            points: 1,
        },
        {
            title: { body: subtitle('High') },
            description: { body: 'High' },
            points: 8,
        },
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

export const WithHeaderFooter = (storyProps) => (
    <QuizMultipleScreen {...storyProps} {...props} {...headerFooter()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
