/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TextField from './Text';
import TextareaField from './Textarea';
import EditorField from './TextEditor';

const propTypes = {
    value: MicromagPropTypes.textElement,
    multiline: PropTypes.bool,
    textOnly: PropTypes.bool,
    onChange: PropTypes.func,
};

const defaultProps = {
    multiline: false,
    textOnly: false,
    value: null,
    onChange: null,
};

const TextElement = ({ value, onChange, multiline, textOnly, ...props }) => {
    const bodyValue = value !== null ? value.body || null : null;
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
        return multiline ? (
            <TextareaField {...props} value={bodyValue} onChange={onBodyChange} />
        ) : (
            <TextField {...props} value={bodyValue} onChange={onBodyChange} />
        );
    }
    return <EditorField {...props} inline value={bodyValue} onChange={onBodyChange} />;
};

TextElement.propTypes = propTypes;
TextElement.defaultProps = defaultProps;

export default TextElement;
