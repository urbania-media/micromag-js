import { FormattedMessage } from 'react-intl';

import type { Answer } from '@micromag/core';

import AnswerField from './Answer';
import ItemsField from './Items';

interface AnswersFieldProps {
    value?: Answer[] | null;
}

function AnswersField({ value: value = null, ...props }: AnswersFieldProps) {
    return (
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
            value={value}
        />
    );
}

export default AnswersField;
