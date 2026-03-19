import classNames from 'classnames';
import React, { useCallback } from 'react';

import { PlaceholderImage, PlaceholderText } from '@micromag/core/components';

import Radios from './Radios';

import styles from '../styles/button-layout.module.css';

interface ButtonLayoutProps {
    types?: string[];
    value?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultTypes = ['label-bottom', 'label-top', 'no-label', 'label-over'];

function ButtonLayout({
    types = defaultTypes,
    value = null,
    className = null,
    onChange = null,
}: ButtonLayoutProps) {
    const onButtonLayoutChange = (newVal) => {
        const v = newVal === value ? null : newVal;
        onChange(v);
    };

    const getLayoutPreviewByType = useCallback((type) => {
        switch (type) {
            case 'label-bottom':
                return (
                    <div>
                        <PlaceholderImage width="1.25em" height="1em" />
                        <PlaceholderText lines={1} lineMargin={1} />
                    </div>
                );
            case 'label-top':
                return (
                    <div>
                        <PlaceholderText lines={1} lineMargin={1} />
                        <PlaceholderImage width="1.25em" height="1em" />
                    </div>
                );
            case 'no-label':
                return (
                    <div>
                        <PlaceholderImage width="1.5em" height="1.5em" />
                    </div>
                );
            case 'label-over':
                return (
                    <div>
                        <PlaceholderImage width="1.5em" height="1.5em" />
                        <PlaceholderText className={styles.placeholderTextOver} lines={1} />
                    </div>
                );
            default:
                return (
                    <div
                        style={
                            {
                                // width: 30,
                                // height: 30,
                                // border: `2px ${type} currentColor`,
                            }
                        }
                    />
                );
        }
    }, []);

    return (
        <div
            className={classNames([
                'd-flex',
                className,
            ])}
        >
            <div className={classNames(['d-inline-flex', 'ms-auto', 'me-auto'])}>
                <Radios
                    options={types.map((type) => ({
                        value: type,
                        label: getLayoutPreviewByType(type),
                    }))}
                    value={value || null}
                    className={classNames([
                        styles.container,
                        className,
                    ])}
                    buttonClassName={styles.button}
                    onChange={onButtonLayoutChange}
                />
            </div>
        </div>
    );
}

export default ButtonLayout;
