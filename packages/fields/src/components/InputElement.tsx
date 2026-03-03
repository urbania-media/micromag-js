/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import type { InputElement as InputElementType } from '@micromag/core';
import TextField from './Text';
import TextareaField from './Textarea';

interface TextElementProps {
    value?: InputElementType;
    multiline?: boolean;
    onChange?: (...args: unknown[]) => void;
}

const TextElement = ({ value = null, onChange = null, multiline = false, ...props }) => {
    const labelValue = value !== null ? value.label || null : null;
    const onLabelChange = useCallback(
        (newLabel) => {
            const newValue = {
                ...value,
                label: newLabel,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    return multiline ? (
        <TextareaField {...props} value={labelValue} onChange={onLabelChange} />
    ) : (
        <TextField {...props} value={labelValue} onChange={onLabelChange} />
    );
};

export default TextElement;
