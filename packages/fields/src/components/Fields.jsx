/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { FieldsValueContextProvider } from '@micromag/core/contexts';
import { createNullableOnChange } from '@micromag/core/utils';

import Field from './Field';
import FieldRow from './FieldRow';

import styles from '../styles/fields.module.scss';

const propTypes = {
    name: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    excludedFields: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    errors: MicromagPropTypes.formErrors,
    withBorders: PropTypes.bool,
    gotoFieldForm: PropTypes.func,
    closeFieldForm: PropTypes.func,
    nullEmptyObject: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    isList: PropTypes.bool,
    isFlushList: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    fieldClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    components: MicromagPropTypes.components,
    fieldsProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    fieldProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
    name: null,
    fields: [],
    excludedFields: null,
    value: null,
    errors: null,
    withBorders: false,
    gotoFieldForm: null,
    closeFieldForm: null,
    nullEmptyObject: false,
    isHorizontal: null,
    isList: false,
    isFlushList: false,
    onChange: null,
    className: null,
    fieldClassName: null,
    labelClassName: null,
    components: null,
    fieldsProps: null,
    fieldProps: null,
};

const Fields = ({
    name: namespace,
    fields,
    excludedFields,
    value,
    errors,
    withBorders,
    gotoFieldForm,
    closeFieldForm,
    nullEmptyObject,
    isHorizontal: globalIsHorizontal,
    isList,
    isFlushList,
    onChange,
    className,
    fieldClassName,
    labelClassName,
    components,
    fieldsProps,
    fieldProps,
}) => {
    const nullableOnChange = useCallback(
        nullEmptyObject ? createNullableOnChange(onChange) : onChange,
        [nullEmptyObject, onChange],
    );

    const onFieldChange = useCallback(
        (key, newFieldValue) => {
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
        },
        [value, nullableOnChange],
    );
    const includedFields = fields.filter(
        ({ name = null, key = null }) =>
            (name === null && key === null) ||
            excludedFields === null ||
            excludedFields.indexOf(name || key) === -1,
    );
    const visibleFields = includedFields.filter(({ hidden = false }) => !hidden);
    const fieldsAdvanced = visibleFields.map(({ advanced = false }) => advanced);
    const normalFieldsIndex = useMemo(
        () =>
            fieldsAdvanced
                .map((advanced, index) => (!advanced ? index : null))
                .filter((it) => it !== null),
        [fieldsAdvanced.join(',')],
    );
    const advancedFieldsIndex = useMemo(
        () =>
            fieldsAdvanced
                .map((advanced, index) => (advanced ? index : null))
                .filter((it) => it !== null),
        [fieldsAdvanced.join(',')],
    );

    const fieldsElements = useMemo(
        () =>
            visibleFields.map((field, i) => {
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
                        {...field}
                        {...fieldProps}
                        {...customFieldProps}
                        key={`field-${name}-${i + 1}`}
                        name={
                            namespace !== null
                                ? `${namespace}${name !== null ? `.${name}` : ''}`
                                : name
                        }
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
                            styles.field,
                            {
                                [styles.isSection]: isSection,
                                [fieldClassName]: fieldClassName !== null,
                            },
                        ])}
                        fieldClassName={customClassName}
                        labelClassName={labelClassName}
                        fieldRowClassName={styles.fieldRow}
                    />
                );
            }),
        [
            visibleFields,
            globalIsHorizontal,
            isList,
            isFlushList,
            value,
            errors,
            onFieldChange,
            gotoFieldForm,
            closeFieldForm,
            fieldProps,
            fieldsProps,
        ],
    );

    // console.log('fields fields', fields);

    if (fieldsElements.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withBorders]: withBorders,
                    [className]: className !== null,
                },
            ])}
        >
            <FieldsValueContextProvider value={value}>
                <div
                    className={classNames([
                        styles.fields,
                        {
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
                        className={styles.advanced}
                    >
                        <div
                            className={classNames([
                                styles.fields,
                                {
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
        </div>
    );
};

Fields.propTypes = propTypes;
Fields.defaultProps = defaultProps;

export default Fields;
