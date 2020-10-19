import React from 'react';
import { FormattedMessage } from 'react-intl';

export const mainContact = [
    {
        name: 'contact_name',
        type: 'text',
        label: <FormattedMessage defaultMessage="Name" description="Field label" />,
    },
    {
        name: 'contact_email',
        type: 'email',
        label: <FormattedMessage defaultMessage="Email" description="Field label" />,
    },
    {
        name: 'contact_phone',
        type: 'text',
        label: <FormattedMessage defaultMessage="Phone" description="Field label" />,
    },
];

export const organisation = [
    {
        name: 'name',
        type: 'text',
        label: (
            <FormattedMessage defaultMessage="Name of the organisation" description="Field label" />
        ),
    },
    {
        type: 'fields',
        label: <FormattedMessage defaultMessage="Main contact" description="Field label" />,
        isSection: true,
        isHorizontal: true,
        fields: mainContact,
    },
];
