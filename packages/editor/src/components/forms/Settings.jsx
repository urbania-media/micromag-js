/* eslint-disable react/no-array-index-key */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Fields } from '@micromag/fields';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../../styles/forms/settings.module.scss';

const propTypes = {
    field: PropTypes.string.isRequired,
    value: MicromagPropTypes.component,
    fields: MicromagPropTypes.formFields,
    className: PropTypes.string,
    gotoFieldForm: PropTypes.func.isRequired,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    fields: [],
    className: null,
    onChange: null,
};

const SettingsForm = ({ field, value, fields, className, gotoFieldForm, onChange }) => {
    const settingsNames = useMemo(
        () => fields.filter(({ setting = false }) => setting).map(it => it.name),
        [fields],
    );
    const settingsFields = useMemo(
        () =>
            settingsNames !== null
                ? fields.filter(({ name }) => settingsNames.indexOf(name) !== -1)
                : fields,
        [fields, settingsNames],
    );

    const settingsValue = useMemo(() => {
        if (value === null || settingsNames === null) {
            return value;
        }
        return Object.keys(value).reduce(
            (scopedValue, key) =>
                settingsNames.indexOf(key) !== -1
                    ? {
                          ...scopedValue,
                          [key]: value[key],
                      }
                    : scopedValue,
            null,
        );
    }, [fields, settingsNames, value]);

    const settingsOnChange = useCallback(
        newComponentValue => {
            const newValue = {
                ...value,
                ...newComponentValue,
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
                <Fields
                    name={field}
                    fields={settingsFields}
                    value={settingsValue}
                    onChange={settingsOnChange}
                    gotoFieldForm={gotoFieldForm}
                />
            </div>
        </div>
    );
};

SettingsForm.propTypes = propTypes;
SettingsForm.defaultProps = defaultProps;

export default SettingsForm;
