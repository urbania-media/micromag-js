/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

interface QuestionFieldProps {
    [key: string]: unknown;
}

function QuestionField(props: QuestionFieldProps) {
    return <Fields isList {...props} />;
}

export default QuestionField;
