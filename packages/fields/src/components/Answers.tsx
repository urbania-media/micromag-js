/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// // import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import type { Answer } from '@micromag/core';
import ItemsField from './Items';
import AnswerField from './Answer';

interface AnswersFieldProps {
    value?: Answer[];
}

const AnswersField = (
    {
        value: value = null,
        ...props
    },
) => (<ItemsField
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
/>);

export default AnswersField;
