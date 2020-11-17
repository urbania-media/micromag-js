/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import SurveyScreen from '../Survey';
import definition from '../definition';

const props = {
    question: { body: 'Une vraie question qui se termine par un point d’interrogation?' },
    options: [
        { id: 1, label: { body: 'Choix 1' }, percent: 34 },
        { id: 2, label: { body: 'Choix 2' }, percent: 12 },
        { id: 3, label: { body: 'Choix plus long' }, percent: 38 },
        { id: 4, label: { body: 'Choix 4' }, percent: 16 },
    ],
};

export default {
    title: 'Screens/Survey',
    component: SurveyScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <SurveyScreen {...storyProps} />;

export const Preview = (storyProps) => <SurveyScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <SurveyScreen {...storyProps} />;

export const Normal = (storyProps) => <SurveyScreen {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
