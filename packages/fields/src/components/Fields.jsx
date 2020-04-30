/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { createNullableOnChange } from '@micromag/core/utils';

import Field from './Field';
import FieldRow from './FieldRow';

import styles from '../styles/fields.module.scss';

const messages = defineMessages({
    advanced: {
        id: 'advanced_fields',
        defaultMessage: 'Advanced',
    },
});

const propTypes = {
    name: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    errors: MicromagPropTypes.formErrors,
    withBorders: PropTypes.bool,
    gotoFieldForm: PropTypes.func,
    nullEmptyObject: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    isList: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    fieldsComponents: MicromagPropTypes.components,
};

const defaultProps = {
    name: null,
    fields: [],
    value: null,
    errors: null,
    withBorders: false,
    gotoFieldForm: null,
    nullEmptyObject: false,
    isHorizontal: false,
    isList: false,
    onChange: null,
    className: null,
    labelClassName: null,
    fieldsComponents: null,
};

const Fields = ({
    name: namespace,
    fields,
    value,
    errors,
    withBorders,
    gotoFieldForm,
    nullEmptyObject,
    isHorizontal: globalIsHorizontal,
    isList,
    onChange,
    className,
    labelClassName,
    fieldsComponents,
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

    const visibleFields = fields.filter(({ hidden = false }) => !hidden);
    const fieldsAdvanced = visibleFields.map(({ advanced = false }) => advanced);
    const normalFieldsIndex = useMemo(
        () =>
            fieldsAdvanced
                .map((advanced, index) => (!advanced ? index : null))
                .filter(it => it !== null),
        [fieldsAdvanced.join(',')],
    );
    const advancedFieldsIndex = useMemo(
        () =>
            fieldsAdvanced
                .map((advanced, index) => (advanced ? index : null))
                .filter(it => it !== null),
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
                } = field;
                const fieldValue = name !== null ? (value || {})[name] || null : value;
                const fieldOnChange = newFieldValue => onFieldChange(name, newFieldValue);
                const fieldErrors = name !== null ? (errors || {})[name] || null : errors;
                return (
                    <Field
                        {...field}
                        key={`field-${name}-${i + 1}`}
                        name={namespace !== null ? `${namespace}.${name}` : name}
                        value={typeof customValue !== 'undefined' ? customValue : fieldValue}
                        errors={typeof customErrors !== 'undefined' ? customErrors : fieldErrors}
                        onChange={customOnChange || fieldOnChange}
                        gotoFieldForm={gotoFieldForm}
                        fieldsComponents={fieldsComponents}
                        isHorizontal={isHorizontal}
                        isSection={isSection}
                        className={classNames([
                            styles.field,
                            {
                                'list-group-item': isList,
                                'mb-0': isList,
                                'py-2': isList,
                                'px-2': isList,
                                [styles.isSection]: isSection,
                            },
                        ])}
                        labelClassName={labelClassName}
                        fieldRowClassName={styles.fieldRow}
                    />
                );
            }),
        [visibleFields, globalIsHorizontal, isList, value, errors, onFieldChange, gotoFieldForm],
    );

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
            <div
                className={classNames([
                    styles.fields,
                    {
                        'list-group': isList,
                    },
                ])}
            >
                {normalFieldsIndex.map(index => fieldsElements[index])}
            </div>
            {advancedFieldsIndex.length > 0 ? (
                <FieldRow label={messages.advanced} isSection className={styles.advanced}>
                    <div
                        className={classNames([
                            styles.fields,
                            {
                                'list-group': isList,
                            },
                        ])}
                    >
                        {advancedFieldsIndex.map(index => fieldsElements[index])}
                    </div>
                </FieldRow>
            ) : null}
        </div>
    );
};

Fields.propTypes = propTypes;
Fields.defaultProps = defaultProps;

export default Fields;
