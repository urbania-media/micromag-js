/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getComponentFromName } from '@micromag/core/utils';
import { useFieldsComponents } from '@micromag/core/contexts';

import FieldRow from './FieldRow';

import styles from '../styles/field.module.scss';

const propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: MicromagPropTypes.label,
    errors: MicromagPropTypes.errors,
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    fields: MicromagPropTypes.formFields,
    isHorizontal: PropTypes.bool,
    isSection: PropTypes.bool,
    withoutLabel: PropTypes.bool,
    withSettings: PropTypes.bool,
    withoutFieldRow: PropTypes.bool,
    onChange: PropTypes.func,
    gotoFieldForm: PropTypes.func,
    className: PropTypes.string,
    fieldRowClassName: PropTypes.string,
    fieldsComponents: MicromagPropTypes.components,
};

const defaultProps = {
    label: null,
    value: null,
    errors: null,
    fields: null,
    isHorizontal: false,
    isSection: false,
    withoutLabel: false,
    withSettings: false,
    withoutFieldRow: false,
    onChange: null,
    gotoFieldForm: null,
    className: null,
    fieldRowClassName: null,
    fieldsComponents: null,
};

const Field = ({
    name,
    type,
    label,
    errors,
    fields,
    isHorizontal,
    isSection,
    withoutLabel,
    withSettings,
    withoutFieldRow,
    value,
    onChange,
    gotoFieldForm,
    fieldsComponents,
    className,
    fieldRowClassName,
    ...props
}) => {
    const contextFieldsComponents = useFieldsComponents();
    const finalFieldsComponents = fieldsComponents || contextFieldsComponents;
    const FieldComponent = getComponentFromName(type, finalFieldsComponents);
    const isFields = type === 'fields';
    const asSettings =
        fields !== null
            ? fields.reduce((acc, { setting = false }) => acc || setting, false)
            : false;
    const gotoForm = useCallback(form => gotoFieldForm(name, form), [name, gotoFieldForm]);
    const gotoSettings = useCallback(() => gotoForm('settings'), [gotoForm]);

    if (FieldComponent === null) {
        return null;
    }

    const finalIsHorizontal =
        isHorizontal ||
        FieldComponent.isHorizontal ||
        FieldComponent.withForm ||
        FieldComponent.withPanel ||
        false;
    const finalWithoutLabel = withoutLabel || FieldComponent.withoutLabel || false;
    const finalWithSettings = withSettings || asSettings || FieldComponent.withSettings || false;
    const finalWithForm = FieldComponent.withForm || false;
    const finalWithPanel = FieldComponent.withPanel || false;

    const fieldElement = (
        <FieldComponent
            {...props}
            errors={errors}
            fields={fields}
            name={name}
            value={value}
            onChange={onChange}
            gotoFieldForm={gotoFieldForm}
            gotoForm={gotoForm}
        />
    );

    return !withoutFieldRow ? (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isSection]: isSection || isFields,
                    [className]: className !== null,
                },
            ])}
        >
            <FieldRow
                key={`field-${name}`}
                label={label}
                errors={errors}
                isHorizontal={finalIsHorizontal}
                isSection={isSection}
                withoutLabel={finalWithoutLabel}
                withSettings={finalWithSettings}
                withForm={finalWithForm}
                withPanel={finalWithPanel}
                gotoSettings={gotoSettings}
                gotoForm={gotoForm}
                className={classNames([
                    styles.row,
                    {
                        [fieldRowClassName]: fieldRowClassName !== null,
                    },
                ])}
            >
                {fieldElement}
            </FieldRow>
        </div>
    ) : (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isSection]: isSection || isFields,
                    [className]: className !== null,
                },
            ])}
        >
            {fieldElement}
        </div>
    );
};

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
