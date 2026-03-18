/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { defineMessage, useIntl } from 'react-intl';

import type { CallToAction as CallToActionType } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/call-to-action.module.css';

interface CallToActionProps {
    value?: CallToActionType | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function CallToAction({
    value = null,
    className = null,
    onChange = null,
    ...props
}: CallToActionProps) {
    const { active = false } = value || {};
    const intl = useIntl();

    // set default type and label
    const onUpdateValue = useCallback(
        (newValue) => {
            const { active: wasActive = false } = value || {};
            const { active: nowActive = false, type = null, label = null } = newValue || {};

            const finalValue = { ...newValue };
            if (!wasActive && nowActive) {
                if (type === null) {
                    finalValue.type = 'swipe-up';
                }
                if (label === null) {
                    finalValue.label = {
                        body: intl.formatMessage(
                            defineMessage({
                                defaultMessage: 'Learn more',
                                description: 'Call to action default label',
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
                className,
                {
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

export default CallToAction;
