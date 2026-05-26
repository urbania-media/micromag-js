import classNames from 'classnames';

import type { ImageMedia } from '@micromag/core';

import Fields from './Fields';

interface AnswerFieldProps {
    value?: { text?: string; image?: ImageMedia } | null;
    isForm?: boolean;
    className?: string | null;
}

function AnswerField({
    value = null,
    isForm = false,
    className = null,
    ...props
}: AnswerFieldProps) {
    const { text = null } = value || {};
    return isForm ? (
        <Fields
            className={classNames([
                className,
                {
                    'p-2': isForm,
                },
            ])}
            {...props}
            isForm={isForm}
            value={value}
        />
    ) : (
        <div className={className}>
            {text !== null ? text : <span className="text-muted">Entrez une question...</span>}
        </div>
    );
}

export default AnswerField;
