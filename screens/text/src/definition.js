import { defineMessage } from 'react-intl';

export const layouts = ['center', 'top', 'bottom'];

export default {
    id: 'text',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Text',
        description: 'Text screen title'
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
            name: 'text',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Text',
                description: 'Text field label'
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
