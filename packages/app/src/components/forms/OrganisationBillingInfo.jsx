/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { creditCard as creditCardFields, billingContact as billingContactFields } from './fields';

const propTypes = {
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            type: 'fields',
            label: (
                <span className="text-uppercase text-secondary">
                    <FormattedMessage
                        defaultMessage="Payment info"
                        description="Payment info fieldset label"
                    />
                </span>
            ),
            isSection: true,
            fields: creditCardFields,
        },
        {
            type: 'fields',
            label: (
                <span className="text-uppercase text-secondary">
                    <FormattedMessage
                        defaultMessage="Billing info"
                        description="Billing info fieldset label"
                    />
                </span>
            ),
            isSection: true,
            fields: billingContactFields,
        },
    ],
    className: null,
    onUpdated: null,
};

const BillingInfoForm = ({ fields, className, onUpdated }) => {
    const url = useUrlGenerator();
    const updateInfo = () => {};
    const postForm = useCallback((action, data) => updateInfo(data), [updateInfo]);

    return (
        <Form
            action={url('account')}
            fields={fields}
            postForm={postForm}
            initialValue={null}
            submitButtonLabel={
                <FormattedMessage defaultMessage="Save" description="Save button label" />
            }
            onComplete={onUpdated !== null ? onUpdated : null}
            className={className}
        />
    );
};

BillingInfoForm.propTypes = propTypes;
BillingInfoForm.defaultProps = defaultProps;

export default BillingInfoForm;
