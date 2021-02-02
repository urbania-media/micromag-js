/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isEqual from 'lodash/isEqual';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { selectTheme } from '../utils/selectTheme';
import getSelectOptions from '../utils/getSelectOptions';

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

const SelectAdvancedField = ({ value, options, disabled, className, onChange, ...props }) => {
    const finalOptions = useMemo(() => getSelectOptions(options), [options]);

    const onChangeOption = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange(newValue !== null && newValue.value ? newValue.value : null);
            }
        },
        [onChange],
    );

    const optionValue = useMemo(
        () =>
            finalOptions.find((opt) => {
                if ((isString(value) || isNumber(value)) && opt.label !== null) {
                    return opt.value === value;
                }
                return isEqual(value, opt.value);
            }),
        [value, options],
    );

    return (
        <Select
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
            isClearable
            {...props}
            value={optionValue || value || null}
            options={finalOptions}
            disabled={disabled}
            onChange={onChangeOption}
            theme={selectTheme}
        />
    );
};

SelectAdvancedField.propTypes = propTypes;
SelectAdvancedField.defaultProps = defaultProps;

export default SelectAdvancedField;
