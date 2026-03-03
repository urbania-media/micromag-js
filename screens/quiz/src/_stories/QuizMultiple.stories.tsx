/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, subtitle, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import QuizMultipleScreen from '../QuizMultiple';
import definition from '../definition';

const props = {
    questions: [
        {
            text: { body: 'Question 1?' },
            result: {
                body: 'Result 1',
            },
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
                {
                    id: 1,
                    label: { body: subtitle() },
                    points: 0,
                    result: { body: 'HAHAHA' },
                },
                { id: 2, label: { body: subtitle() }, points: 3 },
                { id: 3, label: { body: subtitle() }, points: 10 },
                { id: 4, label: { body: subtitle() }, points: 1 },
            ],
            background: backgroundColor(),
        },
    ],
    results: [
        {
            title: { body: subtitle('Weak') },
            description: { body: 'Weak' },
            points: 0,
        },
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

const simpleProps = {
    questions: [
        {
            text: { body: 'Question 1? .. .. . .. . . .. . ' },
            answers: [
                {
                    id: 1,
                    label: {
                        body: subtitle(),
                    },
                    points: 0,
                },
                { id: 2, label: { body: subtitle() }, points: 3 },
                { id: 3, label: { body: subtitle() }, points: 4 },
                { id: 4, label: { body: subtitle() }, points: 50 },
                { id: 5, label: { body: subtitle() }, points: 60 },
                { id: 6, label: { body: subtitle() }, points: 2 },
            ],
        },
        {
            text: { body: 'Question 2 ... ... .. . .. . .... ?' },
            answers: [
                {
                    id: 1,
                    label: { body: subtitle() },
                    points: 0,
                },
                { id: 2, label: { body: subtitle() }, points: 33 },
                { id: 3, label: { body: subtitle() }, points: 10 },
                { id: 4, label: { body: subtitle() }, points: 1 },
            ],
            background: backgroundColor(),
        },
    ],
    results: [
        {
            title: { body: subtitle('Weak') },
            description: { body: 'Weak' },
            points: 0,
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

const withTrueFalse = {
    // goodAnswerColor: {
    //     alpha: 1,
    //     color: '#00ff2d',
    // },
    questions: [
        {
            text: { body: 'Question 1? .. .. . .. . . .. . ' },
            answers: [
                {
                    id: 1,
                    label: {
                        body: subtitle(),
                    },
                    good: false,
                },
                { id: 2, label: { body: subtitle() }, good: true },
                { id: 3, label: { body: subtitle() } },
                { id: 4, label: { body: subtitle() } },
                { id: 5, label: { body: subtitle() } },
                { id: 6, label: { body: subtitle() } },
            ],
        },
        {
            text: { body: 'Question 2 ... ... .. . .. . .... ?' },
            answers: [
                {
                    id: 1,
                    label: { body: subtitle() },
                    result: { body: 'HAHAHA' },
                },
                { id: 2, label: { body: subtitle() } },
                { id: 3, label: { body: subtitle() }, good: true },
                { id: 4, label: { body: subtitle() }, good: true },
            ],
            background: backgroundColor(),
        },
    ],
    results: [
        {
            title: { body: subtitle('High') },
            description: { body: 'High' },
            points: 0,
        },
    ],
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/QuizMultiple',
    component: QuizMultipleScreen,

    parameters: {
        intl: true,
        screenDefinition: definition[0],
    },
});

export const Placeholder = meta.story((args) => <QuizMultipleScreen {...args} />);

export const Preview = meta.story((args) => <QuizMultipleScreen {...args} {...props} />);

export const Static = meta.story((args) => <QuizMultipleScreen {...args} {...props} />);

export const Capture = meta.story((args) => <QuizMultipleScreen {...args} {...props} />);

export const Edit = meta.story((args) => <QuizMultipleScreen {...args} />);

export const Normal = meta.story((args) => <QuizMultipleScreen {...args} {...props} />);

export const Simple = meta.story((args) => <QuizMultipleScreen {...args} {...simpleProps} />);

export const WithTrueFalse = meta.story((args) => (
    <QuizMultipleScreen {...args} {...withTrueFalse} />
));

export const WithHeaderFooter = meta.story((args) => (
    <QuizMultipleScreen {...args} {...props} {...headerFooter()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
