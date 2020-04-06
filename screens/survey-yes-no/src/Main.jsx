/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { description } from '../../../.storybook/data';

import SurveyYesNoComponent from './SurveyYesNoComponent';

const propTypes = {
    question: MicromagPropTypes.text,
};

const defaultProps = {
    question: { body: description() },
};

const SurveyMain = ({ question, ...otherProps }) => {
    return <SurveyYesNoComponent question={question} {...otherProps} />;
};

SurveyMain.propTypes = propTypes;
SurveyMain.defaultProps = defaultProps;

export default SurveyMain;
