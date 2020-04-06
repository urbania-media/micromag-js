/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';

import SurveyMultipleChoice from '../index';

import Main from '../components';

export default {
    component: Main,
    title: 'Screens/SurveyMultipleChoice',
    decorators: [withKnobs, withScreenSize()],
};

export const Layouts = () => <SurveyMultipleChoice layout={select('text')} />;
