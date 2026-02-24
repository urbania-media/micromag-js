/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { defineMessage, useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/alternative.module.css';

const propTypes = {
    value: MicromagPropTypes.badge,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const Alternative = ({ value = null, className = null, onChange = null, fields, toggleLabel, ...props }) => {
    const finalFields = useMemo(
        () => [
            {
                name: 'active',
                type: 'toggle',
                isHorizontal: true,
                label: toggleLabel,
            },
            ...(value !== null ? fields : []),
        ],
        [fields, value, toggleLabel],
    );

    console.log({
        value,
        fields,
        finalFields,
    })

    const onUpdateValue = useCallback(
        (newValue) => {
            const { active: nowActive = false } = newValue || {};
            if (onChange !== null) {
                onChange(nowActive ? newValue : null);
            }
        },
        [onChange],
    );

    return (
        <Fields
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            fieldClassName={styles.field}
            {...props}
            fields={finalFields}
            value={value}
            onChange={onUpdateValue}
        />
    );
};

Alternative.propTypes = propTypes;

export default Alternative;
