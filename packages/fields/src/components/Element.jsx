import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Fields from './Fields';

const propTypes = {
    name: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    isList: PropTypes.bool,
    gotoFieldForm: PropTypes.func,
    closeFieldForm: PropTypes.func,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    fields: [],
    value: null,
    isList: false,
    gotoFieldForm: null,
    closeFieldForm: null,
    onChange: null,
};

const ElementField = ({
    name,
    fields: formFields,
    value,
    gotoFieldForm,
    closeFieldForm,
    isList,
    onChange,
}) => {
    const fields = formFields || [];
    const settingsNames = useMemo(
        () => (fields ? fields.filter(({ setting = false }) => setting).map((it) => it.name) : []),
        [fields],
    );
    const componentFields = useMemo(
        () => fields.filter(({ setting = false }) => !setting),
        [fields],
    );
    const componentValue = useMemo(() => {
        if (value === null || settingsNames === null) {
            return value;
        }
        return Object.keys(value).reduce(
            (scopedValue, key) =>
                settingsNames.indexOf(key) === -1
                    ? {
                          ...scopedValue,
                          [key]: value[key],
                      }
                    : scopedValue,
            null,
        );
    }, [fields, settingsNames, value]);

    const componentOnChange = useCallback(
        (newComponentValue) => {
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
        <Fields
            name={name}
            fields={componentFields}
            value={componentValue}
            gotoFieldForm={gotoFieldForm}
            closeFieldForm={closeFieldForm}
            onChange={componentOnChange}
            isList={isList}
        />
    );
};

ElementField.propTypes = propTypes;
ElementField.defaultProps = defaultProps;

export default ElementField;
