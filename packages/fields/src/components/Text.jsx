/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

const propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'number', 'password']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errors: MicromagPropTypes.errors,
    required: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    type: 'text',
    value: null,
    errors: null,
    required: false,
    className: null,
    onChange: null,
};

const TextField = ({ type, value, errors, required, className, onChange }) => (
    <input
        type={type}
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

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default TextField;
