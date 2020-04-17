/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { description } from '../../../../.storybook/data';

import SurveyYesNoScreen from '../SurveyYesNoScreen';

const propTypes = {
    question: MicromagPropTypes.text,
    result: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textComponent,
    }),
};

const defaultProps = {
    question: { body: description() },
    result: {
        image: { url: 'https://picsum.photos/400/300' },
        text: { body: 'Le résultat de votre quiz' },
    },
};

const SurveyMain = ({ question, result, ...otherProps }) => {
    return <SurveyYesNoScreen question={question} result={result} {...otherProps} />;
};

SurveyMain.propTypes = propTypes;
SurveyMain.defaultProps = defaultProps;

export default SurveyMain;
