import { defineMessage } from 'react-intl';
import ContributionScreen from './Contribution';

export default {
    id: 'contribution',
    type: 'screen',
    group: defineMessage({
        defaultMessage: 'Questions',
        description: 'Questions screen group',
    }),
    title: defineMessage({
        defaultMessage: 'Contribution',
        description: 'Contribution screen title',
    }),
    component: ContributionScreen,
    layouts: ['top', 'middle', 'bottom'],
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
            name: 'title',
            type: 'text-element',
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title field label',
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
