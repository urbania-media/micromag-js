/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { ObjectFitSize as ObjectFitSizeType } from '@micromag/core';

import Radios from './Radios';

import styles from '../styles/fit.module.css';

interface ObjectFitSizeProps {
    values?: ObjectFitSizeType[];
    value?: ObjectFitSizeType | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultValues = ['cover', 'contain', null];

function ObjectFitSize({
    values = defaultValues,
    value = null,
    className = null,
    onChange = null,
}: ObjectFitSizeProps) {
    return (
        <Radios
            options={values.map((val) => ({
                value: val,
                label: (
                    <div className={classNames([styles.frame, styles[val || 'none']])}>
                        <div className={styles.shape}>
                            <div className={styles.inner}>
                                <div className={styles.media} />
                            </div>
                        </div>
                    </div>
                ),
            }))}
            value={value}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            buttonClassName={styles.button}
            onChange={onChange}
        />
    );
}

export default ObjectFitSize;
