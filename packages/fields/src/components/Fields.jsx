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
    value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    fields: MicromagPropTypes.formFields,
    withBorders: PropTypes.bool,
    gotoFieldForm: PropTypes.func,
    nullEmptyObject: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    fieldsComponents: MicromagPropTypes.components,
};

const defaultProps = {
    name: null,
    value: null,
    fields: [],
    withBorders: false,
    gotoFieldForm: null,
    nullEmptyObject: false,
    isHorizontal: false,
    onChange: null,
    className: null,
    fieldsComponents: null,
};

const Fields = ({
    name: namespace,
    value,
    fields,
    withBorders,
    gotoFieldForm,
    nullEmptyObject,
    isHorizontal: globalIsHorizontal,
    onChange,
    className,
    fieldsComponents,
}) => {
    const nullableOnChange = useCallback(
        nullEmptyObject ? createNullableOnChange(onChange) : onChange,
        [nullEmptyObject, onChange],
    );

    const onFieldChange = useCallback(
        (key, newFieldValue) => {
            const newValue = {
                ...value,
                [key]: newFieldValue,
            };
            if (nullableOnChange !== null) {
                nullableOnChange(newValue);
            }
        },
        [value, nullableOnChange],
    );

    const fieldsAdvanced = fields.map(({ advanced = false }) => advanced);
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
            fields.map(field => {
                const {
                    name,
                    value: customValue,
                    onChange: customOnChange = null,
                    isHorizontal = globalIsHorizontal,
                } = field;
                const fieldValue = value !== null ? value[name] || null : null;
                const fieldOnChange = newFieldValue => onFieldChange(name, newFieldValue);
                return (
                    <Field
                        {...field}
                        isHorizontal={isHorizontal}
                        name={namespace !== null ? `${namespace}.${name}` : name}
                        value={typeof customValue !== 'undefined' ? customValue : fieldValue}
                        onChange={customOnChange || fieldOnChange}
                        gotoFieldForm={gotoFieldForm}
                        className={styles.field}
                        fieldRowClassName={styles.fieldRow}
                        fieldsComponents={fieldsComponents}
                    />
                );
            }),
        [fields, globalIsHorizontal, value, onFieldChange, gotoFieldForm],
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
            <div className={styles.fields}>
                {normalFieldsIndex.map(index => fieldsElements[index])}
            </div>
            {advancedFieldsIndex.length > 0 ? (
                <FieldRow label={messages.advanced} isSection className={styles.advanced}>
                    <div className={styles.fields}>
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
