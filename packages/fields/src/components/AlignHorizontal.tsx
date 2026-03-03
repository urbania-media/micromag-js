/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Radios from './Radios';

import styles from '../styles/align-horizontal.module.css';

interface AlignHorizontalProps {
    value?: 'left' | 'middle' | 'right';
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function AlignHorizontal({
    value = null,
    className = null,
    onChange = null,
}: AlignHorizontalProps) {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={classNames(['d-flex', 'align-items-center'])}>
                <Radios
                    options={['left', 'middle', 'right'].map((type) => ({
                        value: type,
                        label: (
                            <div className={classNames([styles.icon, styles[type]])}>
                                <div />
                                <div />
                                <div />
                                <div />
                            </div>
                        ),
                    }))}
                    value={value !== null ? value : null}
                    className={classNames([
                        styles.container,
                        {
                            [className]: className !== null,
                        },
                    ])}
                    buttonClassName={styles.button}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default AlignHorizontal;
