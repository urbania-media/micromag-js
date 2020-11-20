/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../../lib/PropTypes';
import * as PanneauPropTypes from '../../../lib/panneau/PropTypes';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    errors: AppPropTypes.formErrors,
    size: PropTypes.oneOf(['sm', 'lg']),
    required: PropTypes.bool,
    options: PanneauPropTypes.fieldOptions,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    errors: null,
    size: null,
    required: false,
    options: [],
    className: null,
    onChange: null,
};

const SelectField = ({
    name,
    value,
    errors,
    size,
    required,
    options,
    onChange,
    className,
}) => {
    const onInputChange = useCallback(
        (e) => {
            if (onChange !== null) {
                onChange(e.currentTarget.value);
            }
        },
        [onChange],
    );
    return (
        <select
            name={name}
            value={value}
            onChange={onInputChange}
            required={required}
            className={classNames([
                'form-control',
                {
                    'is-invalid': errors !== null,
                    [`form-control-${size}`]: size !== null,
                    [className]: className !== null,
                },
            ])}
        >
            {options.map(({ value: optionValue, label: optionLabel }) => (
                <option key={`option-${optionValue}`} value={optionValue}>
                    {optionLabel}
                </option>
            ))}
        </select>
    );
};

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;

export default SelectField;
