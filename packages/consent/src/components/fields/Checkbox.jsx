/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import styles from '../../styles/fields/checkbox.module.scss';

const propTypes = {
    name: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    label: null,
    disabled: false,
    className: null,
    onClick: null,
    onChange: null,
};

function CheckboxField({ name, label, value, disabled, onClick, onChange, className }) {
    const onInputChange = useCallback(
        (e) => {
            if (onChange !== null) {
                onChange(e.currentTarget.checked);
            }
        },
        [onChange],
    );
    return (
        <label
            htmlFor={name}
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: disabled,
                    [className]: className !== null,
                },
            ])}
        >
            <span className={styles.check}>
                <input
                    type="checkbox"
                    name={name}
                    id={name}
                    disabled={disabled}
                    checked={value || false}
                    onChange={onClick || onInputChange}
                    className={styles.input}
                />
            </span>
            <span className={styles.label}>
                {isString(label) ? label : <FormattedMessage {...label} />}
            </span>
        </label>
    );
}

CheckboxField.propTypes = propTypes;
CheckboxField.defaultProps = defaultProps;

export default CheckboxField;
