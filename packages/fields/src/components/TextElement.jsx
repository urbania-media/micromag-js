/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TextField from './Text';
import EditorField from './TextEditor';
import TextareaField from './Textarea';

const propTypes = {
    value: MicromagPropTypes.textElement,
    inline: PropTypes.bool,
    textOnly: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    disabled: PropTypes.bool,
};

const defaultProps = {
    inline: false,
    textOnly: false,
    value: null,
    onChange: null,
    onFocus: null,
    disabled: false,
};

const TextElement = ({ value, onChange, inline, textOnly, onFocus, disabled, ...props }) => {
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
};

TextElement.propTypes = propTypes;
TextElement.defaultProps = defaultProps;

export default TextElement;
