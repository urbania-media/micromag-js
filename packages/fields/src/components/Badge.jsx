/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/badge.module.scss';

const propTypes = {
    value: MicromagPropTypes.badge,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const Badge = ({ value, className, onChange, ...props }) => {
    const { active = false } = value || {};

    // set default type and label
    const onUpdateValue = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange(newValue);
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
Badge.defaultProps = defaultProps;

export default Badge;
