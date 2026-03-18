import classNames from 'classnames';
import React from 'react';

import { getShadowCoords } from '@micromag/core/utils';

import Radios from './Radios';

import styles from '../styles/shadow-angle.module.css';

interface ShadowAngleProps {
    types?: string[];
    value?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultTypes = [45, 90, -45, -90];

function ShadowAngle({
    types = defaultTypes,
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
                className,
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
                        className,
                    ])}
                    buttonClassName={styles.button}
                    onChange={onShadowAngleChange}
                />
            </div>
        </div>
    );
}

export default ShadowAngle;
