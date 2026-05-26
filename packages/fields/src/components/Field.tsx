import classNames from 'classnames';
import { ReactNode, useId } from 'react';

import type { Errors, Field as FieldType, Label } from '@micromag/core';
import { useFieldComponent, useFieldContext, useFieldsManager } from '@micromag/core/contexts';

import FieldRow from './FieldRow';

interface FieldProps {
    name?: string | null;
    type?: string | null;
    component?: ReactNode | ((...args: unknown[]) => void) | null;
    label?: Label | null;
    help?: Label | null;
    errors?: Errors | null;
    value?: unknown | null;
    fields?: FieldType[];
    isHorizontal?: boolean | null;
    isSection?: boolean;
    isListItem?: boolean;
    withForm?: boolean | string | null;
    withModal?: boolean | string | null;
    onChange?: ((...args: unknown[]) => void) | null;
    gotoFieldForm?: ((...args: unknown[]) => void) | null;
    closeFieldForm?: ((...args: unknown[]) => void) | null;
    className?: string | null;
    labelClassName?: string | null;
    fieldClassName?: string | null;
}

function Field({
    name = null,
    type = null,
    component: providedComponent = null,
    label = null,
    help = null,
    errors = null,
    fields: providedFields = undefined,
    isHorizontal = null,
    isSection = false,
    isListItem = false,
    withForm: providedWithForm = null,
    withModal: providedWithModal = null,
    withToggle: providedWithToggle,
    value = null,
    onChange = null,
    gotoFieldForm = null,
    closeFieldForm = null,
    className = null,
    labelClassName = null,
    fieldClassName = null,
    ...props
}: FieldProps) {
    const fieldsManager = useFieldsManager();
    const FieldsComponent = fieldsManager.getComponent('fields');
    const {
        component: fieldComponent = FieldsComponent,
        fields = providedFields,
        settings = null,
        withoutLabel = false,
        withoutFieldRow = false,
        withForm = providedWithForm,
        withModal = providedWithModal,
        isList = false,
        canClear = false,
        withToggle = providedWithToggle,
        truncateValueLabel = false,
        ...fieldProps
    } = (type !== null ? fieldsManager.getDefinition(type) || null : null) || {
        component: providedComponent,
    };

    const FieldComponent = useFieldComponent(fieldComponent);

    const isFields = FieldComponent === FieldsComponent;
    const context = useFieldContext();

    const gotoForm = (form) => gotoFieldForm(name, form, context);
    const closeForm = (form) => closeFieldForm(name, form);
    const gotoSettings = () => gotoForm('settings');

    const id = useId();

    if (FieldComponent === null) {
        return null;
    }

    const finalWithForm = withForm || FieldComponent.withForm || false;
    const finalWithModal = withModal || FieldComponent.withModal || false;

    const finalIsHorizontal =
        isHorizontal !== null
            ? isHorizontal
            : FieldComponent.isHorizontal ||
              (finalWithForm !== false && isListItem) ||
              (finalWithModal !== false && isListItem) ||
              null;
    const finalWithoutLabel = withoutLabel || FieldComponent.withoutLabel || false;
    const finalWithSettings =
        settings !== null ||
        (typeof FieldComponent.withSettings !== 'undefined' && FieldComponent.withSettings) ||
        typeof FieldComponent.settingsComponent !== 'undefined' ||
        false;

    const fieldElement =
        !withToggle || value !== null ? (
            <FieldComponent
                isHorizontal={finalIsHorizontal && !isFields}
                isList={isList}
                canClear={canClear}
                labelClassName={classNames([
                    labelClassName,
                    {
                        'col-sm-3': isHorizontal && isFields,
                    },
                ])}
                className={fieldClassName}
                inputId={id}
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
        ) : null;

    return !withoutFieldRow ? (
        <FieldRow
            {...props}
            {...fieldProps}
            inputId={id}
            value={value}
            onChange={onChange}
            label={label}
            errors={errors}
            help={help}
            isHorizontal={finalIsHorizontal || false}
            isSection={isSection}
            isListItem={isListItem}
            withoutLabel={finalWithoutLabel}
            withSettings={finalWithSettings}
            withToggle={withToggle}
            withForm={finalWithForm}
            withModal={finalWithModal}
            withValue={value !== null}
            withTruncateValue={truncateValueLabel}
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
}

export default Field;
