/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/swipe-up-link.module.scss';

const propTypes = {
    value: MicromagPropTypes.swipeUpLink,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const SwipeUpLink = ({ value, className, onChange, ...props }) => {
    const { active = false } = value || {};

    const onUpdateValue = useCallback(
        (newValue) => {
            const finalValue = { ...value, ...newValue };
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

SwipeUpLink.propTypes = propTypes;
SwipeUpLink.defaultProps = defaultProps;

export default SwipeUpLink;
