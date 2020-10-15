/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import SurveyYesNo from '../SurveyYesNo';
import definition from '../definition';

const props = {
};

export default {
    title: 'Screens/SurveyYesNo',
    component: SurveyYesNo,
    parameters: {
        intl: true,
        screenDefinition: definition,
    }
};

export const Placeholder = (storyProps) => <SurveyYesNo {...storyProps} />;

export const Preview = (storyProps) => <SurveyYesNo {...storyProps} />;

export const Edit = (storyProps) => <SurveyYesNo {...storyProps} />;

export const Normal = (storyProps) => <SurveyYesNo {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
