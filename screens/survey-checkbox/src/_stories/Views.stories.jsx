/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';

// import SurveyCheckbox from '../index';

import Main from '../components';

export default {
    component: Main,
    title: 'Screens/SurveyCheckbox',
    decorators: [withKnobs, withScreenSize()],
};

export const SurveyCheckbox = () => <Main renderFormat='view' />;
