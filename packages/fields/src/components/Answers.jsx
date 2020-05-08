/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import ItemsField from './Items';
import AnswerField from './Answer';

const messages = defineMessages({
    noAnswer: {
        id: 'answers.no_answer',
        defaultMessage: 'No answer...',
    },
    addAnswer: {
        id: 'answers.add_answer',
        defaultMessage: 'Add an answer',
    },
});

const propTypes = {
    value: MicromagPropTypes.answers,
};

const defaultProps = {
    value: null,
};

const AnswersField = props => (
    <ItemsField
        noItemLabel={messages.noAnswer}
        addItemLabel={messages.addAnswer}
        ItemComponent={AnswerField}
        {...props}
    />
);

AnswersField.propTypes = propTypes;
AnswersField.defaultProps = defaultProps;

export default AnswersField;
