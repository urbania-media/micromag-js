/* eslint-disable react/no-array-index-key, react/button-has-type, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useMemo } from 'react';

import type { SelectOption } from '@micromag/core';
import { Label } from '@micromag/core/components';

import getSelectOptions from '../utils/getSelectOptions';

import styles from '../styles/radios.module.css';

const emptyArray: never[] = [];

interface RadiosProps {
    name?: string | null;
    value?: string | null;
    options?: SelectOption[];
    withBackground?: boolean;
    className?: string | null;
    buttonClassName?: string | null;
    activeClassName?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
    uncheckable?: boolean;
}

function Radios({
    name = null,
    value = null,
    options = emptyArray,
    withBackground = false,
    className = null,
    buttonClassName = null,
    activeClassName = null,
    onChange = null,
    uncheckable = false,
}: RadiosProps) {
    const finalOptions = useMemo(() => getSelectOptions(options), [options]);

    return (
        <div
            className={classNames([
                'btn-group',
                'btn-group-toggle',
                styles.container,
                className,
            ])}
            data-toggle="buttons"
        >
            {finalOptions.map(({ value: optionValue, label }, index) => (
                <label
                    key={`radio-${optionValue}-${index + 1}`}
                    className={classNames([
                        'btn',
                        styles.item,
                        withBackground ? 'btn-secondary' : 'btn-outline-secondary',
                        buttonClassName,
                        optionValue === value ? activeClassName : null,
                        {
                            active: optionValue === value,
                        },
                    ])}
                >
                    <input
                        type="radio"
                        name={name}
                        autoComplete="off"
                        value={optionValue || ''}
                        className="btn-check"
                        onClick={(e) => {
                            if (onChange !== null) {
                                if (uncheckable && optionValue === value) {
                                    onChange(null);
                                } else {
                                    onChange(e.currentTarget.checked ? optionValue : null);
                                }
                            }
                        }}
                        onChange={() => {}}
                        checked={optionValue === value}
                    />{' '}
                    <Label>{label}</Label>
                </label>
            ))}
        </div>
    );
}

export default Radios;
