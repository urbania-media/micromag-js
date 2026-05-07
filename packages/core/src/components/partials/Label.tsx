import { FormattedMessage } from 'react-intl';

import { type Label as LabelType } from '@micromag/core/types';

import { isMessage } from '../../utils';

const emptyObject = {} as const;

interface LabelProps {
    children: LabelType;
    isHtml?: boolean;
    values?: Record<string, unknown>;
}

function Label({ children, isHtml = false, values = emptyObject }: LabelProps) {
    const Message = isHtml ? FormattedMessage : FormattedMessage;
    return isMessage(children) ? <Message values={values} {...children} /> : children;
}

export default Label;
