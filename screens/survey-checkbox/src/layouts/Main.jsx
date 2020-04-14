/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

// import { description } from '../../../.storybook/data';

import SurveyCheckboxScreen from '../SurveyCheckboxScreen';

const propTypes = {
    question: MicromagPropTypes.textComponent,
    options: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    result: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textComponent,
    }),
};

const defaultProps = {
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

const SurveyMain = ({ question, options, result, ...otherProps }) => {
    return (
        <SurveyCheckboxScreen
            question={question}
            options={options}
            result={result}
            {...otherProps}
        />
    );
};

SurveyMain.propTypes = propTypes;
SurveyMain.defaultProps = defaultProps;

export default SurveyMain;
