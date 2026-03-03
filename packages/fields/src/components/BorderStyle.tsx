import classNames from 'classnames';
import React from 'react';

import Radios from './Radios';

import styles from '../styles/border-style.module.css';

interface BorderStyleProps {
    types?: string[];
    value?: string;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

const BorderStyle = ({ types = ['solid', 'dotted', 'dashed'], value = null, className = null, onChange = null }) => {
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
};

export default BorderStyle;
