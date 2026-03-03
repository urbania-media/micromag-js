/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';

import type { TextElement as TextElementType } from '@micromag/core';
import TextField from './Text';
import EditorField from './TextEditor';
import TextareaField from './Textarea';

interface TextElementProps {
    value?: TextElementType;
    inline?: boolean;
    textOnly?: boolean;
    onChange?: (...args: unknown[]) => void;
    onFocus?: (...args: unknown[]) => void;
    disabled?: boolean;
}

function TextElement(
    { value = null, onChange = null, inline = false, textOnly = false, onFocus = null, disabled = false, ...props },
) {
    const bodyValue = value !== null ? value.body || null : null;
    const textStyleValue = value !== null ? value.textStyle || null : null;
    const onBodyChange = useCallback(
        (newBody) => {
            const newValue = {
                ...value,
                body: newBody,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );

    if (textOnly) {
        return inline ? (
            <TextField
                {...props}
                value={bodyValue}
                onChange={onBodyChange}
                onFocus={onFocus}
                disabled={disabled}
            />
        ) : (
            <TextareaField
                {...props}
                value={bodyValue}
                onChange={onBodyChange}
                onFocus={onFocus}
                disabled={disabled}
            />
        );
    }

    return (
        <EditorField
            {...props}
            inline={inline}
            textStyle={textStyleValue}
            value={bodyValue}
            onChange={onBodyChange}
            onFocus={onFocus}
            disabled={disabled}
        />
    );
}

export default TextElement;
