import { defineMessage } from 'react-intl';
import TitleCredits from './TitleCredits';

export default {
    id: 'title-credits',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'TitleCredits',
        description: 'TitleCredits screen title',
    }),
    component: TitleCredits,
    layouts: ['top', 'center', 'bottom', 'split-top', 'split-bottom'],
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
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title field label',
            }),
        },
        {
            name: 'subtitle',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Subtitle',
                description: 'Subtitle field label',
            }),
        },
        {
            name: 'credits',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Credits',
                description: 'Credits field label',
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
