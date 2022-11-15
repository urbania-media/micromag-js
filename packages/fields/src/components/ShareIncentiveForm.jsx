/* eslint-disable react/jsx-props-no-spreading */
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl, defineMessage, FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
// import { getStyleFromBox } from '@micromag/core/utils';
// import styles from '../styles/box-style.module.scss';
// import Fields from './Fields';
import FieldWithForm from './FieldWithForm';

const propTypes = {
    value: MicromagPropTypes.CallToActionForm,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const ShareIncentiveForm = ({ value, className, onChange, ...props }) => {
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
        <FieldWithForm
            isForm
            className={className}
            value={value}
            onChange={onUpdateValue}
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Edit call to action..."
                    description="No value label"
                />
            }
            {...props}
        />
    );
};

ShareIncentiveForm.propTypes = propTypes;
ShareIncentiveForm.defaultProps = defaultProps;

export default ShareIncentiveForm;
