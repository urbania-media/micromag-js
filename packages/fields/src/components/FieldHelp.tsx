/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { Label as LabelType } from '@micromag/core';
import { Label } from '@micromag/core/components';

interface FieldErrorsProps {
    children?: LabelType | null;
    muted?: boolean;
    className?: string | null;
}

function FieldErrors({ children = null, muted = true, className = null }: FieldErrorsProps) {
    return (
        <small
            id="passwordHelpBlock"
            className={classNames([
                'form-text',
                className,
                {
                    'text-body-secondary': muted,
                },
            ])}
        >
            <Label>{children}</Label>
        </small>
    );
}

export default FieldErrors;
