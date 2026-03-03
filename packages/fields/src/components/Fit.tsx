/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import type { ObjectFitSize } from '@micromag/core';
import Radios from './Radios';

import styles from '../styles/fit.module.css';

interface ObjectFitSizeProps {
    values?: ObjectFitSize[];
    value?: ObjectFitSize;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

const ObjectFitSize = ({ values = ['cover', 'contain', null], value = null, className = null, onChange = null }) => (
    <Radios
        options={values.map(val => ({
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

export default ObjectFitSize;
