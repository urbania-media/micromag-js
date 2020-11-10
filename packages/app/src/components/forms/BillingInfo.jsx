/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisationBillingMethod } from '@micromag/data';

import { useUser } from '../../contexts/AuthContext';

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
                <FormattedMessage
                    defaultMessage="Billing info"
                    description="Billing info fieldset label"
                />
            ),
            isSection: true,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: (
                        <FormattedMessage defaultMessage="Name" description="Name field label" />
                    ),
                },
                {
                    name: 'company_name',
                    type: 'text',
                    label: (
                        <FormattedMessage
                            defaultMessage="Company name"
                            description="Company name field label"
                        />
                    ),
                },
                {
                    name: 'address_1',
                    type: 'text',
                    label: (
                        <FormattedMessage
                            defaultMessage="Address 1"
                            description="Address 1 field label"
                        />
                    ),
                },
                {
                    name: 'address_2',
                    type: 'text',
                    label: (
                        <FormattedMessage
                            defaultMessage="Address 2"
                            description="Address 2 field label"
                        />
                    ),
                },
                {
                    name: 'country',
                    type: 'select',
                    label: (
                        <FormattedMessage
                            defaultMessage="Country"
                            description="Country field label"
                        />
                    ),
                },
                {
                    name: 'city',
                    type: 'text',
                    label: (
                        <FormattedMessage defaultMessage="City" description="City field label" />
                    ),
                },
                {
                    name: 'province',
                    type: 'text',
                    label: (
                        <FormattedMessage
                            defaultMessage="Province"
                            description="Province field label"
                        />
                    ),
                },
                {
                    name: 'postal_code',
                    type: 'text',
                    label: (
                        <FormattedMessage
                            defaultMessage="Postal code"
                            description="Postal code field label"
                        />
                    ),
                },
            ],
        },
        {
            type: 'fields',
            label: (
                <FormattedMessage
                    defaultMessage="Payment info"
                    description="Payment info fieldset label"
                />
            ),
            isSection: true,
            fields: [
                {
                    name: 'card_name',
                    type: 'text',
                    label: (
                        <FormattedMessage
                            defaultMessage="Card name"
                            description="Card name field label"
                        />
                    ),
                },
                {
                    name: 'card_number',
                    type: 'text',
                    label: (
                        <FormattedMessage
                            defaultMessage="Card number"
                            description="Card number field label"
                        />
                    ),
                },
                {
                    name: 'expiration_date',
                    type: 'text',
                    label: (
                        <FormattedMessage
                            defaultMessage="Expiration date"
                            description="Expiration date field label"
                        />
                    ),
                },
                {
                    name: 'cvv',
                    type: 'text',
                    label: (
                        <FormattedMessage
                            defaultMessage="Card security code (CVV)"
                            description="Card security field label"
                        />
                    ),
                },
            ],
        },
    ],
    className: null,
    onUpdated: null,
};

const BillingInfoForm = ({ fields, className, onUpdated }) => {
    const url = useUrlGenerator();
    const user = useUser();

    const { update: updateAccount } = useOrganisationBillingMethod();
    const postForm = useCallback((action, data) => updateAccount(data), [updateAccount]);
    return (
        <Form
            action={url('account')}
            fields={fields}
            postForm={postForm}
            initialValue={user}
            submitButtonLabel={
                <FormattedMessage
                    defaultMessage="Save payment method"
                    description="Save payment method Button label"
                />
            }
            onComplete={onUpdated !== null ? onUpdated : null}
            className={className}
        />
    );
};

BillingInfoForm.propTypes = propTypes;
BillingInfoForm.defaultProps = defaultProps;

export default BillingInfoForm;
