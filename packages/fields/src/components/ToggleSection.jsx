/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl, defineMessage } from 'react-intl';

import Fields from './Fields';

import styles from '../styles/toggle-section.module.scss';

const propTypes = {
    value: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const ToggleSection = ({ value, className, onChange, ...props }) => {
    const { enabled = false } = value || {};
    const intl = useIntl();

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
                    [styles.enabled]: enabled,
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
