/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import EditorField from './TextEditor';

const propTypes = {
    value: MicromagPropTypes.textElement,
    fieldType: PropTypes.oneOf(['single', 'multi', 'rich']),
    onChange: PropTypes.func,
};

const defaultProps = {
    fieldType: 'single',
    value: null,
    onChange: null,
};

const TextElement = ({ value, onChange, fieldType, ...props }) => {
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
    return (
        <EditorField
            {...props}
            inline={fieldType === 'single' || fieldType === 'multi'}
            value={bodyValue}
            onChange={onBodyChange}
        />
    );
};

TextElement.propTypes = propTypes;
TextElement.defaultProps = defaultProps;

export default TextElement;
