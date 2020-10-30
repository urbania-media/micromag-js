import React from 'react';
import { FormattedMessage } from 'react-intl';

export const mainContact = [
    {
        name: 'contact_name',
        type: 'text',
        label: <FormattedMessage defaultMessage="Name" description="Name field label" />,
    },
    {
        name: 'contact_email',
        type: 'email',
        label: <FormattedMessage defaultMessage="Email" description="Email field label" />,
    },
    {
        name: 'contact_phone',
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
                defaultMessage="Name of the organisation"
                description="Organisation name field label"
            />
        ),
    },
    {
        type: 'fields',
        label: (
            <FormattedMessage
                defaultMessage="Main contact"
                description="Main contact field label"
            />
        ),
        isSection: true,
        isHorizontal: true,
        fields: mainContact,
    },
];

export const teamMember = {
    type: 'fields',
    label: <FormattedMessage defaultMessage="Team member" description="Team label" />,
    isSection: true,
    fields: [
        {
            name: 'name',
            type: 'text',
            label: <FormattedMessage defaultMessage="Name" description="Team member name label" />,
        },
        {
            name: 'role',
            type: 'select',
            label: <FormattedMessage defaultMessage="Role" description="Role label" />,
        },
    ],
};
