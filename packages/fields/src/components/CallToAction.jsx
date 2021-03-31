/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/call-to-action.module.scss';

const propTypes = {
    value: MicromagPropTypes.callToAction,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const CallToAction = ({ value, className, onChange, ...props }) => {
    const { active = false } = value || {};

    // set default type
    const onUpdateValue = useCallback(
        (newValue) => {
            const { active: wasActive = false } = value || {};
            const { active: nowActive = false, type = null } = newValue || {};

            const finalValue = { ...newValue };

            if (!wasActive && nowActive && type === null) {
                finalValue.type = 'swipe-up';
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

CallToAction.propTypes = propTypes;
CallToAction.defaultProps = defaultProps;

export default CallToAction;
