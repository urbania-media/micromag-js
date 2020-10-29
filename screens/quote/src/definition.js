import { defineMessage } from 'react-intl';
import Quote from './Quote';

export default {
    id: 'quote',
    type: 'screen',
    group: defineMessage({
        defaultMessage: 'Text',
        description: 'Text screen group',
    }),
    title: defineMessage({
        defaultMessage: 'Quote',
        description: 'Quote screen title',
    }),
    component: Quote,
    layouts: ['top', 'middle', 'bottom', 'split'],
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
            name: 'quote',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Quote',
                description: 'Quote field label',
            }),
        },
        {
            name: 'author',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Author',
                description: 'Author field label',
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
