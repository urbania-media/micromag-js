/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { defineMessage, useIntl } from 'react-intl';

import type { CustomAnswer as CustomAnswerType } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/custom-answer.module.css';

interface CustomAnswerProps {
    value?: CustomAnswerType;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function CustomAnswer({
    value = null,
    className = null,
    onChange = null,
    ...props
}: CustomAnswerProps) {
    const { active = false } = value || {};
    const intl = useIntl();

    const onUpdateValue = useCallback(
        (newValue) => {
            const { active: wasActive = false } = value || {};
            const { active: nowActive = false, label = null } = newValue || {};
            const finalValue = { ...newValue };
            if (!wasActive && nowActive) {
                if (label === null) {
                    finalValue.label = {
                        body: intl.formatMessage(
                            defineMessage({
                                defaultMessage: 'Screen title',
                                description: 'Field default label',
                            }),
                        ),
                    };
                }
            }
            if (onChange !== null) {
                onChange(finalValue);
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
                    [styles.active]: active,
                },
            ])}
            fieldClassName={styles.field}
            {...props}
            value={value}
            onChange={onUpdateValue}
        />
    );
}

export default CustomAnswer;
