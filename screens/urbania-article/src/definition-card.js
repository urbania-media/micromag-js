import { defineMessage } from 'react-intl';

import UrbaniaCardLoader from './UrbaniaCardLoader';

export default {
    id: 'urbania-article',
    type: 'screen',
    namespaces: ['urbania'],
    group: {
        label: defineMessage({
            defaultMessage: 'Urbania',
            description: 'Urbania screen group',
        }),
        order: 10,
    },
    title: defineMessage({
        defaultMessage: 'Urbania article',
        description: 'Urbania screen title',
    }),
    component: UrbaniaCardLoader,
    fields: [
        {
            name: 'url',
            type: 'url',
            label: defineMessage({
                defaultMessage: 'Url',
                description: 'Url field label',
            }),
        },
        {
            name: 'text',
            type: 'text-element',
            label: defineMessage({
                defaultMessage: 'Text',
                description: 'Text field label',
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
    ],
};
