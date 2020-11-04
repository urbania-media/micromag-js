import { defineMessage } from 'react-intl';
import Ranking from './Ranking';

export default {
    id: 'ranking',
    type: 'screen',
    group: defineMessage({
        defaultMessage: 'List',
        description: 'List screen group',
    }),
    title: defineMessage({
        defaultMessage: 'Ranking',
        description: 'Ranking screen title',
    }),
    component: Ranking,
    layouts: ['side', 'over'],
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
            name: 'ascending',
            type: 'boolean',
            label: defineMessage({
                defaultMessage: 'Ascending',
                description: 'Ascending field label',
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
