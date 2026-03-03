/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback } from 'react';

import Fields from './Fields';

import styles from '../styles/toggle-section.module.css';

interface ToggleSectionProps {
    value?: Record<string, unknown>;
    toggleField?: string;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function ToggleSection({
    value = null,
    toggleField = null,
    className = null,
    onChange = null,
    ...props
}: ToggleSectionProps) {
    const { enabled = false } = value || {};
    const valueEnabled = toggleField !== null ? value?.[toggleField] || false : enabled;

    const onUpdateValue = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange, value],
    );

    return (
        <Fields
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.enabled]: valueEnabled,
                },
            ])}
            fieldClassName={styles.field}
            {...props}
            value={value}
            onChange={onUpdateValue}
        />
    );
}

export default ToggleSection;
