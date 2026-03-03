/* eslint-disable react/no-array-index-key, react/button-has-type, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useMemo } from 'react';

import type { SelectOption } from '@micromag/core';
import { Label } from '@micromag/core/components';

import getSelectOptions from '../utils/getSelectOptions';

import styles from '../styles/radios.module.css';

interface RadiosProps {
    name?: string;
    value?: string;
    options?: SelectOption[];
    withBackground?: boolean;
    className?: string;
    buttonClassName?: string;
    activeClassName?: string;
    onChange?: (...args: unknown[]) => void;
    uncheckable?: boolean;
}

function Radios(
    {
        name = null,
        value = null,
        options = [],
        withBackground = false,
        className = null,
        buttonClassName = null,
        activeClassName = null,
        onChange = null,
        uncheckable = false,
    },
) {
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
            {finalOptions.map(({ value: optionValue, label }, index) => (
                <label
                    key={`radio-${optionValue}-${index + 1}`}
                    className={classNames([
                        'btn',
                        styles.item,
                        withBackground ? 'btn-secondary' : 'btn-outline-secondary',
                        {
                            active: optionValue === value,
                            [activeClassName]: activeClassName !== null && optionValue === value,
                            [buttonClassName]: buttonClassName !== null,
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
