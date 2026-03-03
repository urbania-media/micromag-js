/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import type { Label as LabelType } from '@micromag/core';
import { Label } from '@micromag/core/components';

interface FieldErrorsProps {
    children?: LabelType;
    muted?: boolean;
    className?: string;
}

const FieldErrors = ({ children = null, muted = true, className = null }) => (
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

export default FieldErrors;
