import { defineMessage } from 'react-intl';
import TimelineCentered from './TimelineCentered';

export default {
    id: 'timeline-centered',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'TimelineCentered',
        description: 'TimelineCentered screen title',
    }),
    component: TimelineCentered,
    layouts: ['normal'],
    fields: [
        {
            name: 'layout',
            type: 'screen-layout',
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Layout field label',
            }),
        },
        {
            name: 'items',
            type: 'items',
            label: defineMessage({
                defaultMessage: 'Items',
                description: 'Items field label',
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
    ],
};
