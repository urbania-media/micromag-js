/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React, { useCallback } from 'react';

import type { Component, Field } from '@micromag/core';
import { useFieldComponent, useFieldsManager } from '@micromag/core/contexts';

import styles from '../../styles/forms/settings.module.css';

interface SettingsFormProps {
    name?: string;
    field?: Field;
    value?: Component;
    className?: string;
    gotoFieldForm: (...args: unknown[]) => void;
    closeFieldForm: (...args: unknown[]) => void;
    onChange?: (...args: unknown[]) => void;
}

function SettingsForm({
    name = null,
    field = null,
    value = null,
    className = null,
    gotoFieldForm,
    closeFieldForm,
    onChange = null,
}: SettingsFormProps) {
    if (field === null) return false;

    const { type = null, fieldsProps = null } = field || {};
    const fieldsManager = useFieldsManager();
    const { component: fieldComponent = null, settings } =
        type !== null ? fieldsManager.getDefinition(type) : field;
    const FieldComponent = useFieldComponent(fieldComponent);
    const FieldsComponent = useFieldComponent('fields');
    const SettingsComponent =
        FieldComponent !== null
            ? FieldComponent.settingsComponent || FieldsComponent
            : FieldsComponent;

    const onSettingsChange = useCallback(
        (newSettingsValue) => {
            const newValue = {
                ...value,
                ...newSettingsValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    return (
        <div
            className={classNames([
                styles.container,
                className,
            ])}
        >
            <div className={styles.inner}>
                <SettingsComponent
                    name={name}
                    field={field}
                    fields={settings}
                    value={value}
                    onChange={onSettingsChange}
                    gotoFieldForm={gotoFieldForm}
                    closeFieldForm={closeFieldForm}
                    fieldsProps={fieldsProps}
                />
            </div>
        </div>
    );
}

export default SettingsForm;
