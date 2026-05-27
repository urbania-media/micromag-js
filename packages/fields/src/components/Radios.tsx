import classNames from 'classnames';
import React, { Fragment, useId, useMemo } from 'react';

import type { SelectOption } from '@micromag/core';
import { Label } from '@micromag/core/components';

import getSelectOptions from '../utils/getSelectOptions';

const emptyArray: never[] = [];

export interface RadiosProps {
    name?: string | null;
    value?: string | null;
    options?: SelectOption[];
    withBackground?: boolean;
    className?: string | null;
    buttonClassName?: string | null;
    activeClassName?: string | null;
    onChange?: ((newValue: unknown) => void) | null;
    uncheckable?: boolean;
    disabled?: boolean;
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
    disabled = false,
}: RadiosProps) {
    const finalOptions = getSelectOptions(options);
    const id = useId();

    return (
        <div
            className={classNames([
                {
                    'd-inline-flex': className === null || className.indexOf('d-flex') === -1,
                },
                'btn-group',
                'btn-group-toggle',
                'flex-nowrap',
                'overflow-auto',
                'no-scrollbar',
                className,
            ])}
            data-toggle="buttons"
        >
            {finalOptions.map(({ value: optionValue, label }, index) => (
                <Fragment key={`radio-${optionValue}-${index + 1}`}>
                    <input
                        type="radio"
                        name={name}
                        autoComplete="off"
                        value={optionValue || ''}
                        className="btn-check"
                        disabled={disabled}
                        id={`${id}-${index + 1}`}
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
                    />
                    <label
                        className={classNames([
                            'btn',
                            withBackground ? 'btn-body' : 'btn-control',
                            buttonClassName,
                            optionValue === value ? activeClassName : null,
                            {
                                disabled,
                                active: optionValue === value,
                            },
                        ])}
                        htmlFor={`${id}-${index + 1}`}
                    >
                        <Label>{label}</Label>
                    </label>
                </Fragment>
            ))}
        </div>
    );
}

export default Radios;
