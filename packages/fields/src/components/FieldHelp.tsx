/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { Label as LabelType } from '@micromag/core';
import { Label } from '@micromag/core/components';

interface FieldErrorsProps {
    children?: LabelType;
    muted?: boolean;
    className?: string;
}

function FieldErrors({ children = null, muted = true, className = null }) {
    return (
        <small
            id="passwordHelpBlock"
            className={classNames([
                'form-text',
                {
                    'text-body-secondary': muted,
                    [className]: className !== null,
                },
            ])}
        >
            <Label>{children}</Label>
        </small>
    );
}

export default FieldErrors;
