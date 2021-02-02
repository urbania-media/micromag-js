/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useFieldsManager, useFieldComponent } from '@micromag/core/contexts';

import styles from '../../styles/forms/settings.module.scss';

const propTypes = {
    name: PropTypes.string,
    field: MicromagPropTypes.formField.isRequired,
    value: MicromagPropTypes.component,
    className: PropTypes.string,
    gotoFieldForm: PropTypes.func.isRequired,
    closeFieldForm: PropTypes.func.isRequired,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    className: null,
    onChange: null,
};

const SettingsForm = ({
    name,
    field,
    value,
    className,
    gotoFieldForm,
    closeFieldForm,
    onChange,
}) => {
    const { type = null } = field;
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
                {
                    [className]: className,
                },
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
                />
            </div>
        </div>
    );
};

SettingsForm.propTypes = propTypes;
SettingsForm.defaultProps = defaultProps;

export default SettingsForm;
