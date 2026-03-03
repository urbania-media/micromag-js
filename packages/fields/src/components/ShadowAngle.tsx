import classNames from 'classnames';
import React from 'react';

import { getShadowCoords } from '@micromag/core/utils';

import Radios from './Radios';

import styles from '../styles/shadow-angle.module.css';

interface ShadowAngleProps {
    types?: string[];
    value?: string;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function ShadowAngle({
    types = [45, 90, -45, -90],
    value = null,
    className = null,
    onChange = null,
}: ShadowAngleProps) {
    const onShadowAngleChange = (newVal) => {
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
                    options={types.map((type) => {
                        const { x, y } = getShadowCoords(type, 5);
                        return {
                            value: type,
                            label: (
                                <div className={styles.type}>
                                    <div
                                        className={styles.icon}
                                        style={{
                                            border: `2px solid currentColor`,
                                            position: 'relative',
                                            boxShadow: `${x}px ${y}px 0 0 currentColor`,
                                        }}
                                    />
                                </div>
                            ),
                        };
                    })}
                    value={value || null}
                    className={classNames([
                        styles.container,
                        {
                            [className]: className !== null,
                        },
                    ])}
                    buttonClassName={styles.button}
                    onChange={onShadowAngleChange}
                />
            </div>
        </div>
    );
}

export default ShadowAngle;
