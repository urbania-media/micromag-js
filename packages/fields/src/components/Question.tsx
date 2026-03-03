/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

interface QuestionFieldProps {
    [key: string]: unknown;
}

const QuestionField = props => <Fields isList {...props} />;

export default QuestionField;
