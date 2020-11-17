/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TextField from './Text';

const propTypes = {
    value: MicromagPropTypes.textElement,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    onChange: null,
};

const TextElement = ({ value, onChange, ...props }) => {
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
    return <TextField {...props} value={bodyValue} onChange={onBodyChange} />;
};

TextElement.propTypes = propTypes;
TextElement.defaultProps = defaultProps;

export default TextElement;
