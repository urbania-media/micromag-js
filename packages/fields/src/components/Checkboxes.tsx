/* eslint-disable react/no-array-index-key, react/button-has-type, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import React, { useMemo } from 'react';

import type { SelectOption } from '@micromag/core';
import getSelectOptions from '../utils/getSelectOptions';

import styles from '../styles/checkboxes.module.css';

interface CheckboxesProps {
    name?: string;
    value?: string[];
    singleChoice?: boolean;
    options?: SelectOption[];
    className?: string;
    buttonClassName?: string;
    onChange?: (...args: unknown[]) => void;
}

const Checkboxes = ({
    name = null,
    value = null,
    singleChoice = false,
    options = [],
    className = null,
    buttonClassName = null,
    onChange = null,
}) => {
    const finalOptions = useMemo(() => getSelectOptions(options), [options]);
    return (
        <div
            className={classNames([
                'btn-group',
                'btn-group-toggle',
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            data-toggle="buttons"
        >
            {finalOptions.map(({ value: optionValue, label }) => {
                const active =
                    (value !== null && isArray(value) && value.indexOf(optionValue) !== -1) ||
                    (!isArray(value) && value === optionValue);

                return (
                    <label
                        key={`radio-${optionValue}`}
                        className={classNames([
                            'btn',
                            'btn-outline-secondary',
                            styles.item,
                            {
                                [buttonClassName]: buttonClassName !== null,
                                active,
                            },
                        ])}
                    >
                        <input
                            type="checkbox"
                            name={`${name}[]`}
                            autoComplete="off"
                            value={optionValue}
                            className="btn-check"
                            onChange={(e) => {
                                let newValue = null;
                                if (!singleChoice) {
                                    newValue = value || [];
                                    if (e.currentTarget.checked) {
                                        newValue.push(optionValue);
                                    } else {
                                        newValue =
                                            value !== null
                                                ? value.filter((it) => it !== optionValue)
                                                : null;
                                    }
                                    if (newValue.length === 0) {
                                        newValue = null;
                                    }
                                } else if (e.currentTarget.checked) {
                                    newValue = optionValue;
                                } else {
                                    newValue = null;
                                }
                                if (onChange !== null) {
                                    onChange(newValue);
                                }
                            }}
                            checked={active}
                        />{' '}
                        {label}
                    </label>
                );
            })}
        </div>
    );
};

export default Checkboxes;
