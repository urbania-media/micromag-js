/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { isMessage } from '../../utils';

interface LabelProps {
    children: Label;
    isHtml?: boolean;
    values?: Record<string, unknown>;
}

function Label({ children, isHtml = false, values = {} }: LabelProps) {
    const Message = isHtml ? FormattedMessage : FormattedMessage;
    return isMessage(children) ? <Message values={values} {...children} /> : children;
}

export default Label;
