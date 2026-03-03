/* eslint-disable react/jsx-props-no-spreading */
// import classNames from 'classnames';
import React, { useCallback } from 'react';
import { FormattedMessage, defineMessage, useIntl } from 'react-intl';

import type { ActiveForm } from '@micromag/core';
import { getStyleFromBox } from '@micromag/core/utils';

// import Fields from './Fields';
import FieldWithForm from './FieldWithForm';

import styles from '../styles/box-style.module.css';

interface CallToActionFormProps {
    value?: ActiveForm;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function CallToActionForm(
    {
        value = null,
        isForm = false,
        className = null,
        onChange = null,
        ...props
    }: CallToActionFormProps,
) {
    // const { active = false } = value || {};
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

    const { paddingRight, paddingBottom, ...stylesWithoutPadding } = getStyleFromBox(value);
    const previewElement =
        value !== null ? (
            <span className={styles.preview}>
                <span
                    className={styles.box}
                    style={{
                        ...stylesWithoutPadding,
                        padding: 0,
                    }}
                />
            </span>
        ) : null;

    return (
        <FieldWithForm
            isForm={isForm}
            className={className}
            value={value}
            label="My default label"
            onChange={onUpdateValue}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Edit call to action..."
                    description="No value label"
                />
            }
            {...props}
        />
    );
}

export default CallToActionForm;
