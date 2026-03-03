/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import SurveyScreen from '../Survey';
import definition from '../definition';

const props = {
    question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
    answers: [
        { id: 1, label: { body: 'Choix 1' }, percent: 34, buttonStyle: { borderRadius: '30px' } },
        { id: 2, label: { body: 'Choix 2' }, percent: 12 },
        {
            id: 3,
            label: { body: 'Choix vraiment plus long pour tester que tout fonctionne' },
            percent: 38,
        },
        { id: 4, label: { body: 'Choix 4' }, percent: 16 },
    ],
    background: backgroundColor(),
    transitions: transitions(),
};

const resultsProps = {
    question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
    result: {
        body: 'Result 193857934',
    },
    answers: [
        { id: 1, label: { body: 'Choix 1' }, percent: 34, buttonStyle: { borderRadius: '30px' } },
        { id: 2, label: { body: 'Choix 2' }, percent: 12 },
        {
            id: 3,
            label: { body: 'Choix vraiment plus long pour tester que tout fonctionne' },
            percent: 38,
        },
        { id: 4, label: { body: 'Choix 4' }, percent: 16 },
    ],
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/Survey',
    component: SurveyScreen,

    parameters: {
        intl: true,
        screenDefinition: definition,
        withVisitor: true,
    },
});

export const Placeholder = meta.story((args) => <SurveyScreen {...args} />);

export const Preview = meta.story((args) => <SurveyScreen {...args} {...props} />);

export const Static = meta.story((args) => <SurveyScreen {...args} {...props} />);

export const Capture = meta.story((args) => <SurveyScreen {...args} {...props} />);

export const Edit = meta.story((args) => <SurveyScreen {...args} />);

export const Normal = meta.story((args) => <SurveyScreen {...args} {...props} />);

export const WithResults = meta.story((args) => <SurveyScreen {...args} {...resultsProps} />);

export const ShowInput = meta.story((args) => <SurveyScreen {...args} {...props} showInput />);

export const ShowCount = meta.story((args) => <SurveyScreen {...args} {...props} showCount />);

export const WithoutPercentage = meta.story((args) => (
    <SurveyScreen {...args} {...props} withoutPercentage />
));

export const WithoutBar = meta.story((args) => <SurveyScreen {...args} {...props} withoutBar />);

export const WithoutAll = meta.story((args) => (
    <SurveyScreen {...args} {...props} withoutPercentage withoutBar />
));

export const WithoutResults = meta.story((args) => (
    <SurveyScreen {...args} {...props} withoutPercentage withoutBar />
));

export const WithHeaderFooter = meta.story((args) => (
    <SurveyScreen {...args} {...props} {...headerFooter()} />
));

export const WithShortLayout = meta.story((args) => (
    <SurveyScreen {...args} {...props} {...headerFooter()} answers={[]} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
