/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as MicromagPropTypes from '../../PropTypes';
import { getComponentFromName, createNullableOnChange } from '../../utils';
import { useComponents } from '../../contexts/ComponentsContext';
import FieldRow from './FieldRow';
import CollapsablePanel from '../partials/CollapsablePanel';
import { FIELDS_NAMESPACE } from '../namespaces';

import styles from '../../styles/fields/fields.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    fields: MicromagPropTypes.formFields,
    withBorders: PropTypes.bool,
    gotoFieldForm: PropTypes.func,
    nullEmptyObject: PropTypes.bool,
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
    onChange,
    className,
    fieldsComponents,
}) => {
    const contextFieldsComponents = useComponents(FIELDS_NAMESPACE);
    const finalFieldsComponents = fieldsComponents || contextFieldsComponents;
    const nullableOnChange = useCallback(
        nullEmptyObject ? createNullableOnChange(onChange) : onChange,
        [nullEmptyObject, onChange],
    );
    const onFieldChange = (key, newFieldValue) => {
        const newValue = {
            ...value,
            [key]: newFieldValue,
        };
        if (nullableOnChange !== null) {
            nullableOnChange(newValue);
        }
    };

    const normalFields = fields.filter(({ advanced = false }) => !advanced);
    const advancedFields = fields.filter(({ advanced = false }) => advanced);

    const renderField = field => {
        const {
            name,
            component,
            label,
            fields: subFields = [],
            isHorizontal = false,
            isSection = false,
            withoutLabel = false,
            withSettings = false,
            withoutFieldRow = false,
        } = field;
        const FieldComponent = getComponentFromName(component, finalFieldsComponents);
        if (FieldComponent === null) {
            return null;
        }
        const fieldName = namespace !== null ? `${namespace}.${name}` : name;
        const isFields = component === 'fields';
        const fieldsAsSettings = subFields.reduce(
            (asSettings, { setting = false }) => asSettings || setting,
            false,
        );
        const fieldElement = (
            <FieldComponent
                {...field}
                name={fieldName}
                value={value !== null ? value[name] || null : null}
                onChange={newFieldValue => onFieldChange(name, newFieldValue)}
                gotoFieldForm={gotoFieldForm}
                gotoForm={form => gotoFieldForm(fieldName, form)}
            />
        );
        return !withoutFieldRow ? (
            <FieldRow
                key={`field-${name}`}
                label={label}
                isHorizontal={FieldComponent.isHorizontal || isHorizontal || false}
                isSection={isSection || isFields}
                withoutLabel={withoutLabel || FieldComponent.withoutLabel || false}
                withSettings={
                    withSettings || fieldsAsSettings || FieldComponent.withSettings || false
                }
                gotoSettings={() => gotoFieldForm(fieldName, 'settings')}
                className={classNames([
                    styles.row,
                    {
                        [styles.isSection]: isSection || isFields,
                    },
                ])}
            >
                {fieldElement}
            </FieldRow>
        ) : (
            fieldElement
        );
    };

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
            {normalFields.map(renderField)}
            {advancedFields.length > 0 ? (
                <CollapsablePanel title="Réglages avancés" className={styles.advanced}>
                    {advancedFields.map(renderField)}
                </CollapsablePanel>
            ) : null}
        </div>
    );
};

Fields.propTypes = propTypes;
Fields.defaultProps = defaultProps;

export default Fields;
