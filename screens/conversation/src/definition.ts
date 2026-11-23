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
    },
    title: defineMessage({
        defaultMessage: 'Conversation',
        description: 'Conversation screen title',
    }),
    component: ConversationScreen,
    layouts: ['normal'],
    fields: [
        // {
        //     name: 'theme',
        //     type: 'select',
        //     options: [
        //         {
        //             value: 'ios',
        //             label: 'iOS',
        //         },
        //     ],
        //     label: defineMessage({
        //         defaultMessage: 'Theme',
        //         description: 'Theme field label',
        //     }),
        // },
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
            name: 'title',
            type: 'heading-element',
            theme: {
                textStyle: 'heading1',
            },
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title field label',
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
            name: 'readingSpeed',
            type: 'number',
            defaultValue: 255,
            label: defineMessage({
                defaultMessage: 'Reading speed (in Words Per Minute)',
                description: 'Reading speed label'
            })
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
            name: 'header',
            type: 'header',
            label: defineMessage({
                defaultMessage: 'Header',
                description: 'Field label',
            }),
            theme: {
                badge: {
                    label: {
                        textStyle: 'badge',
                    },
                    boxStyle: 'badge',
                },
            },
        },
        {
            name: 'footer',
            type: 'footer',
            label: defineMessage({
                defaultMessage: 'Footer',
                description: 'Field label',
            }),
            theme: {
                callToAction: {
                    label: {
                        textStyle: 'cta',
                    },
                    boxStyle: 'cta',
                },
            },
        },
    ],
};
