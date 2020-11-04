import React from 'react';
import { FormattedMessage } from 'react-intl';

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
