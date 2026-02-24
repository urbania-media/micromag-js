import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import styles from '../styles/date.module.css';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    withTime: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const DateField = ({ name = null, value = null, placeholder = null, className = null, withTime = false, onChange = null }) => {
    const onInputChange = useCallback(
        (e) => {
            if (onChange !== null) {
                const val = e.currentTarget.value || null;
                onChange(val);
            }
        },
        [onChange],
    );

    return (
        <div className={classNames([styles.container, { [className]: className !== null }])}>
            <input
                type={withTime ? 'datetime-local' : 'date'}
                className={classNames([styles.input, 'form-control', 'ms-auto'])}
                name={name}
                value={value !== null ? value : ''}
                autoComplete="off"
                onChange={onInputChange}
                placeholder={placeholder}
            />
        </div>
    );
};

DateField.propTypes = propTypes;

export default DateField;
