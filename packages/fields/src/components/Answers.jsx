/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import ItemsField from './Items';
import AnswerField from './Answer';

const propTypes = {
    value: MicromagPropTypes.answers,
};

const defaultProps = {
    value: null,
};

const AnswersField = (props) => (
    <ItemsField
        noItemLabel={
            <FormattedMessage
                defaultMessage="No answer..."
                description="Label when there is no item in answers field"
            />
        }
        addItemLabel={
            <FormattedMessage
                defaultMessage="Add an answer"
                description="Button label in answers field"
            />
        }
        itemComponent={AnswerField}
        {...props}
    />
);

AnswersField.propTypes = propTypes;
AnswersField.defaultProps = defaultProps;

export default AnswersField;
