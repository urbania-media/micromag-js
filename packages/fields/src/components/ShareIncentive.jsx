/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl, defineMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import styles from '../styles/call-to-action.module.scss';
import Fields from './Fields';

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

const ShareIncentive = ({ value, className, onChange, ...props }) => {
    const { active = false } = value || {};
    const intl = useIntl();

    // set default type and label
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
                                defaultMessage: 'Share this Micromag!',
                                description: 'Share Incentive default label',
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

ShareIncentive.propTypes = propTypes;
ShareIncentive.defaultProps = defaultProps;

export default ShareIncentive;
