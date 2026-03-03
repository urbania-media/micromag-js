/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { selectTheme } from '../utils/selectTheme';

import styles from '../styles/tokens.module.css';

interface TokensProps {
    value?: unknown[] | null;
    onChange?: ((...args: unknown[]) => void) | null;
    options?: (Record<string, unknown> | string)[];
    loadOptions?: ((...args: unknown[]) => void) | null;
    getOptionLabel?: (...args: unknown[]) => void;
    getOptionValue?: (...args: unknown[]) => void;
    getNewOptionData?: (...args: unknown[]) => void;
    className?: string | null;
}

function Tokens({
    value = null,
    options = [],
    loadOptions = null,
    getOptionLabel = undefined,
    getOptionValue = undefined,
    getNewOptionData = undefined,
    onChange = null,
    className = null,
}: TokensProps) {
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
                placeholder={
                    <FormattedMessage
                        defaultMessage="Add tags..."
                        description="Dropdown select label"
                    />
                }
                theme={selectTheme}
            />
        </div>
    );
}

export default Tokens;
