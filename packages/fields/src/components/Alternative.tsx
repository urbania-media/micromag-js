/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { defineMessage, useIntl } from 'react-intl';

import type { Badge } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/alternative.module.css';

interface AlternativeProps {
    value?: Badge;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function Alternative({
    value = null,
    className = null,
    onChange = null,
    fields,
    toggleLabel,
    ...props
}: AlternativeProps) {
    const finalFields = useMemo(
        () => [
            {
                name: 'active',
                type: 'toggle',
                isHorizontal: true,
                label: toggleLabel,
            },
            ...(value !== null ? fields : []),
        ],
        [fields, value, toggleLabel],
    );

    console.log({
        value,
        fields,
        finalFields,
    });

    const onUpdateValue = useCallback(
        (newValue) => {
            const { active: nowActive = false } = newValue || {};
            if (onChange !== null) {
                onChange(nowActive ? newValue : null);
            }
        },
        [onChange],
    );

    return (
        <Fields
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            fieldClassName={styles.field}
            {...props}
            fields={finalFields}
            value={value}
            onChange={onUpdateValue}
        />
    );
}

export default Alternative;
