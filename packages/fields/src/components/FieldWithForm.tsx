import classNames from 'classnames';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import React, { isValidElement } from 'react';
import { FormattedMessage } from 'react-intl';

import type { Field as FieldType, Label as LabelType, Message } from '@micromag/core';
import { ClearButton, Label } from '@micromag/core/components';
import { isMessage } from '@micromag/core/utils';

import Field from './Field';
import Fields from './Fields';

import styles from '../styles/field-with-form.module.css';

function getItemLabel(item, labelPath, defaultValue) {
    return (isArray(labelPath) ? labelPath : [labelPath]).reduce((acc, path) => {
        if (!isEmpty(acc)) {
            return acc;
        }
        return path !== null ? get(item, path, defaultValue) : defaultValue;
    }, defaultValue);
}

export interface FieldWithFormProps {
    value?: unknown | null;
    isForm?: boolean;
    canClear?: boolean;
    label?: React.ReactNode | Message | null;
    thumbnail?: React.ReactNode | null;
    labelPath?: string;
    withTitleLabel?: boolean;
    thumbnailPath?: string;
    noValueLabel?: LabelType | null;
    isHorizontal?: boolean;
    children?: React.ReactNode | null;
    field?: FieldType | null;
    className?: string | null;
    disabled?: boolean;
    onChange?: ((...args: unknown[]) => void) | null;
    closeForm?: ((...args: unknown[]) => void) | null;
}

function FieldWithForm({
    value = null,
    isForm = false,
    canClear = false,
    noValueLabel = null,
    label = null,
    labelPath = 'label',
    withTitleLabel = false,
    thumbnail = null,
    thumbnailPath = 'thumbnail',
    isHorizontal = false,
    className = null,
    onChange = null,
    closeForm = null,
    children = null,
    field = null,
    disabled = false,
    ...props
}: FieldWithFormProps) {
    if (isForm) {
        if (children !== null) {
            return children;
        }
        return field !== null ? (
            <Field
                className="p-2"
                {...field}
                {...props}
                disabled={disabled}
                value={value}
                onChange={onChange}
                buttonTheme="primary"
                canClear={canClear}
            />
        ) : (
            <Fields
                className="p-2"
                {...props}
                disabled={disabled}
                canClear={canClear}
                value={value}
                onChange={onChange}
            />
        );
    }

    const labelValue = label !== null ? label : getItemLabel(value, labelPath, null);

    let labelElement = null;
    let labelString = null;

    if (labelValue !== null && isMessage(labelValue)) {
        labelElement = <FormattedMessage {...labelValue} />;
    } else {
        labelString =
            labelValue !== null && isObject(labelValue)
                ? labelValue.name || labelValue.id || ''
                : labelValue;

        // Strip html
        labelElement =
            labelString !== null && isString(labelString)
                ? labelString.replace(/(<([^>]+)>)/gi, '').replace(/\&nbsp;/g, ' ')
                : null;

        labelElement = isValidElement(labelValue) ? labelValue : labelElement;
    }

    let thumbnailElement = null;
    const thumbnailSrc = get(value, thumbnailPath, null);
    if (thumbnail !== null) {
        thumbnailElement = thumbnail;
    } else if (thumbnailSrc !== null) {
        thumbnailElement = <img src={thumbnailSrc} className={styles.thumbnail} alt={label} />;
    }

    const onClear = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onChange !== null) {
            onChange(null);
        }
    };

    return (
        <span
            className={classNames([
                'align-items-center',
                'mw-100',
                'w-100',
                {
                    row: thumbnailElement === null && labelElement === null,
                    'g-1': thumbnailElement === null && labelElement === null,
                    'flex-nowrap': thumbnailElement !== null || labelElement !== null,
                },
                className,
            ])}
        >
            {thumbnailElement !== null || labelElement !== null ? (
                <span>
                    <span
                        className="row g-1 flex-nowrap align-items-center"
                        title={
                            withTitleLabel && (isString(labelString) || isString(label))
                                ? labelString || label || ''
                                : null
                        }
                    >
                        {!isHorizontal && thumbnailElement !== null ? (
                            <span className="col-auto">{thumbnailElement}</span>
                        ) : null}
                        <span
                            className={classNames([
                                styles.label,
                                'col',
                                'text-monospace',
                                'text-start',
                                'text-truncate',
                                'fw-bold',
                                {
                                    'text-start': !isHorizontal,
                                    'text-end': isHorizontal,
                                },
                            ])}
                        >
                            {labelElement}
                        </span>
                        {isHorizontal && thumbnailElement !== null ? (
                            <span className="col-auto ps-0">{thumbnailElement}</span>
                        ) : null}
                        {value !== null && canClear ? (
                            <span className="col-auto">
                                <ClearButton iconOnly onClick={onClear} disabled={disabled} />
                            </span>
                        ) : null}
                    </span>
                </span>
            ) : (
                <span
                    className={classNames([
                        'col-auto',
                        'text-muted',
                        {
                            'text-start': !isHorizontal,
                            'text-end': isHorizontal,
                            'ms-auto': isHorizontal,
                            // 'text-truncate': isHorizontal,
                        },
                    ])}
                >
                    <Label>
                        {noValueLabel || (
                            <FormattedMessage
                                defaultMessage="Edit content..."
                                description="Label when no value is provided to Field with form"
                            />
                        )}
                    </Label>
                </span>
            )}
        </span>
    );
}

FieldWithForm.withForm = true;

export default FieldWithForm;
