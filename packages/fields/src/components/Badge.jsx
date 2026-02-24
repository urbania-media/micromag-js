/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl, defineMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/badge.module.css';

const propTypes = {
    value: MicromagPropTypes.badge,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const Badge = ({ value = null, className = null, onChange = null, ...props }) => {
    const { active = false } = value || {};
    const intl = useIntl();

    const onUpdateValue = useCallback(
        (newValue) => {
            const { active: wasActive = false } = value || {};
            const { active: nowActive = false, label = null } = newValue || {};
            const finalValue = { ...newValue };
            if (!wasActive && nowActive) {
                if (label === null) {
                    finalValue.label = {
                        body: intl.formatMessage(
                            defineMessage({
                                defaultMessage: 'Screen title',
                                description: 'Field default label',
                            }),
                        ),
                    };
                }
            }
            if (onChange !== null) {
                onChange(finalValue);
            }
        },
        [onChange, value],
    );

    return (
        <Fields
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.active]: active,
                },
            ])}
            fieldClassName={styles.field}
            {...props}
            value={value}
            onChange={onUpdateValue}
        />
    );
};

Badge.propTypes = propTypes;

export default Badge;
