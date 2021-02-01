import { defineMessage } from 'react-intl';

import RankingScreen from './Ranking';
import * as transforms from './transforms/index';

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
    component: RankingScreen,
    layouts: ['side', 'over'],
    transforms,
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
            type: 'entries',
            theme: {
                title: {
                    textStyle: 'heading2',
                },
                description: {
                    textStyle: 'text',
                },
            },
            label: defineMessage({
                defaultMessage: 'Entries',
                description: 'Entries field label',
            }),
        },
        {
            name: 'ascending',
            type: 'toggle',
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
