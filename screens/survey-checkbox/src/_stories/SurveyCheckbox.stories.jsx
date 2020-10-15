/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import SurveyCheckbox from '../SurveyCheckbox';
import definition from '../definition';

const props = {
    question: { body: 'Voici une question à répondre' },
    options: [
        { body: 'La première réponse' },
        { body: 'La deuxième réponse' },
        { body: 'La troixième réponse' },
    ],
    result: {
        image: { url: 'https://picsum.photos/400/300' },
        text: { body: 'Le résultat de votre quiz' },
    },
};

export default {
    title: 'Screens/SurveyCheckbox',
    component: SurveyCheckbox,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <SurveyCheckbox {...storyProps} />;

export const Preview = (storyProps) => <SurveyCheckbox {...storyProps} />;

export const Edit = (storyProps) => <SurveyCheckbox {...storyProps} />;

export const Normal = (storyProps) => <SurveyCheckbox {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
