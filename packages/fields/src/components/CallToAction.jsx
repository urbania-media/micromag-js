/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl, defineMessage } from 'react-intl';

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
    const intl = useIntl();

    // set default type and label
    const onUpdateValue = useCallback(
        (newValue) => {
            const { active: wasActive = false } = value || {};
            const { active: nowActive = false, type = null, label = null } = newValue || {};

            const finalValue = { ...newValue };
            if (!wasActive && nowActive) {
                if (type === null) {
                    finalValue.type = 'swipe-up';
                }
                if (label === null) {
                    finalValue.label = {
                        body: intl.formatMessage(
                            defineMessage({
                                defaultMessage: 'Learn more',
                                description: 'Call to action default label',
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

CallToAction.propTypes = propTypes;
CallToAction.defaultProps = defaultProps;

export default CallToAction;
