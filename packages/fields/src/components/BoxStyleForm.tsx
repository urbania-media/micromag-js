/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { BoxStyle, FormField } from '@micromag/core';
import { getStyleFromBox } from '@micromag/core/utils';

import FieldWithForm from './FieldWithForm';

import styles from '../styles/box-style.module.css';

interface BoxStyleFormProps {
    value?: BoxStyle | null;
    fields?: FormField[] | null;
    isForm?: boolean | null;
    isHorizontal?: boolean;
    withAlignment?: boolean;
    className?: string;
    onChange?: ((...args: unknown[]) => void) | null;
    closeForm?: ((...args: unknown[]) => void) | null;
}

function BoxStyleForm({
    value = null,
    fields = null,
    onChange = null,
    closeForm = null,
    withAlignment = false,
    isForm = null,
    ...props
}: BoxStyleFormProps) {
    const previewElement =
        value !== null ? (
            <span className={styles.preview}>
                <span
                    className={styles.box}
                    style={{
                        ...getStyleFromBox(value),
                        padding: 0,
                    }}
                />
            </span>
        ) : null;

    return (
        <FieldWithForm
            isForm={isForm}
            value={value}
            fields={fields}
            onChange={onChange}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage defaultMessage="Edit style..." description="No value label" />
            }
            {...props}
        />
    );
}

BoxStyleForm.withForm = true;

export default BoxStyleForm;
