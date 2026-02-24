/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/date.module.css';

const propTypes = {
    name: PropTypes.string,
    value: MicromagPropTypes.textElement,
    withTime: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

const DateElement = ({ name = null, value = null, withTime = false, onChange = null, placeholder = null }) => {
    const bodyValue = value !== null ? value.body || null : null;
    const onBodyChange = useCallback(
        (e) => {
            const val = e.currentTarget.value || null;
            const newValue = {
                ...value,
                body: val,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );

    return (
        <input
            type={withTime ? 'datetime-local' : 'date'}
            className={classNames([styles.input, 'form-control', 'ms-auto'])}
            name={name}
            value={bodyValue !== null ? bodyValue : ''}
            autoComplete="off"
            onChange={onBodyChange}
            placeholder={placeholder}
        />
    );
};

DateElement.propTypes = propTypes;

export default DateElement;
