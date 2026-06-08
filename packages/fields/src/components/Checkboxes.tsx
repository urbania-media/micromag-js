import classNames from 'classnames';
import isArray from 'lodash-es/isArray';
import { Fragment, useId } from 'react';

import type { SelectOption } from '@micromag/core';

import getSelectOptions from '../utils/getSelectOptions';

const emptyArray: never[] = [];

interface CheckboxesProps {
    name?: string | null;
    value?: string[] | null;
    options?: SelectOption[];
    className?: string | null;
    buttonClassName?: string | null;
    onChange?: ((newValue: string[] | null) => void) | null;
    disabled?: boolean;
}

function Checkboxes({
    name = null,
    value = null,
    options = emptyArray,
    className = null,
    buttonClassName = null,
    onChange = null,
    disabled = false,
}: CheckboxesProps) {
    const finalOptions = getSelectOptions(options);
    const id = useId();
    const onInputChange = (e) => {
        const optionValue = e.currentTarget.value;
        let newValue = [...(value || [])];
        if (e.currentTarget.checked && newValue.indexOf(optionValue) === -1) {
            newValue.push(optionValue);
        } else if (!e.currentTarget.checked && newValue.indexOf(optionValue) !== -1) {
            newValue = value !== null ? value.filter((it) => it !== optionValue) : null;
        }
        if (newValue.length === 0) {
            newValue = null;
        }
        if (onChange !== null) {
            onChange(newValue);
        }
    };
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
            {finalOptions.map(({ value: optionValue, label }, index) => {
                const checked =
                    value !== null && isArray(value) && value.indexOf(optionValue) !== -1;

                return (
                    <Fragment key={`radio-${optionValue}-${index}`}>
                        <input
                            type="checkbox"
                            name={`${name}[]`}
                            autoComplete="off"
                            value={optionValue}
                            className="btn-check"
                            id={`${id}-${index}`}
                            onChange={onInputChange}
                            checked={checked}
                            disabled={disabled}
                        />
                        <label
                            className={classNames([
                                'btn',
                                'btn-control',
                                buttonClassName,
                                {
                                    disabled,
                                    active: checked,
                                },
                            ])}
                            htmlFor={`${id}-${index}`}
                        >
                            {label}
                        </label>
                    </Fragment>
                );
            })}
        </div>
    );
}

export default Checkboxes;
