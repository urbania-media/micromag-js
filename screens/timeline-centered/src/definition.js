import { defineMessage } from 'react-intl';

export const layouts = ['normal'];

export default {
    id: 'timeline-centered',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'TimelineCentered',
        description: 'TimelineCentered screen title'
    }),
    layouts,
    fields: [
        {
            name: 'layout',
            type: 'screen-layout',
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Layout field label'
            }),
        },
        {
            name: 'items',
            type: 'items',
            label: defineMessage({
                defaultMessage: 'Items',
                description: 'Items field label'
            }),
        },
        {
            name: 'background',
            type: 'background',
            label: defineMessage({
                defaultMessage: 'Background',
                description: 'Background field label'
            }),
        },
    ],
};
