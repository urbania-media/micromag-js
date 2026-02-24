/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const QuestionField = props => <Fields isList {...props} />;

QuestionField.propTypes = propTypes;

export default QuestionField;
