import React from 'react';
import { FormattedMessage } from 'react-intl';

export const creditCard = [
    {
        name: 'card_name',
        type: 'text',
        label: <FormattedMessage defaultMessage="Card name" description="Field label" />,
    },
    {
        name: 'card_number',
        type: 'text',
        label: <FormattedMessage defaultMessage="Card number" description="Field label" />,
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
                label: <FormattedMessage defaultMessage="CVV" description="Field label" />,
            },
        ],
    },
];

export const contact = [
    {
        name: 'first_name',
        type: 'text',
        label: <FormattedMessage defaultMessage="First name" description="Field label" />,
    },
    {
        name: 'last_name',
        type: 'text',
        label: <FormattedMessage defaultMessage="Last name" description="Field label" />,
    },
    {
        name: 'email',
        type: 'email',
        label: <FormattedMessage defaultMessage="Email" description="Field label" />,
    },
    {
        name: 'phone',
        type: 'text',
        label: <FormattedMessage defaultMessage="Phone" description="Field label" />,
    },
];

export const billingContact = [
    {
        name: 'name',
        type: 'text',
        label: <FormattedMessage defaultMessage="Name" description="Field label" />,
    },
    {
        name: 'company_name',
        type: 'text',
        label: <FormattedMessage defaultMessage="Company name" description="Field label" />,
    },
    {
        name: 'address_1',
        type: 'text',
        label: <FormattedMessage defaultMessage="Address 1" description="Field label" />,
    },
    {
        name: 'address_2',
        type: 'text',
        label: <FormattedMessage defaultMessage="Address 2" description="Field label" />,
    },
    {
        name: 'country',
        type: 'select',
        label: <FormattedMessage defaultMessage="Country" description="Field label" />,
    },
    {
        name: 'city',
        type: 'text',
        label: <FormattedMessage defaultMessage="City" description="Field label" />,
    },

    {
        type: 'fields',
        isSection: true,
        fieldClassName: 'd-inline-block w-25 mr-4 ',
        fields: [
            {
                name: 'province',
                type: 'text',
                label: <FormattedMessage defaultMessage="Province" description="Field label" />,
            },
            {
                name: 'postal_code',
                type: 'text',
                label: <FormattedMessage defaultMessage="Postal code" description="Field label" />,
            },
        ],
    },
];

export const organisation = [
    {
        name: 'name',
        type: 'text',
        label: <FormattedMessage defaultMessage="Organisation name" description="Field label" />,
    },
    {
        name: 'image',
        type: 'image',
        label: <FormattedMessage defaultMessage="Image" description="Field label" />,
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
                label: <FormattedMessage defaultMessage="Email" description="Field label" />,
            },
            {
                name: 'role',
                type: 'select',
                label: <FormattedMessage defaultMessage="Role" description="Field label" />,
            },
        ],
    },
];
