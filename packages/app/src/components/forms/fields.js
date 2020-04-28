import { defineMessages } from 'react-intl';

import formMessages from './messages';

const organisationMessages = defineMessages({
    nameLabel: {
        id: 'forms.organisation.name',
        defaultMessage: 'Name of the organisation',
    },
    mainContactLabel: {
        id: 'forms.organisation.main_contact',
        defaultMessage: 'Main contact',
    },
});

export const mainContact = [
    {
        name: 'contact_name',
        type: 'text',
        label: formMessages.nameLabel,
    },
    {
        name: 'contact_email',
        type: 'email',
        label: formMessages.emailLabel,
    },
    {
        name: 'contact_phone',
        type: 'text',
        label: formMessages.phoneLabel,
    },
];

export const organisation = [
    {
        name: 'name',
        type: 'text',
        label: organisationMessages.nameLabel,
    },
    {
        type: 'fields',
        label: organisationMessages.mainContactLabel,
        isSection: true,
        isHorizontal: true,
        fields: mainContact,
    },
];
