import { defineMessage } from 'react-intl';
import Title from './Title';

export default {
    id: 'title',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Title',
        description: 'Title screen title'
    }),
    components: Title,
    layouts: ['center', 'top', 'bottom', 'split-top', 'split-bottom'],
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
            name: 'title',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title field label'
            }),
        },
        {
            name: 'subtitle',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Subtitle',
                description: 'Subtitle field label'
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
    ]
};
