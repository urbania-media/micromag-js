/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import getSelectOptions from '../utils/getSelectOptions';

import styles from '../styles/select.module.scss';

const propTypes = {
    value: PropTypes.string,
    options: MicromagPropTypes.selectOptions,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    options: [],
    disabled: false,
    className: null,
    onChange: null,
};

const SelectField = ({ value, options, disabled, className, onChange }) => {
    const finalOptions = useMemo(() => getSelectOptions(options), [options]);
    return (
        <select
            className={classNames([
                styles.container,
                'form-select',
                {
                    [styles.lightCaret]: !disabled,
                    'bg-dark': !disabled,
                    'text-light': !disabled,
                    'text-dark': disabled,
                    [className]: className !== null,
                },
            ])}
            value={value || ''}
            disabled={disabled}
            onChange={(e) =>
                onChange !== null
                    ? onChange(e.currentTarget.value !== '' ? e.currentTarget.value : null)
                    : null
            }
        >
            <option value="">--</option>
            {finalOptions.map(({ value: optionValue, label: optionLabel }) => (
                <option key={`select-${optionValue}`} value={optionValue}>
                    {optionLabel}
                </option>
            ))}
        </select>
    );
};

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;

export default SelectField;
