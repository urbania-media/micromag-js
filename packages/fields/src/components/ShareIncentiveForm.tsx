/* eslint-disable react/jsx-props-no-spreading */
// import classNames from 'classnames';
import React, { useCallback } from 'react';
import { FormattedMessage, defineMessage, useIntl } from 'react-intl';

import type { ActiveForm } from '@micromag/core';

// import { getStyleFromBox } from '@micromag/core/utils';
// import styles from '../styles/box-style.module.css';
// import Fields from './Fields';
import FieldWithForm from './FieldWithForm';

interface ShareIncentiveFormProps {
    value?: ActiveForm;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function ShareIncentiveForm(
    {
        value = null,
        isForm = false,
        className = null,
        onChange = null,
        ...props
    }: ShareIncentiveFormProps,
) {
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
                                defaultMessage: 'Share this Micromag!',
                                description: 'Share Incentive default label',
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
        <FieldWithForm
            isForm={isForm}
            className={className}
            value={value}
            onChange={onUpdateValue}
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

export default ShareIncentiveForm;
