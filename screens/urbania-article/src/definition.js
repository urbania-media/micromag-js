import { defineMessage } from 'react-intl';

import UrbaniaLoader from './UrbaniaLoader';

// import * as transforms from './transforms/index';

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
    component: UrbaniaLoader,
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
