/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import Fields from './Fields';

import styles from '../styles/toggle-section.module.scss';

const propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.object,
    toggleField: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    toggleField: null,
    className: null,
    onChange: null,
};

const ToggleSection = ({ value, toggleField, className, onChange, ...props }) => {
    const { enabled = false } = value || {};
    const valueEnabled = toggleField !== null ? value?.[toggleField] || false : enabled;

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
                    [styles.enabled]: valueEnabled,
                },
            ])}
            fieldClassName={styles.field}
            {...props}
            value={value}
            onChange={onUpdateValue}
        />
    );
};

ToggleSection.propTypes = propTypes;
ToggleSection.defaultProps = defaultProps;

export default ToggleSection;
