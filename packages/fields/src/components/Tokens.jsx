/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import AsyncCreatableSelect from 'react-select/async-creatable';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { selectTheme } from '../utils/selectTheme';

import styles from '../styles/tokens.module.scss';

const propTypes = {
    value: PropTypes.array, // eslint-disable-line
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
    loadOptions: PropTypes.func,
    getOptionLabel: PropTypes.func,
    getOptionValue: PropTypes.func,
    getNewOptionData: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    options: [],
    loadOptions: null,
    getOptionLabel: undefined,
    getOptionValue: undefined,
    getNewOptionData: undefined,
    onChange: null,
    className: null,
};

const Tokens = ({
    value,
    options,
    loadOptions,
    getOptionLabel,
    getOptionValue,
    getNewOptionData,
    onChange,
    className,
}) => {
    const filterOptions = useCallback(
        (inputValue) =>
            new Promise((resolve) => {
                const filtered = options.filter((it) =>
                    it.label.toLowerCase().includes(inputValue.toLowerCase()),
                );
                resolve(filtered);
            }),
        [options],
    );

    const onTokenChange = useCallback((newValue) =>
        onChange !== null ? onChange(newValue) : null,
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <AsyncCreatableSelect
                isMulti
                loadOptions={loadOptions || filterOptions}
                defaultOptions={options}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                getNewOptionData={getNewOptionData}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                }}
                onChange={onTokenChange}
                value={value}
                placeholder={<FormattedMessage
                    defaultMessage="Add tags..."
                    description="Dropdown select label"
                /> }
                theme={selectTheme}
            />
        </div>
    );
};

Tokens.propTypes = propTypes;
Tokens.defaultProps = defaultProps;

export default Tokens;
