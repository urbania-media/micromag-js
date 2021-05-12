import { defineMessage } from 'react-intl';

import Conversation from '../components/Conversation';

export default {
    id: 'conversation',
    component: Conversation,
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
            name: 'text',
            type: 'text-style',
            label: defineMessage({
                defaultMessage: 'Message style',
                description: 'Field label',
            }),
        },
        {
            name: 'speaker',
            type: 'text-style',
            className: 'mt-4',
            label: defineMessage({
                defaultMessage: 'Speaker style',
                description: 'Field label',
            }),
        },
    ],
};
