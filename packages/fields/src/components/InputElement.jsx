/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TextField from './Text';
import TextareaField from './Textarea';

const propTypes = {
    value: MicromagPropTypes.inputElement,
    multiline: PropTypes.bool,
    onChange: PropTypes.func,
};

const defaultProps = {
    multiline: false,
    value: null,
    onChange: null,
};

const TextElement = ({ value, onChange, multiline, ...props }) => {
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

TextElement.propTypes = propTypes;
TextElement.defaultProps = defaultProps;

export default TextElement;
