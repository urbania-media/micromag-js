/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

const propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errors: MicromagPropTypes.errors,
    required: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    id: null,
    value: null,
    errors: null,
    required: false,
    className: null,
    onChange: null,
};

const TextareaField = ({ id, value, errors, required, className, onChange }) => (
    <textarea
        id={id}
        className={classNames([
            'form-control',
            {
                'is-invalid': errors !== null && errors.length > 0,
                [className]: className !== null,
            },
        ])}
        value={value || ''}
        onChange={({ currentTarget: { value: newValue = '' } }) =>
            onChange !== null ? onChange(!isEmpty(newValue) ? newValue : null) : null
        }
        required={required}
    />
);

TextareaField.propTypes = propTypes;
TextareaField.defaultProps = defaultProps;

export default TextareaField;
