/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { description } from '../../../.storybook/data';

import SurveyMultipleChoiceComponent from './SurveyMultipleChoiceComponent';

const propTypes = {
    question: MicromagPropTypes.text,
    choices: PropTypes.arrayOf(MicromagPropTypes.textComponent),
};

const defaultProps = {
    question: { body: description() },
    choices: [
        { body: description() },
        { body: description() },
        { body: description() },
        { body: description() },
    ],
};

const SurveyMain = ({ question, ...otherProps }) => {
    return <SurveyMultipleChoiceComponent question={question} {...otherProps} />;
};

SurveyMain.propTypes = propTypes;
SurveyMain.defaultProps = defaultProps;

export default SurveyMain;
