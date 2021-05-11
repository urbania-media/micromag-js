import { defineMessage } from 'react-intl';

import ConversationScreen from './Conversation';

export default {
    id: 'conversation',
    type: 'screen',
    group: {
        label: defineMessage({
            defaultMessage: 'Text',
            description: 'Text screen group',
        }),
        order: 3,
        // hidden: true,
    },
    title: defineMessage({
        defaultMessage: 'Conversation',
        description: 'Conversation screen title',
    }),
    component: ConversationScreen,
    layouts: ['normal'],
    fields: [
        {
            name: 'theme',
            type: 'select',
            options: [
                {
                    value: 'ios',
                    label: 'iOS',
                },
            ],
            label: defineMessage({
                defaultMessage: 'Theme',
                description: 'Theme field label',
            }),
        },
        {
            name: 'timing',
            type: 'select',
            options: [
                {
                    value: 'instant',
                    label: 'Instant',
                },
                {
                    value: 'sequence',
                    label: 'Sequence',
                },
            ],
            label: defineMessage({
                defaultMessage: 'Timing',
                description: 'Timing field label',
            }),
        },
        {
            name: 'conversation',
            type: 'conversation',
            label: defineMessage({
                defaultMessage: 'Conversation',
                description: 'Conversation field label',
            }),
        },
        {
            name: 'background',
            type: 'background',
            label: defineMessage({
                defaultMessage: 'Background',
                description: 'Background field label',
            }),
        },
        {
            name: 'callToAction',
            type: 'call-to-action',
            theme: {
                label: {
                    textStyle: 'heading2',
                },
            },
        },
    ],
};
