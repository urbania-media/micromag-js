/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { description } from '../../../.storybook/data';

import SurveyYesNoComponent from './SurveyCheckboxComponent';

const propTypes = {
    question: MicromagPropTypes.text,
    choices: PropTypes.arrayOf(MicromagPropTypes.textComponent)
};

const defaultProps = {
    question: { body: description() },
    choices: null,
};

const SurveyMain = ({ question, choices, ...otherProps }) => {
    return <SurveyYesNoComponent question={question} {...otherProps} />;
};

SurveyMain.propTypes = propTypes;
SurveyMain.defaultProps = defaultProps;

export default SurveyMain;
