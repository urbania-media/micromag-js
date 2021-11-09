/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useFieldComponent, useFieldContext, useFieldsManager } from '@micromag/core/contexts';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import FieldRow from './FieldRow';

const propTypes = {
    name: PropTypes.string, // .isRequired,
    type: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    label: MicromagPropTypes.label,
    help: MicromagPropTypes.label,
    errors: MicromagPropTypes.errors,
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    fields: MicromagPropTypes.formFields,
    isHorizontal: PropTypes.bool,
    isSection: PropTypes.bool,
    isListItem: PropTypes.bool,
    withForm: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onChange: PropTypes.func,
    gotoFieldForm: PropTypes.func,
    closeFieldForm: PropTypes.func,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    fieldClassName: PropTypes.string,
};

const defaultProps = {
    name: null,
    type: null,
    component: null,
    label: null,
    help: null,
    value: null,
    errors: null,
    fields: undefined,
    isHorizontal: null,
    isSection: false,
    isListItem: false,
    withForm: null,
    onChange: null,
    gotoFieldForm: null,
    closeFieldForm: null,
    className: null,
    labelClassName: null,
    fieldClassName: null,
};

const Field = ({
    name,
    type,
    component: providedComponent,
    label,
    help,
    errors,
    fields: providedFields,
    isHorizontal,
    isSection,
    isListItem,
    withForm: providedWithForm,
    value,
    onChange,
    gotoFieldForm,
    closeFieldForm,
    className,
    labelClassName,
    fieldClassName,
    ...props
}) => {
    const fieldsManager = useFieldsManager();
    const FieldsComponent = fieldsManager.getComponent('fields');
    const {
        component: fieldComponent = FieldsComponent,
        fields = providedFields,
        settings = null,
        withoutLabel = false,
        withoutFieldRow = false,
        withForm = providedWithForm,
        isList = false,
        ...fieldProps
    } = (type !== null ? fieldsManager.getDefinition(type) || null : null) || {
        component: providedComponent,
    };
    const FieldComponent = useFieldComponent(fieldComponent);
    // console.log(fieldsManager, fieldComponent, FieldComponent);
    const isFields = FieldComponent === FieldsComponent;
    const context = useFieldContext();

    const gotoForm = useCallback(
        (form) => gotoFieldForm(name, form, context),
        [name, context, gotoFieldForm],
    );
    const closeForm = useCallback((form) => closeFieldForm(name, form), [name, closeFieldForm]);
    const gotoSettings = useCallback(() => gotoForm('settings'), [gotoForm]);

    if (FieldComponent === null) {
        return null;
    }

    const finalWithForm = withForm || FieldComponent.withForm || false;
    const finalIsHorizontal =
        isHorizontal !== null
            ? isHorizontal
            : FieldComponent.isHorizontal || (finalWithForm !== false && isListItem) || null;
    const finalWithoutLabel = withoutLabel || FieldComponent.withoutLabel || false;
    const finalWithSettings =
        settings !== null ||
        (typeof FieldComponent.withSettings !== 'undefined' && FieldComponent.withSettings) ||
        typeof FieldComponent.settingsComponent !== 'undefined' ||
        false;

    const fieldElement = (
        <FieldComponent
            isHorizontal={finalIsHorizontal && !isFields}
            isList={isList}
            labelClassName={classNames({
                'col-sm-3': isHorizontal && isFields,
                [labelClassName]: labelClassName !== null,
            })}
            className={fieldClassName}
            {...props}
            {...fieldProps}
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
        <FieldRow
            {...props}
            {...fieldProps}
            label={label}
            errors={errors}
            help={help}
            isHorizontal={finalIsHorizontal || false}
            isSection={isSection}
            isListItem={isListItem}
            withoutLabel={finalWithoutLabel}
            withSettings={finalWithSettings}
            withForm={finalWithForm}
            withValue={value !== null}
            gotoSettings={gotoSettings}
            gotoForm={gotoForm}
            closeForm={closeForm}
            className={className}
            labelClassName={labelClassName}
        >
            {fieldElement}
        </FieldRow>
    ) : (
        fieldElement
    );
};

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
