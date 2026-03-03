/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import type { FormField, Label as LabelType, Message } from '@micromag/core';
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

interface FieldWithFormProps {
    value?: unknown;
    isForm?: boolean;
    canClear?: boolean;
    label?: React.ReactNode | Message;
    thumbnail?: React.ReactNode;
    labelPath?: string;
    withTitleLabel?: boolean;
    thumbnailPath?: string;
    noValueLabel?: LabelType;
    isHorizontal?: boolean;
    children?: React.ReactNode;
    field?: FormField;
    className?: string;
    onChange?: (...args: unknown[]) => void;
    closeForm?: (...args: unknown[]) => void;
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
    ...props
}) {
    if (isForm) {
        if (children !== null) {
            return children;
        }
        return field !== null ? (
            <Field
                className="p-2"
                {...field}
                {...props}
                value={value}
                onChange={onChange}
                buttonTheme="primary"
                canClear={canClear}
            />
        ) : (
            <Fields
                className="p-2"
                {...props}
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
                ? labelString.replace(/(<([^>]+)>)/gi, '')
                : null;

        labelElement = React.isValidElement(labelValue) ? labelValue : labelElement;
    }

    const thumbnailElement = useMemo(() => {
        let thumbElement = null;
        const thumbnailSrc = get(value, thumbnailPath, null);
        if (thumbnail !== null) {
            thumbElement = thumbnail;
        } else if (thumbnailSrc !== null) {
            thumbElement = <img src={thumbnailSrc} className={styles.thumbnail} alt={label} />;
        }
        return thumbElement;
    }, [value, thumbnailPath, thumbnail, label]);

    const onClear = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onChange !== null) {
                onChange(null);
            }
        },
        [onChange],
    );

    return (
        <span
            className={classNames([
                'align-items-center',
                'flex-nowrap',
                'mw-100',
                'w-100',
                {
                    row: thumbnailElement === null && labelElement === null,
                },
                className,
            ])}
        >
            {thumbnailElement !== null || labelElement !== null ? (
                <span>
                    <span
                        className="row px-1"
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
                            <ClearButton className={styles.clearButton} onClick={onClear} />
                        ) : null}
                    </span>
                </span>
            ) : (
                <span
                    className={classNames([
                        'col',
                        'text-body-secondary',
                        {
                            'text-start': !isHorizontal,
                            'text-end': isHorizontal,
                            'text-truncate': isHorizontal,
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
