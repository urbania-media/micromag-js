/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { backgroundColor, transitions, callToAction } from '../../../../.storybook/data';
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

export default {
    title: 'Screens/Survey',
    component: SurveyScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
        withVisitor: true,
    },
};

export const Placeholder = (storyProps) => <SurveyScreen {...storyProps} />;

export const Preview = (storyProps) => <SurveyScreen {...storyProps} {...props} />;

export const Static = (storyProps) => <SurveyScreen {...storyProps} {...props} />;

export const Capture = (storyProps) => <SurveyScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <SurveyScreen {...storyProps} />;

export const Normal = (storyProps) => <SurveyScreen {...storyProps} {...props} />;

export const WithoutPercentage = (storyProps) => (
    <SurveyScreen {...storyProps} {...props} withoutPercentage />
);

export const WithoutBar = (storyProps) => <SurveyScreen {...storyProps} {...props} withoutBar />;

export const WithoutResults = (storyProps) => (
    <SurveyScreen {...storyProps} {...props} withoutPercentage withoutBar />
);

export const WithCallToAction = (storyProps) => (
    <SurveyScreen {...storyProps} {...props} callToAction={callToAction()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
