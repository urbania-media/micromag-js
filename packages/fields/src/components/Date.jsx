import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import styles from '../styles/date.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    withTime: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    withTime: false,
    placeholder: null,
    className: null,
    onChange: null,
};

const DateField = ({ name, value, placeholder, className, withTime, onChange }) => {
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
DateField.defaultProps = defaultProps;

export default DateField;
