/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getComponentFromName } from '@micromag/core/utils';
import { useFieldComponent } from '@micromag/core/contexts';

import FieldRow from './FieldRow';

import styles from '../styles/field.module.scss';

const propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: MicromagPropTypes.label,
    help: MicromagPropTypes.label,
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
    closeFieldForm: PropTypes.func,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    fieldRowClassName: PropTypes.string,
    components: MicromagPropTypes.components,
};

const defaultProps = {
    label: null,
    help: null,
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
    closeFieldForm: null,
    className: null,
    labelClassName: null,
    fieldRowClassName: null,
    components: null,
};

const Field = ({
    name,
    type,
    label,
    help,
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
    closeFieldForm,
    components,
    className,
    labelClassName,
    fieldRowClassName,
    ...props
}) => {
    const CustomFieldComponent =
        components !== null ? getComponentFromName(type, components) || null : null;
    const ContextFieldComponent = useFieldComponent(type);
    const FieldComponent = CustomFieldComponent || ContextFieldComponent;
    // console.log(type, components, ContextFieldComponent);
    const isFields = type === 'fields';
    const asSettings =
        fields !== null
            ? fields.reduce((acc, { setting = false }) => acc || setting, false)
            : false;
    const gotoForm = useCallback((form) => gotoFieldForm(name, form), [name, gotoFieldForm]);
    const closeForm = useCallback((form) => closeFieldForm(name, form), [name, closeFieldForm]);
    const gotoSettings = useCallback(() => gotoForm('settings'), [gotoForm]);

    if (FieldComponent === null) {
        return null;
    }

    const finalIsHorizontal =
        (isHorizontal && !isFields) ||
        FieldComponent.isHorizontal ||
        FieldComponent.withForm ||
        false;
    const finalWithoutLabel = withoutLabel || FieldComponent.withoutLabel || false;
    const finalWithSettings = withSettings || asSettings || FieldComponent.withSettings || false;
    const finalWithForm = FieldComponent.withForm || false;

    const fieldElement = (
        <FieldComponent
            isHorizontal={isHorizontal && isFields}
            labelClassName={classNames({
                'col-sm-3': isHorizontal && isFields,
                [labelClassName]: labelClassName !== null,
            })}
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

    // console.log(type, fieldElement, value, props);

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
                help={help}
                isHorizontal={finalIsHorizontal}
                isSection={isSection}
                withoutLabel={finalWithoutLabel}
                withSettings={finalWithSettings}
                withForm={finalWithForm}
                gotoSettings={gotoSettings}
                gotoForm={gotoForm}
                closeForm={closeForm}
                className={classNames([
                    styles.row,
                    {
                        [fieldRowClassName]: fieldRowClassName !== null,
                    },
                ])}
                labelClassName={labelClassName}
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
