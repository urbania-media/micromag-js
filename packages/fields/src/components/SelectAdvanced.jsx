/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import Select from 'react-select';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import getSelectOptions from '../utils/getSelectOptions';
import { selectTheme } from '../utils/selectTheme';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    options: MicromagPropTypes.selectOptions,
    withoutReset: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    options: [],
    withoutReset: false,
    disabled: false,
    className: null,
    onChange: null,
};

const SelectAdvancedField = ({
    name,
    value,
    options,
    withoutReset,
    disabled,
    className,
    onChange,
    ...props
}) => {
    const finalOptions = useMemo(() => getSelectOptions(options), [options]);
    const intl = useIntl();
    const translatedOptions = useMemo(() =>
        finalOptions.map(({ label, ...option }) => ({
            ...option,
            label: typeof label === 'object' ? intl.formatMessage(label) : label,
        })),
    );
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
            translatedOptions.find((opt) =>
                opt.value !== null ? isEqual(value, opt.value) : false,
            ),
        [value, options],
    );

    return (
        <Select
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
            isClearable={!withoutReset}
            {...props}
            id={name}
            name={name}
            value={optionValue || value || null}
            options={translatedOptions}
            disabled={disabled}
            onChange={onChangeOption}
            theme={selectTheme}
        />
    );
};

SelectAdvancedField.propTypes = propTypes;
SelectAdvancedField.defaultProps = defaultProps;

export default SelectAdvancedField;
