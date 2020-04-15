/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Fields from './Fields';

const propTypes = {
    fields: MicromagPropTypes.formFields,
    value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    onChange: PropTypes.func,
};

const defaultProps = {
    fields: [],
    value: null,
    onChange: null,
};

const ElementField = ({ fields, value, onChange }) => {
    const settingsNames = useMemo(() => fields.filter(({ setting = false }) => setting).map(it => it.name), [fields]);
    const componentFields = useMemo(
        () =>
            fields.filter(({ setting = false }) => !setting),
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

    return <Fields fields={componentFields} value={componentValue} onChange={componentOnChange} />;
};

ElementField.propTypes = propTypes;
ElementField.defaultProps = defaultProps;

export default ElementField;
