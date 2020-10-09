import { defineMessage } from 'react-intl';

export const layouts = ['center', 'full'];

export default {
    id: 'video',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Video',
        description: 'Video screen title'
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
            name: 'video',
            type: 'video',
            label: defineMessage({
                defaultMessage: 'Video',
                description: 'Video field label'
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
