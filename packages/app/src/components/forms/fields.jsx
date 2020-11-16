import React from 'react';
import { FormattedMessage } from 'react-intl';

export const creditCard = [
    {
        name: 'card_name',
        type: 'text',
        label: <FormattedMessage defaultMessage="Card name" description="Card name field label" />,
    },
    {
        name: 'card_number',
        type: 'text',
        label: (
            <FormattedMessage defaultMessage="Card number" description="Card number field label" />
        ),
    },
    {
        type: 'fields',
        isSection: true,
        fieldClassName: 'd-inline-block w-25 mr-4',
        fields: [
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
                label: <FormattedMessage defaultMessage="CVV" description="CVV field label" />,
            },
        ],
    },
];

export const contact = [
    {
        name: 'first_name',
        type: 'text',
        label: <FormattedMessage defaultMessage="First name" description="Firstname field label" />,
    },
    {
        name: 'last_name',
        type: 'text',
        label: <FormattedMessage defaultMessage="Last name" description="Lastname field label" />,
    },
    {
        name: 'email',
        type: 'email',
        label: <FormattedMessage defaultMessage="Email" description="Email field label" />,
    },
    {
        name: 'phone',
        type: 'text',
        label: <FormattedMessage defaultMessage="Phone" description="Phone field label" />,
    },
];

export const billingContact = [
    {
        name: 'name',
        type: 'text',
        label: <FormattedMessage defaultMessage="Name" description="Name field label" />,
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
        label: <FormattedMessage defaultMessage="Address 1" description="Address 1 field label" />,
    },
    {
        name: 'address_2',
        type: 'text',
        label: <FormattedMessage defaultMessage="Address 2" description="Address 2 field label" />,
    },
    {
        name: 'country',
        type: 'select',
        label: <FormattedMessage defaultMessage="Country" description="Country field label" />,
    },
    {
        name: 'city',
        type: 'text',
        label: <FormattedMessage defaultMessage="City" description="City field label" />,
    },

    {
        type: 'fields',
        isSection: true,
        fieldClassName: 'd-inline-block w-25 mr-4 ',
        fields: [
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
];

export const organisation = [
    {
        name: 'name',
        type: 'text',
        label: (
            <FormattedMessage
                defaultMessage="Organisation name"
                description="Organisation name field label"
            />
        ),
    },
    {
        name: 'image',
        type: 'image',
        label: <FormattedMessage defaultMessage="Image" description="Image field label" />,
    },
];

export const teamMember = [
    {
        type: 'fields',
        isSection: false,
        isHorizontal: false,
        fields: [
            {
                name: 'email',
                type: 'email',
                label: <FormattedMessage defaultMessage="Email" description="Email field label" />,
            },
            {
                name: 'role',
                type: 'select',
                label: <FormattedMessage defaultMessage="Role" description="Role field label" />,
            },
        ],
    },
];
