/* eslint-disable react/no-array-index-key, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';

import type { TextElement } from '@micromag/core';

import styles from './styles.module.css';

interface CheckboxProps {
    option?: TextElement;
    value?: boolean;
    onChange?: (...args: unknown[]) => void;
    focusable?: boolean;
    checkboxStyle?: Record<string, unknown>;
    className?: string;
}

function Checkbox({
    option = null,
    value = null,
    onChange = null,
    focusable = true,
    checkboxStyle = null,
    className = null,
}: CheckboxProps) {
    const { body = null } = option || {};
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ ...checkboxStyle }}
        >
            <label
                className={classNames([
                    styles.label,
                    {
                        active: body === value,
                    },
                ])}
            >
                <input
                    className={styles.input}
                    type="checkbox"
                    autoComplete="off"
                    value={value === true}
                    checked={value === true}
                    tabIndex={focusable ? '0' : '-1'}
                    onChange={() => {
                        if (onChange !== null) {
                            onChange(!value);
                        }
                    }}
                />
                {body}
            </label>
        </div>
    );
}

export default Checkbox;
