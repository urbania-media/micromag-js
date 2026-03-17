import classNames from 'classnames';
import React from 'react';

import Radios from './Radios';

import styles from '../styles/border-style.module.css';

interface BorderStyleProps {
    types?: string[];
    value?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultTypes = ['solid', 'dotted', 'dashed'];

function BorderStyle({
    types = defaultTypes,
    value = null,
    className = null,
    onChange = null,
}: BorderStyleProps) {
    const onBorderStyleChange = (newVal) => {
        const v = newVal === value ? null : newVal;
        onChange(v);
    };

    return (
        <div
            className={classNames([
                'd-flex',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={classNames(['d-inline-flex', 'ms-auto', 'me-auto'])}>
                <Radios
                    options={types.map((type) => ({
                        value: type,
                        label: (
                            <div className={styles.type}>
                                <div
                                    className={styles.borders}
                                    style={{
                                        border: `2px ${type} currentColor`,
                                    }}
                                />
                            </div>
                        ),
                    }))}
                    value={value || null}
                    className={classNames([
                        styles.container,
                        {
                            [className]: className !== null,
                        },
                    ])}
                    buttonClassName={styles.button}
                    onChange={onBorderStyleChange}
                />
            </div>
        </div>
    );
}

export default BorderStyle;
