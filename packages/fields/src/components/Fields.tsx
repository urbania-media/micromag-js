import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import type { FormErrors, FormField } from '@micromag/core';
import { Button } from '@micromag/core/components';
import { FieldsValueContextProvider } from '@micromag/core/contexts';
import { createNullableOnChange } from '@micromag/core/utils';

import Field from './Field';
import FieldRow from './FieldRow';

import styles from '../styles/fields.module.css';

const emptyArray: never[] = [];

interface FieldsProps {
    name?: string | null;
    fields?: FormField[];
    excludedFields?: string[] | null;
    value?: Record<string, unknown> | null;
    errors?: FormErrors | null;
    withBorders?: boolean;
    gotoFieldForm?: ((...args: unknown[]) => void) | null;
    closeFieldForm?: ((...args: unknown[]) => void) | null;
    nullEmptyObject?: boolean;
    isHorizontal?: boolean | null;
    isList?: boolean;
    isFlushList?: boolean;
    canClear?: boolean;
    onChange?: ((...args: unknown[]) => void) | null;
    className?: string | null;
    fieldClassName?: string | null;
    labelClassName?: string | null;
    components?: Record<string, Component> | null;
    fieldsProps?: Record<string, unknown> | null;
    fieldProps?: Record<string, unknown> | null;
}

function Fields({
    name: namespace = null,
    fields = emptyArray,
    excludedFields = null,
    value = null,
    errors = null,
    withBorders = false,
    gotoFieldForm = null,
    closeFieldForm = null,
    nullEmptyObject = false,
    isHorizontal: globalIsHorizontal = null,
    isList = false,
    isFlushList = false,
    canClear = false,
    onChange = null,
    className = null,
    fieldClassName = null,
    labelClassName = null,
    components = null,
    fieldsProps = null,
    fieldProps = null,
}: FieldsProps) {
    const nullableOnChange = nullEmptyObject ? createNullableOnChange(onChange) : onChange;

    const onFieldChange = (key, newFieldValue) => {
        const newValue =
            key !== null
                ? {
                      ...value,
                      [key]: newFieldValue,
                  }
                : {
                      ...value,
                      ...newFieldValue,
                  };
        if (nullableOnChange !== null) {
            nullableOnChange(newValue);
        }
    };

    const onClearField = () => {
        nullableOnChange(null);
    };

    const includedFields = fields.filter(
        ({ name = null, key = null }) =>
            (name === null && key === null) ||
            excludedFields === null ||
            excludedFields.indexOf(name || key) === -1,
    );
    const visibleFields = includedFields.filter(({ hidden = false }) => !hidden);
    const fieldsAdvanced = visibleFields.map(({ advanced = false }) => advanced);
    const normalFieldsIndex = fieldsAdvanced
        .map((advanced, index) => (!advanced ? index : null))
        .filter((it) => it !== null);
    const advancedFieldsIndex = fieldsAdvanced
        .map((advanced, index) => (advanced ? index : null))
        .filter((it) => it !== null);

    const fieldsElements = visibleFields.map((field, i) => {
        const {
            name = null,
            value: customValue,
            errors: customErrors,
            onChange: customOnChange = null,
            isHorizontal = globalIsHorizontal,
            isSection = false,
            className: customClassName = null,
            fieldsProps: customFieldsProps = null,
        } = field;
        const isLast = i === visibleFields.length - 1;

        const fieldExcludedFields =
            excludedFields !== null
                ? excludedFields
                      .filter((key) => name === null || key.match(new RegExp(`^${name}.`)))
                      .map((key) =>
                          name !== null ? key.replace(new RegExp(`^${name}.`), '') : key,
                      )
                : null;

        const customFieldProps =
            name !== null ? (customFieldsProps || fieldsProps || {})[name] || null : null;

        const singleFieldValue =
            name !== null && typeof (value || {})[name] !== 'undefined'
                ? (value || {})[name]
                : null;
        const singleFieldErrors =
            name !== null && typeof (errors || {})[name] !== 'undefined'
                ? (errors || {})[name]
                : null;
        const fieldValue = name !== null ? singleFieldValue : value;
        const fieldErrors = name !== null ? singleFieldErrors : errors;
        const fieldOnChange = (newFieldValue) => onFieldChange(name, newFieldValue);

        return (
            <Field
                excludedFields={fieldExcludedFields}
                key={`field-${name}-${i + 1}`}
                {...field}
                {...fieldProps}
                {...customFieldProps}
                name={namespace !== null ? `${namespace}${name !== null ? `.${name}` : ''}` : name}
                value={typeof customValue !== 'undefined' ? customValue : fieldValue}
                errors={typeof customErrors !== 'undefined' ? customErrors : fieldErrors}
                onChange={customOnChange || fieldOnChange}
                gotoFieldForm={gotoFieldForm}
                closeFieldForm={closeFieldForm}
                components={components}
                isHorizontal={isHorizontal}
                isSection={isSection}
                isListItem={isList || isFlushList}
                className={classNames([
                    fieldClassName,
                    {
                        'border-top': withBorders,
                        'mb-3': !withBorders && !isSection && !isLast && !isList,
                        'mb-4': isSection,
                    },
                ])}
                fieldClassName={customClassName}
                labelClassName={labelClassName}
                fieldRowClassName={classNames({
                    'py-2': withBorders,
                })}
            />
        );
    });

    if (fieldsElements.length === 0) {
        return null;
    }

    return (
        <div className={classNames([styles.container, className])}>
            <FieldsValueContextProvider value={value}>
                <div
                    className={classNames([
                        {
                            'border-bottom': withBorders,
                            'list-group': isList,
                            'list-group-flush': isFlushList,
                        },
                    ])}
                >
                    {normalFieldsIndex.map((index) => fieldsElements[index])}
                </div>
                {advancedFieldsIndex.length > 0 ? (
                    <FieldRow
                        label={
                            <FormattedMessage
                                defaultMessage="Advanced"
                                description="Name of the section in Fields"
                            />
                        }
                        isSection
                    >
                        <div
                            className={classNames([
                                'mt-2',
                                {
                                    'border-bottom': withBorders,
                                    'list-group': isList,
                                    'list-group-flush': isFlushList,
                                },
                            ])}
                        >
                            {advancedFieldsIndex.map((index) => fieldsElements[index])}
                        </div>
                    </FieldRow>
                ) : null}
            </FieldsValueContextProvider>
            {canClear ? (
                <div className="mt-2">
                    <Button theme="light" outline size="md" onClick={onClearField}>
                        <FormattedMessage defaultMessage="Clear all" description="Button label" />
                    </Button>
                </div>
            ) : null}
        </div>
    );
}

export default Fields;
