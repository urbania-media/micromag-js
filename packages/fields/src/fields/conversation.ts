import { defineMessage } from 'react-intl';

export default {
    id: 'conversation',
    component: 'conversation',
    fields: [
        {
            name: 'speakers',
            type: 'speakers',
            label: defineMessage({
                defaultMessage: 'Speakers',
                description: 'Field label',
            }),
        },
        {
            name: 'messages',
            type: 'messages',
            label: defineMessage({
                defaultMessage: 'Messages',
                description: 'Field label',
            }),
        },
    ],
    settings: [
        {
            name: 'messageStyle',
            type: 'text-style',
            label: defineMessage({
                defaultMessage: 'Message style',
                description: 'Field label',
            }),
        },
        {
            name: 'speakerStyle',
            type: 'text-style',
            className: 'mt-4',
            label: defineMessage({
                defaultMessage: 'Speaker style',
                description: 'Field label',
            }),
        },
    ],
};
